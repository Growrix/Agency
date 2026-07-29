import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolveAuthRedirectPath } from "@/lib/auth-redirect";

describe("resolveAuthRedirectPath", () => {
  it("prefers next over redirect_url and falls back to after-sign-in", () => {
    assert.equal(resolveAuthRedirectPath({}), "/auth/after-sign-in");
    assert.equal(resolveAuthRedirectPath({ next: "/checkout" }), "/checkout");
    assert.equal(
      resolveAuthRedirectPath({
        next: "/dashboard/projects",
        redirect_url: "http://localhost:5000/admin",
      }),
      "/dashboard/projects",
    );
  });

  it("accepts Clerk redirect_url absolute URLs and rejects open redirects", () => {
    assert.equal(
      resolveAuthRedirectPath({ redirect_url: "http://localhost:5000/admin" }),
      "/admin",
    );
    assert.equal(
      resolveAuthRedirectPath({ redirect_url: "https://evil.example/phish" }),
      "/phish",
    );
    assert.equal(resolveAuthRedirectPath({ next: "//evil.example" }), "/auth/after-sign-in");
    assert.equal(resolveAuthRedirectPath({ next: "javascript:alert(1)" }), "/auth/after-sign-in");
  });
});
