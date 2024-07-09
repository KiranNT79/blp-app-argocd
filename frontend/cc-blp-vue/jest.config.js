module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transformIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.ts'],
  moduleNameMapper: {
    "^@dlcm/cc-ui-utils-store-user$": "<rootDir>/tests/__mocks__/cc-ui-utils-store-user.js",
    "^@dlcm/cc-ui-utils-style$": "<rootDir>/tests/__mocks__/cc-ui-utils-style.js",
  },
};
 