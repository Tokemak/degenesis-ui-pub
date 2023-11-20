import { AbstractConnector } from '@web3-react/abstract-connector';
import {
  injected,
  walletconnect
} from './web3';

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  iconName: string;
  description: string;
  href: string | null;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
  },
  // TRUST_WALLET: {
  //   connector: injected,
  //   name: 'TrustWallet',
  //   iconName: 'trustWallet.png',
  //   description: 'Connect to Trust Wallet',
  //   href: null,
  // }
};
