import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';

import TokoIcon from '../assets/img/toko.svg';
import TimesThin from '../assets/img/times-thin.svg';

import { BiLeftArrowAlt } from 'react-icons/bi';

import { isRightNetwork } from '../utils/web3';
// import { toFloat } from '../utils/number'
import { SUPPORTED_WALLETS } from '../constants/wallets';

import { AbstractConnector } from '@web3-react/abstract-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const ConnectWalletButton = styled.div`
  background-color: #b5ff00;
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 15px;
  margin-right: 17px;
  margin-top: 15px;
  font-size: 17px;
  letter-spacing: -0.5px;

  &:hover {
    background-color: #d8fe86;
  }
`;

interface ConnectWalletProps {
  width?: number;
  height?: number;
  onCloseClick?: () => void;
  onConnected?: () => void;
}

export default function ConnectWallet({
  width,
  height,
  onCloseClick,
  onConnected,
}: ConnectWalletProps) {
  const [visibleFlag, setVisibleFlag] = useState<boolean>(true);
  const { account, chainId, library, activate, connector } = useWeb3React();
  // const [balance, setBalance] = useState(-1)
  // const [commitval, setCommitVal] = useState<string>('0')

  useEffect(() => {
    async function fetchBalance() {
      try {
        if (onConnected) onConnected();
        if (onCloseClick) onCloseClick();
      } catch (e) {
        console.log(e);
      }
    }

    if (!library || !account || !isRightNetwork(chainId)) return;
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account, library]);

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (
      connector instanceof WalletConnectConnector &&
      connector.walletConnectProvider?.wc?.uri
    ) {
      connector.walletConnectProvider = undefined;
    }

    connector &&
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector); // a little janky...can't use setError because the connector isn't set
        }
      });
  };

  function setMainStyle() {
    let styles = {
      borderRadius: '5px',
      border: '1px solid #ffffff',
    };
    if (width && height) {
      const firstStyle = {
        width: '' + width + 'px',
        height: '' + height + 'px',
      };
      styles = Object.assign(styles, firstStyle);
    }
    return styles;
  }

  function setLogoContainerStyle() {
    let styles = {
      width: '145px',
      height: '145px',
      left: 'calc(50% - 72.5px)',
      top: '-75.5px',
      backgroundColor: '#000000',
      padding: '20px',
    };
    return styles;
  }

  function setLogoStyle() {
    let styles = {
      borderRadius: '50%',
      border: '2px solid #B5FF00',
      width: '100%',
      height: '100%',
      padding: '20px',
    };
    return styles;
  }

  function setCloseStyle() {
    let styles = {
      border: '1px solid #ffffff',
      width: '20px',
      height: '20px',
      top: '18px',
      right: '23px',
    };
    return styles;
  }

  function setTitleStyle() {
    let styles = {
      fontSize: '24px',
      marginTop: '61px',
    };
    return styles;
  }

  function setApproveStyle() {
    let styles = {
      paddingLeft: '18px',
      paddingRight: '18px',
      backgroundColor: 'rgba(55, 55, 55, 0.1)',
    };
    return styles;
  }

  function setButtonsStyle() {
    let styles = {
      marginLeft: '-6px',
      marginBottom: '38px',
      marginTop: '20px',
    };
    return styles;
  }

  function onClose() {
    setVisibleFlag(false);
    if (onCloseClick) onCloseClick();
  }

  return (
    <div>
      {visibleFlag && (
        <div className="relative flex flex-col" style={setMainStyle()}>
          <div className="absolute" style={setLogoContainerStyle()}>
            <div className="flex" style={setLogoStyle()}>
              <img src={TokoIcon} alt="Token Icon" />
            </div>
          </div>
          <div
            className="absolute text-white cursor-pointer flex items-center justify-center"
            style={setCloseStyle()}
          >
            <span onClick={onClose}>
              <img src={TimesThin} alt="" />
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            <div
              className="uppercase text-center font-bold text-white"
              style={setTitleStyle()}
            >
              Connect Wallet
            </div>
            <div
              className="text-white text-md text-left flex flex-col"
              style={setApproveStyle()}
            >
              {Object.keys(SUPPORTED_WALLETS).map((key) => (
                <ConnectWalletButton
                  className={`font-bold text-center cursor-pointer text-black flex flex-row justify-between`}
                  key={key}
                  onClick={(e) => {
                    if (SUPPORTED_WALLETS[key].connector !== connector)
                      if (!SUPPORTED_WALLETS[key].href)
                        tryActivation(SUPPORTED_WALLETS[key].connector);
                  }}
                >
                  <div className="pl-2">{SUPPORTED_WALLETS[key].name}</div>
                  <img
                    src={
                      require('../assets/img/' +
                        SUPPORTED_WALLETS[key].iconName).default
                    }
                    width="24px"
                    height="24px"
                    className="mr-2"
                    alt=""
                  />
                </ConnectWalletButton>
              ))}
            </div>
          </div>
          <div
            style={setButtonsStyle()}
            className="flex flex-row text-white items-center uppercase justify-center cursor-pointer"
            onClick={onClose}
          >
            <BiLeftArrowAlt className="align-middle" size={22} />
            go back
          </div>
        </div>
      )}
    </div>
  );
}
