import { describe, it } from "node:test";
import assert from "node:assert";
import sum from "./index.js";

describe("Positive Scenario", () => {
  it("Should return 12 when adding 5 and 7", () => {
    // Arrange
    const a = 5;
    const b = 7;

    // Action
    const result = sum(a, b);

    // Assert
    const expectedValue = 12;
    assert.strictEqual(result, expectedValue);
  });

  it("Should handle positive decimals", () => {
    // Arrange
    const a = 2.34;
    const b = 7.21;

    // Action
    const result = sum(a, b);

    // Assert
    const expectedValue = 9.55;
    assert.strictEqual(result, expectedValue);
  });
});

describe("Negative Scenario", () => {
  it("Should return 0 when one or both of input is negative numbers", () => {
    // Arrange
    const a = -5;
    const b = -7;

    // Action
    const result = sum(a, b);

    // Assert
    const expectedValue = 0;
    assert.strictEqual(result, expectedValue);
  });

  it("Should return 0 when one or both of input is not a number", () => {
    // Arrange
    const a = 4;
    const b = [];

    // Action
    const result = sum(a, b);

    // Assert
    const expectedValue = 0;
    assert.strictEqual(result, expectedValue);
  });

  it("Should return 0 when one or both of input is undefined", () => {
    // Arrange
    const a = undefined;
    const b = 2;

    // Action
    const result = sum(a, b);

    // Assert
    const expectedValue = 0;
    assert.strictEqual(result, expectedValue);
  });

  it("Should return 0 when one or both of input is null", () => {
    // Arrange
    const a = null;
    const b = 2;

    // Action
    const result = sum(a, b);

    // Assert
    const expectedValue = 0;
    assert.strictEqual(result, expectedValue);
  });
});

describe("Edge Cases", () => {
  it("Should return 2, when passing 0 and 2", () => {
    // Arrange
    const a = 0;
    const b = 2;

    // Action
    const result = sum(a, b);

    // Assert
    const expectedValue = 2;
    assert.strictEqual(result, expectedValue);
  });

  it("Should return 0 when no input is described", () => {
    // Arrange
    // (no input passed)

    // Action
    const result = sum();

    // Assert
    const expectedValue = 0;
    assert.strictEqual(result, expectedValue);
  });
});
