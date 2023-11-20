import {
  TokenList,
  getTokenBySymbol,
  Token,
  getTokenByAddress,
} from '../constants/tokens';
import { getChainlinkPriceFeed } from './web3';
import { ethers, BigNumber } from 'ethers';

/**
 * Returns ETH/USDC value in USD
 */

const viewWeb3 = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_WEB3_TOKEMAK
);
const wethOracle = getChainlinkPriceFeed(
  process.env.REACT_APP_CHAINLINK_WETH!,
  viewWeb3
);

const lastCoinValue = {
  ethereum: { usd: 0 },
  'usd-coin': { usd: 0 },
} as { ethereum: { usd: number }; 'usd-coin': { usd: number } } & Record<
  string,
  { usd: number }
>;
export async function getCurrentCoinValue() {
  try {
    // usdc is being fixed at 1 USDC/USD
    const usdcRound = BigNumber.from(100000000);

    const wethRound = await wethOracle.latestRoundData.call();
    const wethValue = ethers.utils.formatUnits(wethRound[1].toString(), 8);
    const usdcValue = ethers.utils.formatUnits(usdcRound.toString(), 8);
    const lastCoinValue = {
      ethereum: { usd: parseFloat(wethValue) },
      'usd-coin': { usd: parseFloat(usdcValue) },
    } as { ethereum: { usd: number }; 'usd-coin': { usd: number } } & Record<
      string,
      { usd: number }
    >;
    return lastCoinValue;
  } catch (err) {
    console.log(err);
    return lastCoinValue;
  }
}

export function calculateTotalContractBalanceAsNumber(
  data: any,
  currentCoinValue: any
) {
  const finalEthQty = parseFloat(process.env.REACT_APP_FINAL_ETH_QTY || "0")
  const finalUsdcQty = parseFloat(process.env.REACT_APP_FINAL_USDC_QTY || "0")
  const finalEthToUsd = parseFloat(process.env.REACT_APP_ETH_IN_USD || "0")
  return finalEthQty * finalEthToUsd + finalUsdcQty;
}

export function calculateTotalContractBalance(
  data: any,
  currentCoinValue: any
) {
  return calculateTotalContractBalanceAsNumber(data, currentCoinValue)
    .toFixed()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatUserCommitment(data: any): any {
  if (!data.user || !data.user.balances) return '';

  const balance = data.user.balances[0];

  if (balance.token.id === TokenList[1].address.toLowerCase()) {
    // in case it is USDC deposited user
    const rawDecimal = parseFloat(
      ethers.utils.formatUnits(balance.total.toString(), 6)
    );
    const usdcDecimal = rawDecimal
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return { value: usdcDecimal, rawValue: rawDecimal, symbol: 'usdc' };
  } else {
    // in case it is ETH deposited user
    const val = ethers.BigNumber.from(balance.total.toString()).div(
      ethers.BigNumber.from('10').pow(15)
    );
    const rawValue = parseFloat(ethers.utils.formatUnits(val.toString(), 3));
    const ethDecimal = parseFloat(rawValue.toFixed(3));
    return { value: ethDecimal, rawValue: rawValue, symbol: 'eth' };
  }
}

export function getCommitmentAmountForToken(
  token: string,
  data: any = {}
): string | undefined {
  let parsedToken: Token;
  try {
    parsedToken = getTokenBySymbol(token);
  } catch (e) {
    console.error(`error getting token ${token}`);
    return;
  }

  const balances = data?.user?.balances || [];
  const balance =
    balances.find(
      (b: any) =>
        b?.token?.id?.toLowerCase() === parsedToken.address.toLowerCase()
    ) || {};
  return balance?.total;
}

export function getCommittedToken(data: any): Token | undefined {
  const token = data?.user?.balances?.[0].token.id;
  if (!token) {
    return;
  }

  return getTokenByAddress(token);
}
