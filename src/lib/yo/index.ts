import { mathUtils } from './helpers';
import { 
  networkTests, walletTests, contractTests, apiTests, 
  previewTests, approvalTests, depositTests, withdrawalTests 
} from './tests/core';
import { mathTests } from './tests/math';

export const allTestDefinitions = [
  ...networkTests,
  ...walletTests,
  ...contractTests,
  ...apiTests,
  ...previewTests,
  ...approvalTests,
  ...depositTests,
  ...withdrawalTests,
  ...mathTests
];

export { mathUtils };
