// jest.config.ts

import { SourceCode } from "eslint";
import Config = SourceCode.Config;

const config: Config = {
    // @ts-ignore
    preset: "ts-jest",
    testEnvironment: "jsdom",
    // Passer le tsconfig spécifique aux tests
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.jest.json",
        },
    },
    // Où trouver les tests
    testMatch: ["**/__tests__/**/*.(spec|test).ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
    // Fichiers de setup (matchers RTL, polyfills, etc.)
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    // Mapper les imports non-JS (CSS, images) pour éviter les erreurs d'import dans les composants
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/src/tests/__mocks__/fileMock.ts",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    // (optionnel) si tu utilises des alias de paths TS, on pourra ajouter pathsToModuleNameMapper ici
};

export default config;
