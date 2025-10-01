import { getHt, getTva, mounthToAnnual, sanitizePrice } from "../common/utils/pricing";

const normalizeSpaces = (s: string) => s.replace(/\u202F|\u00A0/g, " ");

describe("pricing utils", () => {
    it("mounthToAnnual multiplie par 10", () => {
        expect(mounthToAnnual(12.5)).toBe(125);
    });

    it("getTva 20%", () => {
        expect(getTva(100)).toBe(20);
        expect(getTva(19.99)).toBeCloseTo(3.998, 6);
    });

    it("getHt 80%", () => {
        expect(getHt(120)).toBe(96);
        expect(getHt(19.99)).toBeCloseTo(15.992, 6);
    });

    it("sanitizePrice format fr-FR", () => {
        expect(normalizeSpaces(sanitizePrice(1234.5))).toBe("1 234,50 €");
    });
});
