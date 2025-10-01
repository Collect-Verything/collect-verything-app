// front-app/src/tests/common/utils/setFromLocalStorage.test.js
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { setFromLocalStorage } from "../../../../common/utils/local-storage";

describe("setFromLocalStorage", () => {
    const KEY = "my-key";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let setter: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let getItemSpy: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let warnSpy: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errorSpy: any;

    beforeEach(() => {
        setter = jest.fn();
        getItemSpy = jest.spyOn(window.localStorage.__proto__, "getItem");
        warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
        errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        getItemSpy.mockRestore();
        warnSpy.mockRestore();
        errorSpy.mockRestore();
        jest.clearAllMocks();
    });

    test("appelle le setter avec l’objet parsé quand la valeur JSON est un objet valide", () => {
        const obj = { a: 1, b: "x" };
        getItemSpy.mockReturnValueOnce(JSON.stringify(obj));

        setFromLocalStorage(KEY, setter);

        expect(getItemSpy).toHaveBeenCalledWith(KEY);
        expect(setter).toHaveBeenCalledTimes(1);
        expect(setter).toHaveBeenCalledWith(obj);
        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
    });

    test("ne fait rien si la clé est absente (getItem retourne null)", () => {
        getItemSpy.mockReturnValueOnce(null);

        setFromLocalStorage(KEY, setter);

        expect(setter).not.toHaveBeenCalled();
        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
    });

    test("log une erreur si le JSON est invalide", () => {
        getItemSpy.mockReturnValueOnce("{invalid-json");

        setFromLocalStorage(KEY, setter);

        expect(setter).not.toHaveBeenCalled();
        expect(errorSpy).toHaveBeenCalledTimes(1);
        // optionnel : vérifier que le message contient la clé
        expect(errorSpy.mock.calls[0][0]).toMatch(KEY);
    });

    test("ne set pas et avertit si la valeur parsée n’est pas un objet (nombre)", () => {
        getItemSpy.mockReturnValueOnce(JSON.stringify(123));

        setFromLocalStorage(KEY, setter);

        expect(setter).not.toHaveBeenCalled();
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy.mock.calls[0][0]).toMatch(KEY);
    });

    test("ne set pas et avertit si la valeur parsée n’est pas un objet (chaîne)", () => {
        getItemSpy.mockReturnValueOnce(JSON.stringify("hello"));

        setFromLocalStorage(KEY, setter);

        expect(setter).not.toHaveBeenCalled();
        expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    test('accepte un tableau (typeof === "object") et appelle le setter', () => {
        const arr = [1, 2, 3];
        getItemSpy.mockReturnValueOnce(JSON.stringify(arr));

        setFromLocalStorage(KEY, setter);

        // ton implémentation accepte tout "object", y compris Array
        expect(setter).toHaveBeenCalledWith(arr);
        expect(warnSpy).not.toHaveBeenCalled();
    });
});
