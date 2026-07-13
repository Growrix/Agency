import { expect, test, type APIRequestContext, type Page, type Response } from "@playwright/test";

test.describe.configure({ timeout: 120_000 });

async function getFirstProductSlug(request: APIRequestContext): Promise<string | null> {
  const response = await request.get("/api/v1/shop/products");
  if (!response.ok()) return null;
  const payload = (await response.json()) as { data?: Array<{ slug: string }> };
  const products = payload.data ?? [];
  const preferred = products.find((product) => product.slug === "three-circles-template");
  return preferred?.slug ?? products[0]?.slug ?? null;
}

async function gotoCheckoutReady(page: Page, checkoutUrl: string) {
  await page.goto(checkoutUrl, { waitUntil: "domcontentloaded" });
  await page.getByLabel("Full name *").waitFor({ state: "visible", timeout: 45_000 });
  await dismissCartIfOpen(page);
}

async function reloadCheckoutReady(page: Page, checkoutUrl: string) {
  try {
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.getByLabel("Full name *").waitFor({ state: "visible", timeout: 45_000 });
    await dismissCartIfOpen(page);
  } catch {
    await gotoCheckoutReady(page, checkoutUrl);
  }
}

async function isCartDrawerOpen(page: Page) {
  const cartDialog = page.getByRole("dialog", { name: /Cart\s*·/i }).first();
  return cartDialog
    .evaluate((node) => {
      const rect = node.getBoundingClientRect();
      const inset = 24;
      return rect.left < window.innerWidth - inset && rect.right > inset;
    })
    .catch(() => false);
}

async function dismissCartIfOpen(page: Page) {
  if (!(await isCartDrawerOpen(page))) {
    return;
  }

  await page.keyboard.press("Escape").catch(() => undefined);

  if (await isCartDrawerOpen(page)) {
    const closeCart = page.getByRole("button", { name: "Close cart", exact: true }).first();
    await closeCart.click({ force: true }).catch(() => undefined);
  }

  await expect.poll(async () => isCartDrawerOpen(page), { timeout: 5_000 }).toBe(false);
}

test("checkout fallback flow captures an order", async ({ page, request }) => {
  const productSlug = await getFirstProductSlug(request);
  test.skip(!productSlug, "No products available in the current data environment");
  await gotoCheckoutReady(page, `/checkout?product=${productSlug}`);

  await page.getByLabel("Full name *").fill("Checkout User");
  await page.getByLabel("Email address *").fill("checkout@example.com");
  await page.getByLabel("Country *").selectOption("US");
  await page.getByRole("textbox", { name: "Address *", exact: true }).fill("123 Main Street");
  await page.getByLabel("City *").fill("Austin");
  await page.getByLabel("State / Region *").fill("TX");
  await page.getByLabel("ZIP / Postal code *").fill("78701");
  await dismissCartIfOpen(page);
  await page.getByRole("button", { name: "Place order" }).click();

  const redirectedToSignIn = page
    .waitForURL(/\/sign-in|\/dashboard\/login/i, { timeout: 10_000 })
    .then(() => true)
    .catch(() => false);
  const redirectedToSuccess = page
    .waitForURL(/\/success(\?|$)/i, { timeout: 10_000 })
    .then(() => true)
    .catch(() => false);
  const authModalVisible = page
    .getByRole("dialog")
    .first()
    .waitFor({ state: "visible", timeout: 10_000 })
    .then(() => true)
    .catch(() => false);

  const hitSignIn = await redirectedToSignIn;
  const hitSuccess = hitSignIn ? false : await redirectedToSuccess;
  const hitAuthModal = hitSignIn || hitSuccess ? false : await authModalVisible;

  expect(hitSignIn || hitSuccess || hitAuthModal).toBeTruthy();
});

test("checkout autosave restores draft and auth redirect preserves selected product context", async ({ page, request }) => {
  const productSlug = await getFirstProductSlug(request);
  test.skip(!productSlug, "No products available in the current data environment");

  await page.context().clearCookies();
  await request.post("/api/v1/auth/logout").catch(() => undefined);

  const checkoutUrl = `/checkout?product=${productSlug}&variant=premium-plan&tier=Premium&fulfillment=done-for-you`;
  await gotoCheckoutReady(page, checkoutUrl);

  await page.getByLabel("Full name *").fill("Draft Restore User");
  await page.getByLabel("Email address *").fill("draft-restore@example.com");
  await page.getByLabel("Country *").selectOption("US");
  await page.getByRole("textbox", { name: "Address *", exact: true }).fill("22 Test Avenue");
  await page.getByLabel("City *").fill("Austin");
  await page.getByLabel("State / Region *").fill("TX");
  await page.getByLabel("ZIP / Postal code *").fill("78702");
  await page.getByLabel("Order notes").fill("Autosave should keep this note");

  await reloadCheckoutReady(page, checkoutUrl);

  await expect(page.getByLabel("Full name *")).toHaveValue("Draft Restore User");
  await expect(page.getByLabel("Email address *")).toHaveValue("draft-restore@example.com");
  await expect(page.getByLabel("Order notes")).toHaveValue("Autosave should keep this note");

  await dismissCartIfOpen(page);
  await page.getByRole("button", { name: "Place order" }).click();

  const redirectedToSignIn = await page
    .waitForURL(/\/sign-in|\/dashboard\/login/i, { timeout: 15_000 })
    .then(() => true)
    .catch(() => false);

  if (redirectedToSignIn) {
    const current = new URL(page.url());
    const nextParam = current.searchParams.get("next");

    expect(nextParam).toBeTruthy();
    const decodedNext = decodeURIComponent(nextParam ?? "");
    const [nextPath, nextQuery = ""] = decodedNext.split("?");
    const nextSearchParams = new URLSearchParams(nextQuery);

    expect(nextPath).toBe("/checkout");
    expect(nextSearchParams.get("product")).toBe(productSlug);
    expect(nextSearchParams.get("variant")).toBe("premium-plan");
    expect(nextSearchParams.get("tier")).toBe("Premium");
    expect(nextSearchParams.get("fulfillment")).toBe("done-for-you");
    return;
  }

  await expect(page.getByRole("dialog").first()).toBeVisible();
});

test("admin login page renders", async ({ page }) => {
  let response: Response | null = null;
  try {
    response = await page.goto("/admin/login", { waitUntil: "domcontentloaded" });
  } catch {
    response = await page.goto("/admin/login", { waitUntil: "domcontentloaded" });
  }

  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveURL(/\/admin\/login/i);
  await expect(page).toHaveTitle(/Admin Login/i);
  await expect(page.locator("body")).toBeVisible();
});