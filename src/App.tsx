import { useState, useEffect, StrictMode } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core';
import styled from 'styled-components';

import Header from './containers/Header';
import MainLanding from './containers/MainLanding';
// import PrivateFarming from './containers/PrivateFarming';
import LastLook from './containers/LastLook';

import ConnectWallet from './components/ConnectWallet';
import WelcomeToke from './components/WelcomeToke';
import WelcomeToke2 from './components/WelcomeToke2';
import Terms from './components/Terms';
import DebugRouter from './components/DebugRouter';

import Web3ReactManager from './components/Web3ReactManager';
import { NetworkContextName } from './constants/web3';

import './App.css';
import PrivateFarmingNew from './containers/PrivateFarmingNew';

function getLibrary(provider: any) {
  const library = new Web3Provider(provider, 'any');
  library.pollingInterval = 15000;
  return library;
}

const WelcomeContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TermsContainer = styled.div`
  position: fixed;
  left: 16px;
  top: 0px;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConnectWalletContainer = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function App() {
  const [token, setToken] = useState<string>('eth');
  const [privatefarming, setPrivateFarming] = useState(false);
  const [lastlook, setLastLook] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showWelcome2, setShowWelcome2] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [updateBalance, setUpdateBalance] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    setShowTerms(true);
    setShowHeader(true);
  }, []);

  function onWelcomeClose2(flag: boolean) {
    setShowWelcome2(false);
    setShowHeader(false);
  }

  function onWelcomeClose(flag: boolean) {
    setShowWelcome(false);
    setShowWelcome2(true);
    setShowHeader(true);
  }

  function connectWallet() {
    setShowConnectWallet(true);
  }

  function onConnectWalletClose() {
    setShowConnectWallet(false);
  }

  function setUpdate() {
    setUpdateBalance(!updateBalance);
  }

  function onTermsClose() {
    setShowTerms(false);
    setShowHeader(false);
    let first = localStorage.getItem('firstwelcome') ? false : true;
    if (first) {
      setShowConnectWallet(false);
      setShowWelcome(true);
      setShowHeader(true);
      localStorage.setItem('firstwelcome', 'false');
    }
  }

  function setPageState(val: string) {
    setPrivateFarming(false);
    setLastLook(false);
    if (val === 'privatefarming') setPrivateFarming(true);
    else if (val === 'lastlook') setLastLook(true);
  }

  return (
    <StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <div className="App flex flex-col relative font-favorit">
            <div className="w-full relative">
              <DebugRouter />
              <div className={`${showConnectWallet ? 'landing-blur' : ''}`}>
                <Header
                  connectWallet={connectWallet}
                  token={token}
                  updateBalance={updateBalance}
                  showHeader={showHeader}
                />
              </div>
              {showTerms && (
                <TermsContainer>
                  <Terms width={840} height={635} onCloseClick={onTermsClose} />
                </TermsContainer>
              )}
              {showWelcome && (
                <WelcomeContainer>
                  <WelcomeToke
                    width={1085}
                    height={715}
                    onCloseClick={onWelcomeClose}
                  />
                </WelcomeContainer>
              )}
              {showWelcome2 && (
                <WelcomeContainer>
                  <WelcomeToke2
                    width={1085}
                    height={715}
                    onCloseClick={onWelcomeClose2}
                  />
                </WelcomeContainer>
              )}
              {showConnectWallet && (
                <ConnectWalletContainer className="w-full flex flex-col justify-center items-center">
                  <ConnectWallet
                    width={375}
                    height={400}
                    onCloseClick={onConnectWalletClose}
                  />
                </ConnectWalletContainer>
              )}
              <div
                className={`${
                  showWelcome2 || showWelcome || showConnectWallet || showTerms
                    ? 'landing-blur'
                    : ''
                }`}
              >
                {privatefarming ? (
                  <PrivateFarmingNew setPageState={setPageState}  />
                ) : lastlook ? (
                  <LastLook setPageState={setPageState} />
                ) : (
                  <Web3ReactManager>
                    <Switch>
                      <Route path="/privatefarming">
                        <PrivateFarmingNew setPageState={setPageState}  />
                      </Route>
                      <Route path="/lastlook">
                        <LastLook setPageState={setPageState} />
                      </Route>
                      <Route path="/">
                        <MainLanding
                          connectWallet={connectWallet}
                          setToken={setToken}
                          setShowWelcome={onWelcomeClose}
                          setUpdateBalance={setUpdate}
                          setPageState={setPageState}
                        />
                      </Route>
                    </Switch>
                  </Web3ReactManager>
                )}
              </div>
            </div>
            <div
              className={`w-full flex-grow absolute flex flex-col items-center justify-center p-5 pointer-events-none`}
            ></div>
          </div>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </StrictMode>
  );
}

export default App;
