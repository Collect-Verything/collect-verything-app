import { emailRegex } from "../../../../common/utils/regex";

// eslint-disable-next-line no-undef
describe("emailRegex", () => {
    // eslint-disable-next-line no-undef
    describe("valide", () => {
        // eslint-disable-next-line no-undef
        test.each([
            "a@b.io",
            "john.doe@example.com",
            "john_doe99@example.co",
            "john+tag@example.co.uk",
            "user.name+alias-1@sub.domain.com",
            "USER@DOMAIN.FR",
            "123456@numbers.net",
            "firstname-lastname@my-company.org",
            "x@y.museum", // TLD >= 2
            "john..doe@example.com", // double point dans local (autorisé par certains, pas toujours souhaité)
            "a.b.c@d-e.fg", // tiret autorisé dans le domaine
            "john.doe@.example.com", // domaine commence par un point
        ])('"%s" devrait correspondre', (email) => {
            // eslint-disable-next-line no-undef
            expect(emailRegex.test(email)).toBe(true);
        });
    });

    // eslint-disable-next-line no-undef
    describe("invalide", () => {
        // eslint-disable-next-line no-undef
        test.each([
            "", // vide
            "plainaddress", // pas de @
            "john.doe@", // pas de domaine
            "@example.com", // pas de local-part
            "john.doe@example", // pas de TLD
            "john.doe@example.c", // TLD 1 caractère
            "john.doe@example.123", // TLD non alphabétique
            "john doe@example.com", // espace
            "john.doe@sub_domain.com", // underscore non autorisé dans domaine
            "john.doe@example.com.", // point final
            "john.doe@@example.com", // double @
            "john.doe@exam!ple.com", // caractère spécial dans domaine
        ])('"%s" ne devrait PAS correspondre', (email) => {
            // eslint-disable-next-line no-undef
            expect(emailRegex.test(email)).toBe(false);
        });
    });
});
