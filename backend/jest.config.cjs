module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/generated/"],
  modulePathIgnorePatterns: ["<rootDir>/generated/"],
};
