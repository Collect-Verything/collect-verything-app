// src/tests/common/utils/price.test.js
import { describe, expect, test } from "@jest/globals";
import { getHt, getTva, mounthToAnnual, sanitizePrice } from "../../../../common/utils/pricing";

describe("mounthToAnnual", () => {
    test("multiplie par 10", () => {
        expect(mounthToAnnual(10)).toBe(100);
        expect(mounthToAnnual(0)).toBe(0);
        expect(mounthToAnnual(19.99)).toBeCloseTo(199.9, 2);
    });
});

describe("sanitizePrice (fr-FR)", () => {
    const sep = "[\\u00A0\\u202F\\s]";
    test("formate 0", () => {
        expect(sanitizePrice(0)).toBe("0,00 €");
    });

    test("formate avec séparateur de milliers et virgule", () => {
        const s = sanitizePrice(1234.5);
        expect(s).toMatch(new RegExp(`^1${sep}234,50 €$`));
    });

    test("formate des décimaux correctement", () => {
        expect(sanitizePrice(9.9)).toBe("9,90 €");
        expect(sanitizePrice(9.99)).toBe("9,99 €");
    });
});

describe("getTva (20%)", () => {
    test("retourne 20% du montant", () => {
        expect(getTva(100)).toBe(20);
        expect(getTva(0)).toBe(0);
        expect(getTva(19.99)).toBeCloseTo(3.998, 3);
    });
});

describe("getHt (montant TTC -> HT avec TVA 20%)", () => {
    test("retourne le montant HT", () => {
        expect(getHt(100)).toBe(80);
        expect(getHt(0)).toBe(0);
        expect(getHt(19.99)).toBeCloseTo(15.992, 3);
    });

    test("cohérence: HT + TVA ~= TTC", () => {
        const amounts = [1, 9.99, 100, 1234.56];
        for (const a of amounts) {
            expect(getHt(a) + getTva(a)).toBeCloseTo(a, 6);
        }
    });
});
