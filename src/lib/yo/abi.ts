import { parseAbi } from 'viem';

export const yoGatewayAbi = parseAbi([
  'function deposit(address yoVault, uint256 assets, uint256 minSharesOut, address receiver, uint256 partnerId)',
  'function redeem(address yoVault, uint256 shares, uint256 minAssetsOut, address receiver)',
  'function previewDeposit(address yoVault, uint256 assets) view returns (uint256)',
  'function previewRedeem(address yoVault, uint256 shares) view returns (uint256)'
]);

export const erc20Abi = parseAbi([
  'function balanceOf(address owner) view returns (uint256)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)'
]);

export const yoVaultAbi = parseAbi([
  'function asset() view returns (address)'
]);
