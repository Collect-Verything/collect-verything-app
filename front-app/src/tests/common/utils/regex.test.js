import { describe, expect, test } from "@jest/globals";
import { emailRegex } from "../../../common/utils/regex";

describe("emailRegex", () => {
    test("accepte des emails valides simples", () => {
        expect(emailRegex.test("test@example.com")).toBe(true);
        expect(emailRegex.test("john.doe@example.co")).toBe(true);
        expect(emailRegex.test("user+tag@example.io")).toBe(true);
        expect(emailRegex.test("name_surname@sub.example.co.uk")).toBe(true);
        expect(emailRegex.test("123@numbers.net")).toBe(true);
    });

    test("rejette emails sans TLD ou TLD trop court", () => {
        expect(emailRegex.test("user@example")).toBe(false);
        expect(emailRegex.test("user@example.c")).toBe(false);
    });

    test("rejette caractères invalides", () => {
        expect(emailRegex.test("user@exam!ple.com")).toBe(false);
        expect(emailRegex.test("us er@example.com")).toBe(false);
        expect(emailRegex.test("user@ example.com")).toBe(false);
        expect(emailRegex.test("user@exam_ple.com")).toBe(false);
        expect(emailRegex.test("usér@example.com")).toBe(false);
    });

    test("rejette formats évidents incorrects", () => {
        expect(emailRegex.test("plainaddress")).toBe(false);
        expect(emailRegex.test("@example.com")).toBe(false);
        expect(emailRegex.test("user@com")).toBe(false);
    });
});
