import { noOp } from "../../../../common/utils/void";
// eslint-disable-next-line no-undef
describe("noOp", () => {
    // eslint-disable-next-line no-undef
    it("est une fonction", () => {
        // eslint-disable-next-line no-undef
        expect(typeof noOp).toBe("function");
    });
    // eslint-disable-next-line no-undef
    it("ne prend aucun paramètre", () => {
        // eslint-disable-next-line no-undef
        expect(noOp.length).toBe(0);
    });
    // eslint-disable-next-line no-undef
    it("retourne null", () => {
        // eslint-disable-next-line no-undef
        expect(noOp()).toBeNull();
    });
    // eslint-disable-next-line no-undef
    it("n'émet aucune erreur", () => {
        // eslint-disable-next-line no-undef
        expect(() => noOp()).not.toThrow();
    });
});
