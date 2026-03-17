import { mathUtils } from '../helpers';
import { 
  networkTests, walletTests, contractTests, apiTests, 
  previewTests, approvalTests, depositTests, withdrawalTests 
} from './core';
import { mathTests } from './math';

export const allTests = [
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
