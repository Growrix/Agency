import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  isQuoteBasedCommerceItem,
  isQuoteBasedPriceLabel,
  parseFixedUsdPriceToCents,
} from "@/lib/commerce-pricing";

describe("commerce pricing", () => {
  it("treats done-for-you range labels as quote-based", () => {
    assert.equal(isQuoteBasedPriceLabel("$299-$799"), true);
    assert.equal(parseFixedUsdPriceToCents("$299-$799"), 0);
  });

  it("parses fixed single-price labels", () => {
    assert.equal(parseFixedUsdPriceToCents("$49"), 4900);
    assert.equal(parseFixedUsdPriceToCents("$149.00"), 14900);
  });

  it("detects done-for-you fulfillment without a fixed total", () => {
    assert.equal(
      isQuoteBasedCommerceItem({
        fulfillmentType: "done_for_you_service",
        variantSlug: "done-for-you",
        tierName: "Done-For-You",
        priceLabel: "$299-$799",
      }),
      true,
    );
  });
});
