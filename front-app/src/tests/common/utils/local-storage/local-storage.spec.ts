import { setFromLocalStorage } from "../../../../common/utils/local-storage";
// eslint-disable-next-line no-undef
describe("setFromLocalStorage", () => {
    // eslint-disable-next-line no-undef
    let getItemSpy: jest.SpyInstance<string | null, [key: string]>;
    // eslint-disable-next-line no-undef
    let warnSpy: jest.SpyInstance<void, [message?: never, ...optionalParams: never[]]>;
    // eslint-disable-next-line no-undef
    let errorSpy: jest.SpyInstance<void, [message?: never, ...optionalParams: never[]]>;
    // eslint-disable-next-line no-undef
    beforeEach(() => {
        // eslint-disable-next-line no-undef
        getItemSpy = jest.spyOn(Storage.prototype, "getItem");
        // eslint-disable-next-line no-undef
        // @ts-ignore
        // eslint-disable-next-line no-undef
        warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
        // eslint-disable-next-line no-undef
        // @ts-ignore
        // eslint-disable-next-line no-undef
        errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    });
    // eslint-disable-next-line no-undef
    afterEach(() => {
        // eslint-disable-next-line no-undef
        jest.resetAllMocks();
    });
    // eslint-disable-next-line no-undef
    it("appelle le setter avec l’objet parsé si JSON valide (objet)", () => {
        const key = "user";
        const stored = JSON.stringify({ id: 1, name: "Alice" });
        getItemSpy.mockReturnValue(stored);
        // eslint-disable-next-line no-undef
        const setter = jest.fn();
        setFromLocalStorage(key, setter);
        // eslint-disable-next-line no-undef
        expect(getItemSpy).toHaveBeenCalledWith(key);
        // eslint-disable-next-line no-undef
        expect(setter).toHaveBeenCalledTimes(1);
        // eslint-disable-next-line no-undef
        expect(setter).toHaveBeenCalledWith({ id: 1, name: "Alice" });
        // eslint-disable-next-line no-undef
        expect(warnSpy).not.toHaveBeenCalled();
        // eslint-disable-next-line no-undef
        expect(errorSpy).not.toHaveBeenCalled();
    });
    // eslint-disable-next-line no-undef
    it("n’appelle pas le setter si la clé est absente (null)", () => {
        const key = "missing";
        getItemSpy.mockReturnValue(null);
        // eslint-disable-next-line no-undef
        const setter = jest.fn();
        setFromLocalStorage(key, setter);
        // eslint-disable-next-line no-undef
        expect(setter).not.toHaveBeenCalled();
        // eslint-disable-next-line no-undef
        expect(warnSpy).not.toHaveBeenCalled();
        // eslint-disable-next-line no-undef
        expect(errorSpy).not.toHaveBeenCalled();
    });
    // eslint-disable-next-line no-undef
    it('accepte aussi un tableau (typeof === "object") et appelle le setter', () => {
        const key = "arr";
        const stored = JSON.stringify([1, 2, 3]);
        getItemSpy.mockReturnValue(stored);
        // eslint-disable-next-line no-undef
        const setter = jest.fn();
        setFromLocalStorage(key, setter);
        // eslint-disable-next-line no-undef
        expect(setter).toHaveBeenCalledTimes(1);
        // eslint-disable-next-line no-undef
        expect(setter).toHaveBeenCalledWith([1, 2, 3]);
        // eslint-disable-next-line no-undef
        expect(warnSpy).not.toHaveBeenCalled();
        // eslint-disable-next-line no-undef
        expect(errorSpy).not.toHaveBeenCalled();
    });

    // eslint-disable-next-line no-undef
    it("log un warn et n’appelle pas le setter pour la valeur JSON null", () => {
        const key = "nullval";
        const stored = "null";
        getItemSpy.mockReturnValue(stored);
        // eslint-disable-next-line no-undef
        const setter = jest.fn();
        setFromLocalStorage(key, setter);
        // eslint-disable-next-line no-undef
        expect(setter).not.toHaveBeenCalled();
        // eslint-disable-next-line no-undef
        expect(warnSpy).toHaveBeenCalledTimes(1);
        // eslint-disable-next-line no-undef
        expect(String(warnSpy.mock.calls[0][0])).toMatch(/n'est pas un objet valide/);
        // eslint-disable-next-line no-undef
        expect(errorSpy).not.toHaveBeenCalled();
    });
    // eslint-disable-next-line no-undef
    it("log un warn et n’appelle pas le setter si la valeur JSON n’est pas un objet (ex: number)", () => {
        const key = "num";
        const stored = JSON.stringify(42);
        getItemSpy.mockReturnValue(stored);
        // eslint-disable-next-line no-undef
        const setter = jest.fn();
        setFromLocalStorage(key, setter);
        // eslint-disable-next-line no-undef
        expect(setter).not.toHaveBeenCalled();
        // eslint-disable-next-line no-undef
        expect(warnSpy).toHaveBeenCalledTimes(1);
        // eslint-disable-next-line no-undef
        expect(errorSpy).not.toHaveBeenCalled();
    });
    // eslint-disable-next-line no-undef
    it("log une erreur et n’appelle pas le setter si le JSON est invalide", () => {
        const key = "broken";
        const stored = "{ invalid json ";
        getItemSpy.mockReturnValue(stored);
        // eslint-disable-next-line no-undef
        const setter = jest.fn();
        setFromLocalStorage(key, setter);
        // eslint-disable-next-line no-undef
        expect(setter).not.toHaveBeenCalled();
        // eslint-disable-next-line no-undef
        expect(errorSpy).toHaveBeenCalledTimes(1);
        // eslint-disable-next-line no-undef
        expect(String(errorSpy.mock.calls[0][0])).toMatch(/Erreur lors de la récupération/);
        // eslint-disable-next-line no-undef
        expect(warnSpy).not.toHaveBeenCalled();
    });
});
