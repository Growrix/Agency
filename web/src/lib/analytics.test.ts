import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { GA_CONSENT_STORAGE_KEY, isGaConfigured } from "@/lib/analytics";

describe("analytics helpers", () => {
  it("reports GA as unconfigured when measurement id env is empty", () => {
    assert.equal(isGaConfigured(), false);
  });

  it("exports a stable consent storage key", () => {
    assert.equal(GA_CONSENT_STORAGE_KEY, "growrix-analytics-consent");
  });
});
