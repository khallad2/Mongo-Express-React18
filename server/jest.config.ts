import type { Config } from 'jest';
import { defaults } from 'jest-config';

/**
 * Jest configuration options.
 * @type {Config}
 */
const config: Config = {
  // Test file patterns to match
  testMatch: ['**/**/*.test.ts'],

  // Enable verbose output during test runs
  verbose: true,

  // Force Jest to exit after tests have completed running
  forceExit: true,

  // Clear mock calls and instances before each test
  clearMocks: true,

  // Reset all mocks before each test
  resetMocks: true,

  // Restore mock state between tests
  restoreMocks: true,

  // Collect coverage information from specified files
  collectCoverageFrom: [
    '**/*.test.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],

  // Module file extensions, including TypeScript files
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'test.ts'],

  // Coverage reporters to use
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],

  // Treat TypeScript files as ECMAScript modules
  extensionsToTreatAsEsm: ['.ts'],
};

export default config;
