import { getHt, getTva, mounthToAnnual, sanitizePrice } from "../../../../common/utils/pricing";

const normalizeSpaces = (s) => s.replace(/\u202F|\u00A0/g, " ");
// eslint-disable-next-line no-undef
describe("mounthToAnnual", () => {
    // eslint-disable-next-line no-undef
    it("multiplie par 10", () => {
        // eslint-disable-next-line no-undef
        expect(mounthToAnnual(10)).toBe(100);
        // eslint-disable-next-line no-undef
        expect(mounthToAnnual(0)).toBe(0);
        // eslint-disable-next-line no-undef
        expect(mounthToAnnual(12.5)).toBe(125);
        // eslint-disable-next-line no-undef
        expect(mounthToAnnual(-5)).toBe(-50);
    });
});
// eslint-disable-next-line no-undef
describe("sanitizePrice", () => {
    // eslint-disable-next-line no-undef
    it('formate en fr-FR avec 2 décimales et ajoute " €"', () => {
        // eslint-disable-next-line no-undef
        expect(normalizeSpaces(sanitizePrice(0))).toBe("0,00 €");
        // eslint-disable-next-line no-undef
        expect(normalizeSpaces(sanitizePrice(12))).toBe("12,00 €");
        // eslint-disable-next-line no-undef
        expect(normalizeSpaces(sanitizePrice(12.5))).toBe("12,50 €");
    });
    // eslint-disable-next-line no-undef
    it("gère les milliers selon la locale fr-FR", () => {
        // eslint-disable-next-line no-undef
        const formatted = sanitizePrice(1234.5);
        // eslint-disable-next-line no-undef
        expect(normalizeSpaces(formatted)).toBe("1 234,50 €");
    });
    // eslint-disable-next-line no-undef
    it.each([
        [1_000_000, "1 000 000,00 €"],
        [-99.9, "-99,90 €"],
    ])("gère les grands nombres et les négatifs: %p → %s", (input, expected) => {
        // eslint-disable-next-line no-undef
        expect(normalizeSpaces(sanitizePrice(input))).toBe(expected);
    });
});
// eslint-disable-next-line no-undef
describe("getTva", () => {
    // eslint-disable-next-line no-undef
    it("retourne 20% du montant", () => {
        // eslint-disable-next-line no-undef
        expect(getTva(100)).toBe(20);
        // eslint-disable-next-line no-undef
        expect(getTva(0)).toBe(0);
        // eslint-disable-next-line no-undef
        expect(getTva(-50)).toBe(-10);
    });
    // eslint-disable-next-line no-undef
    it("gère les décimaux avec une tolérance flottante", () => {
        // eslint-disable-next-line no-undef
        expect(getTva(19.99)).toBeCloseTo(3.998, 6);
    });
});
// eslint-disable-next-line no-undef
describe("getHt", () => {
    // eslint-disable-next-line no-undef
    it("retourne le montant hors taxe (80% du TTC si TVA=20%)", () => {
        // eslint-disable-next-line no-undef
        expect(getHt(120)).toBe(96);
        // eslint-disable-next-line no-undef
        expect(getHt(0)).toBe(0);
        // eslint-disable-next-line no-undef
        expect(getHt(-120)).toBe(-96);
    });
    // eslint-disable-next-line no-undef
    it("gère les décimaux avec une tolérance flottante", () => {
        // eslint-disable-next-line no-undef
        expect(getHt(19.99)).toBeCloseTo(15.992, 6);
    });
});
