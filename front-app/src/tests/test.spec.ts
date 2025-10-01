import { getHt, getTva, mounthToAnnual, sanitizePrice } from "../common/utils/pricing";

const normalizeSpaces = (s: string) => s.replace(/\u202F|\u00A0/g, " ");

// eslint-disable-next-line no-undef
describe("pricing utils", () => {
    // eslint-disable-next-line no-undef
    it("mounthToAnnual multiplie par 10", () => {
        // eslint-disable-next-line no-undef
        expect(mounthToAnnual(12.5)).toBe(125);
    });

    // eslint-disable-next-line no-undef
    it("getTva 20%", () => {
        // eslint-disable-next-line no-undef
        expect(getTva(100)).toBe(20);
        // eslint-disable-next-line no-undef
        expect(getTva(19.99)).toBeCloseTo(3.998, 6);
    });

    // eslint-disable-next-line no-undef
    it("getHt 80%", () => {
        // eslint-disable-next-line no-undef
        expect(getHt(120)).toBe(96);
        // eslint-disable-next-line no-undef
        expect(getHt(19.99)).toBeCloseTo(15.992, 6);
    });

    // eslint-disable-next-line no-undef
    it("sanitizePrice format fr-FR", () => {
        // eslint-disable-next-line no-undef
        expect(normalizeSpaces(sanitizePrice(1234.5))).toBe("1 234,50 €");
    });
});
