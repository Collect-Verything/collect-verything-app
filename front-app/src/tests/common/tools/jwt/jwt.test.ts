import { describe, test, expect, beforeEach, afterEach, jest } from "@jest/globals";

const mockJwtDecode = jest.fn();

jest.mock("jwt-decode", () => ({
    jwtDecode: (token: string) => mockJwtDecode(token),
}));

import { getDecodedAccessToken } from "../../../../common/tools/jwt";

describe("getDecodedAccessToken", () => {
    // @ts-ignore
    let errorSpy: jest.SpyInstance;

    beforeEach(() => {
        mockJwtDecode.mockReset();
        errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        errorSpy.mockRestore();
    });

    test("retourne le payload décodé quand jwtDecode réussit", () => {
        const token = "header.payload.signature";
        const payload = { sub: "123", exp: 1700000000, role: "admin" };

        mockJwtDecode.mockReturnValueOnce(payload);

        const res = getDecodedAccessToken(token);

        expect(mockJwtDecode).toHaveBeenCalledTimes(1);
        expect(mockJwtDecode).toHaveBeenCalledWith(token);
        expect(res).toEqual(payload);
        expect(errorSpy).not.toHaveBeenCalled();
    });

    test("retourne null et log une erreur quand jwtDecode lève une exception", () => {
        const token = "invalid.token";
        const boom = new Error("Invalid token");

        mockJwtDecode.mockImplementationOnce(() => {
            throw boom;
        });

        const res = getDecodedAccessToken(token);

        expect(res).toBeNull();
        expect(mockJwtDecode).toHaveBeenCalledWith(token);
        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy.mock.calls[0][0]).toBe(boom);
    });

    test("token vide: retourne null et log une erreur", () => {
        const boom = new Error("Empty token");

        mockJwtDecode.mockImplementationOnce(() => {
            throw boom;
        });

        const res = getDecodedAccessToken("");

        expect(res).toBeNull();
        expect(mockJwtDecode).toHaveBeenCalledWith("");
        expect(errorSpy).toHaveBeenCalledTimes(1);
    });
});
