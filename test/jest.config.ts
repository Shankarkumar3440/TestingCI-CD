module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir:".",
    roots: ["src","test"],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex:".*\\.spec\.ts",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    // testEnvironment: 'node',
  };
