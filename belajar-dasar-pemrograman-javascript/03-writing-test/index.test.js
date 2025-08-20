import { describe, it } from "node:test";
import assert from "node:assert";
import { sum } from "./index.js";

// Arrange
// Action
// Assert

describe("Calculator", () => {
  it("Should get correct result", () => {
    // Arrange
    const operandA = 5;
    const operandB = 7;

    // Action
    const actualValue = sum(operandA, operandB);

    // Assert
    const expectedValue = 12;
    assert.equal(actualValue, expectedValue);
  });

  it("Should return a string", () => {
    // Arrange
    const operandA = "4";
    const operandB = 7;

    // Action
    const actualValue = sum(operandA, operandB);

    // Assert
    const expectedValue = 11;
    assert.notStrictEqual(actualValue, expectedValue);
  });

  it("Should return correct result", () => {
    // Arrange
    const operandA = -5;
    const operandB = 7;

    // Action
    const actualValue = sum(operandA, operandB);

    // Assert
    const expectedValue = 2;
    assert.strictEqual(actualValue, expectedValue);
  });
});
