module.exports = {
  clearMocks: true,
  // collectCoverage: true,
  // collectCoverageFrom: ['*.{ts}'],
  coverageDirectory: "coverage",
  "coverageReporters": ["json", ["lcov", {"projectRoot": "./coverage"}], "text"],
  coverageThreshold: {
    "global": { // TODO
      "functions": 5,
      "lines": 5,
      "statements": 5
    }
  },
  moduleDirectories: [
    "node_modules",
  ],
  notify: true,
  notifyMode: "failure-change",
  preset: 'ts-jest',
  roots: [
    "test"
  ],
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  reporters: ['default'],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  verbose: true,
  moduleNameMapper: {
    "@src/(.*)": ["<rootDir>/src/$1"],
    "@adapters/*": ["<rootDir>/src/adapters/$1"],
    "@application/(.*)": ["<rootDir>/src/application/$1"],
    "@domain/(.*)": ["<rootDir>/src/domain/$1"],
    "@config/(.*)": ["<rootDir>/src/config/$1"],
    "@infrastructure/(.*)": ["<rootDir>/src/infrastructure/$1"],
    "@test/*": ["<rootDir>/test/$1"]
  }
};
