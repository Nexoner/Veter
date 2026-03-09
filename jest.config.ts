import type { Config } from "jest";

const config: Config = {
    testEnvironment: "jsdom",
    roots: ["<rootDir>/__tests__"],
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.json",
                jsx: "react-jsx",
            },
        ],
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};

export default config;
