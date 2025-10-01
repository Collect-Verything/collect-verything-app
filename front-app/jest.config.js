/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: "jsdom",
    transform: { "^.+\\.(ts|tsx|js|jsx)$": "babel-jest" },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js|jsx)"],
    transformIgnorePatterns: ["/node_modules/"],
};
