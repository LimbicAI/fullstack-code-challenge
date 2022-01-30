module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: ["**/*.{ts,tsx}", "!**/node_modules/**"],
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react-jsxdev",
      },
    },
  },
};
