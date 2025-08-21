import { describe, it } from "node:test";
import assert from "node:assert";
import { sum } from "./index.js";

describe("Positive Scenario", () => {
  it("Should return 12 when adding 5 and 7", () => {
    // Arrange
    const a = 5;
    const b = 7;

    // Action
    const result = sum(a, b);

    // Assert
    const expectedValue = 12;
    assert.equal(result, expectedValue);
  });

  it("Should handle negative numbers", () => {
    // Arrange
    const a = 5;
    const b = -7;

    // Action
    const result = sum(a, b);

    // Assert
    const expectedValue = -2;
    assert.equal(result, expectedValue);
  });

  it("Should handle decimals", () => {
    // Arrange
    const a = 2.34;
    const b = 7.21;

    // Action
    const result = sum(a, b);

    // Assert
    const expectedValue = 9.55;
    assert.equal(result, expectedValue);
  });
});

describe("Neegative Scenario Cases", () => {
  it("Should concatenate when one or both of input is not a number", () => {
    // Arrange
    const a = 4;
    const b = "Budi";

    // Action
    const result = sum(a, b);

    // Assert
    const expectedValue = "4Budi";
    assert.strictEqual(result, expectedValue);
  });

  it("Should return NaN when one or both of input is undefined", () => {
    // Arrange
    const a = undefined;
    const b = 2;

    // Action
    const result = sum(a, b);

    // Assert
    assert.ok(Number.isNaN(result));
  });

  it("Should return 0 when input is null", () => {
    // Action
    const result = sum(null, null);

    // Assert
    assert.strictEqual(result, 0);
  });

  it("Should return 2 when one of input is null", () => {
    // Arrange
    const a = null;
    const b = 2;

    // Action
    const result = sum(a, b);

    // Assert
    assert.strictEqual(result, 2);
  });
});
