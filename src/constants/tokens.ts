import { ethers } from 'ethers';

export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  formatDecimals: number;
}

export const ETH: Token = {
  symbol: 'ETH',
  name: 'Ethereum',
  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  decimals: 18,
  formatDecimals: 3,
};

export const USDC: Token = {
  symbol: 'USDC',
  name: 'USD Coin',
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  decimals: 6,
  formatDecimals: 2,
};

export const TokenList = [ETH, USDC];

export function getTokenBySymbol(symbol: string): Token {
  const token = TokenList.find(
    (t) => t.symbol.toLowerCase() === symbol.toLowerCase()
  );
  if (!token)
    throw Error(
      `Unknown token ${symbol}. Allowed tokens are ${TokenList.map(
        (t) => t.symbol
      ).join()}`
    );
  return token;
}

export function getTokenByAddress(address: string): Token {
  const token = TokenList.find(
    (t) => t.address.toLowerCase() === address.toLowerCase()
  );
  if (!token)
    throw Error(
      `Unknown token ${address}. Allowed tokens are ${TokenList.map(
        (t) => t.address
      ).join()}`
    );
  return token;
}

export const DEFI_ADDRESS =
  process.env.REACT_APP_DEFI_CONTRACT_ADDRESS ||
  // '0x809d550fca64d94Bd9F66E60752A544199cfAC3D';
  // '0xcE0066b1008237625dDDBE4a751827de037E53D2'; // with chrome
  '0x4c5859f0F772848b2D91F1D83E2Fe57935348029'; // with extension

let ethAmt = 35;
if (process.env.REACT_APP_ETH_LIMIT) {
  ethAmt = parseInt(process.env.REACT_APP_ETH_LIMIT);
}

export const ETH_LIMIT = ethAmt;

let usdcAmt = 100000;
if (process.env.REACT_APP_USDC_LIMIT) {
  usdcAmt = parseInt(process.env.REACT_APP_USDC_LIMIT);
}

export const USDC_LIMIT = usdcAmt;
export const USDC_LIMIT_BIG_NUMBER = ethers.utils.parseUnits(
  usdcAmt.toString(),
  USDC.decimals
);
