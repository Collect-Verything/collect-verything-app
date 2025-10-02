import { describe, test, expect } from "@jest/globals";
import { noOp } from "../../../../common/utils/void";

describe("noOp", () => {
    test("est une fonction", () => {
        expect(typeof noOp).toBe("function");
    });

    test("retourne null", () => {
        expect(noOp()).toBeNull();
    });

    test("ne lève pas d’erreur", () => {
        expect(() => noOp()).not.toThrow();
        expect(() => noOp()).not.toThrow();
        expect(() => noOp()).not.toThrow();
        expect(() => noOp()).not.toThrow();
    });

    test("peut être utilisé comme callback sans modifier le contexte.", () => {
        const obj = { x: 1, fn: noOp };
        expect(obj.fn()).toBeNull();
    });
});
