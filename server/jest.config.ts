import type {Config} from 'jest';
import {defaults} from 'jest-config';

const config: Config = {
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  collectCoverageFrom: [
    '**/*.test.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'test.ts'],
  coverageReporters: ['clover', 'json', 'lcov', ['text', {skipFull: true}]],
  extensionsToTreatAsEsm: ['.ts'],

};

export default config;
