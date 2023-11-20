import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { USDC } from '../constants/tokens';
import { ethers } from 'ethers';
import { SUPPORTED_CHAINIDS } from '../constants/web3';
import ERC20_ABI from '../contracts/erc20.json';
import CHAINLINK_ABI from '../contracts/chainlinkAggregator.json';

export const isRightNetwork = (chainId: any) => {
  return SUPPORTED_CHAINIDS.includes(chainId);
};

export function getChainlinkPriceFeed(
  address: string,
  provider: ethers.providers.Provider
) {
  return new Contract(address, CHAINLINK_ABI as any, provider);
}

export function isAddress(value: any) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
export function isAddressString(value: any) {
  try {
    return getAddress(value);
  } catch {
    return '';
  }
}

export function getSigner(library: any, account: any) {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library: any, account: any) {
  return account ? getSigner(library, account) : library;
}

export function getContract(
  address: any,
  ABI: any,
  library: any,
  account: any
) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export async function getBalance(address: any, token: any, library: any) {
  try {
    let bal;
    if (!isAddress(token) || token === AddressZero) {
      bal = await library.getBalance(address);
      return bal;
    }
    const contract = getContract(token, ERC20_ABI, library, address);
    bal = await contract.balanceOf(address);
    return bal;
  } catch (e) {
    console.log(e);
  }
  return 0;
}

export async function getUsdcAllowance(
  userAddress: any,
  library: any,
  defiContractAddress: any
) {
  try {
    const usdcContract = getContract(
      USDC.address,
      ERC20_ABI,
      library,
      userAddress
    );
    const allowance = await usdcContract.allowance(
      userAddress,
      defiContractAddress
    );
    return allowance;
  } catch (e) {
    console.log(e);
  }
  return 0;
}

export const formatBalance = (
  value: any,
  decimals = 18,
  maxFraction = 0
): string => {
  
  try {
    if (!value)
      return '0';
    const formatted = value.toString().indexOf(".") > -1 ? value : ethers.utils.formatUnits(value, decimals);
    if (maxFraction > 0) {
      const split = formatted.split('.');
      
      if (split.length > 1) {
        let val = split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + split[1].substr(0, maxFraction);
        if (val.indexOf('.0') === val.length - 2) {
          val = val + '0';
        }
        return val;
      }
    }
    
    
    return formatted;
  } catch (e) {
    console.log(e);
  }
  return '0';
};
