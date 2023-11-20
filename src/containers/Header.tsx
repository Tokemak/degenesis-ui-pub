import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
// @ts-ignore
import Identicon from 'react-identicons';
import { BsFillUnlockFill } from 'react-icons/bs';
import { BsFillLockFill } from 'react-icons/bs';
import { MdSwapHoriz } from 'react-icons/md';
import { GrTwitter } from 'react-icons/gr';
import { AiOutlineMedium } from 'react-icons/ai';
import { useSubscription } from '@apollo/client';

import ProgressBar from '../components/ProgressBar';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { isRightNetwork, getBalance, formatBalance } from '../utils/web3';
import { toFloat } from '../utils/number';
import { TokenList, DEFI_ADDRESS } from '../constants/tokens';
import {
  MediumLink,
  TwitterLink,
  TokemakRadio,
  DiscordIconLink,
} from '../constants/links';
import {
  DegenesisEvent,
  TokeMak,
  ProgressUpper,
  ProgressBarWrapper,
  ProgressLower,
  ProgressLowerSmall,
  LockUpper,
  UnlockWrapper,
  LockWrapper,
  ProgressUpperB,
  ProgressBarWrapperB,
  ProgressLowerB,
  SwapUpper,
  UnswapWrapper,
  SwapWrapper,
  ProgressLowerSmallB,
  SocialConnect,
  ConnectWrapper,
  WalletWrapper,
  SocialLinkIcon,
  ProgressContainer,
} from './HeaderStyle';
import MetaMaskIcon from '../assets/img/metamask.png';
import TokoIcon from '../assets/img/SkullRadio.svg';
import DiscordIcon from '../assets/img/discordlogo.svg';
import { DefiStage, getCurrentStage } from '../utils/CurrentStageUtil';
import { TOTAL_COMMITMENT } from '../Query';

interface HeaderProps {
  lock?: boolean;
  swap?: boolean;
  token?: string;
  updateBalance?: boolean;
  showHeader?: boolean;
  onConnected?: () => void;
  connectWallet?: () => void;
}

export default function Header({
  lock = false,
  swap = false,
  token = 'eth',
  updateBalance = false,
  showHeader = false,
  onConnected,
  connectWallet,
}: HeaderProps) {
  const { account, chainId, library } = useWeb3React();
  const [balance, setBalance] = useState(-1);
  const { height, width } = useWindowDimensions();
  const [commitmentprogress, setCommitmentprogress] = useState(225);
  const [lastlookprogress, setLastlookprogress] = useState(105);
  const [privatefarming, setPrivatefarming] = useState(323);
  const [updateBal, setUpdateBal] = useState(false);
  const [lockstate, setLockState] = useState(lock);
  const [swapstate, setSwapState] = useState(lock);
  const [commitmentProgress, setCommitmentProgress] = useState<number>(0);
  const [lastlookProgress, setLastLookProgress] = useState<number>(0);
  const [privatefarmingProgress, setPrivateFarmingProgress] =
    useState<number>(0);

  const [currentStage, setCurrentStage] = useState(
    getCurrentStage(DefiStage.COMMITMENT)
  );

  const { data: contractData } = useSubscription(TOTAL_COMMITMENT, {
    variables: {
      contractAddress: DEFI_ADDRESS.toLowerCase(),
    },
  });

  const COMMITMENT_PERIOD = 7 * 24 * 60 * 60;
  const LASTLOOK_PERIOD = 24 * 60 * 60;
  const PRIVATEFARMING_PERIOD = 14 * 24 * 60 * 60;

  useEffect(() => {
    async function getCurStage() {
      try {
        const currentstage = getCurrentStage(currentStage, contractData);
        setCurrentStage(currentstage);
        const current = +new Date();
        if (currentstage === DefiStage.COMMITMENT) {
          if (process.env.REACT_APP_COMMITMENT_COUNTER) {
            const remained =
              +process.env.REACT_APP_COMMITMENT_COUNTER - current / 1000;
            setCommitmentProgress(
              Math.floor((1 - remained / COMMITMENT_PERIOD) * 100)
            );
          }
        } else if (currentstage === DefiStage.LAST_LOOK) {
          setLockState(true);
          setCommitmentProgress(100);
          if (process.env.REACT_APP_LASTLOOK_COUNTER) {
            const remained =
              +process.env.REACT_APP_LASTLOOK_COUNTER - current / 1000;
            const progress = Math.min(
              (1 - remained / LASTLOOK_PERIOD) * 100,
              100
            );
            setLastLookProgress(progress);
          }
        } else if (currentstage === DefiStage.PRIVATE_FARMING) {
          setLockState(true);
          setSwapState(true);
          setCommitmentProgress(100);
          setLastLookProgress(100);
          setPrivateFarmingProgress(100);
        }
      } catch (err) {
        console.log(err);
        console.log('stage error');
      }
    }

    async function fetchBalance() {
      try {
        let newBalance = await getBalance(account, null, library);
        newBalance = formatBalance(newBalance);
        if (token === 'usdc') {
          newBalance = await getBalance(account, TokenList[1].address, library);
          newBalance = formatBalance(newBalance, 6);
        }
        setBalance(Math.trunc(toFloat(newBalance) * 100) / 100);
        if (updateBal !== updateBalance) setUpdateBal(updateBalance);
        else if (onConnected) onConnected();
      } catch (e) {
        console.log(e);
      }
    }

    getCurStage();
    if (!library || !account || !isRightNetwork(chainId)) return;
    fetchBalance();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    chainId,
    account,
    library,
    token,
    updateBalance,
    contractData,
    currentStage,
  ]);

  useEffect(() => {
    if (width < 1800) {
      setCommitmentprogress((225 * width) / 1920 - 20);
      setLastlookprogress((105 * width) / 1920);
      setPrivatefarming((323 * width) / 1920 - 20);
    } else {
      setCommitmentprogress(225);
      setLastlookprogress(105);
      setPrivatefarming(323);
    }
  }, [width, height]);

  function setLastLookStyle() {
    let styles = {};
    if (width < 1700) {
      let firstStyle = {
        marginTop: '-14px',
      };
      styles = Object.assign(styles, firstStyle);
    }
    return styles;
  }

  function setPrivateFarmingStyle() {
    let styles = {};
    if (width < 1450) {
      let firstStyle = {
        marginTop: '-14px',
      };
      styles = Object.assign(styles, firstStyle);
    }
    return styles;
  }

  return (
    <div className="flex flex-row mt-5">
      <div className={`flex justify-between w-full`}>
        <div className="mx-5 pl-4 pr-4">
          <TokeMak className="text-white pt-3">TOKEMAK</TokeMak>
          <DegenesisEvent className="uppercase text-left font-bold">
            DEGENESIS EVENT
          </DegenesisEvent>
        </div>
        <ProgressContainer
          className={`flex flex-row text-left ${
            showHeader ? 'landing-blur' : ''
          }`}
        >
          <div>
            <ProgressUpper className="uppercase text-white text-sm">
              Commitment
            </ProgressUpper>
            <ProgressBarWrapper>
              <ProgressBar
                width={commitmentprogress}
                height={17}
                val={commitmentProgress}
                striped={true}
                borderradius={1}
                maincolor={'#8cb22e'}
                bgcolor={'#1c1c1c'}
                stripedegree={135}
              />
            </ProgressBarWrapper>
            <ProgressLower className="flex flex-row justify-end items-baseline text-gray text-xs uppercase">
              <ProgressLowerSmall>(7 Days)</ProgressLowerSmall>
            </ProgressLower>
          </div>

          <div className="text-center uppercase text-gray">
            <LockUpper>Rate</LockUpper>
            {!lockstate ? (
              <UnlockWrapper className="flex justify-center items-center">
                <BsFillUnlockFill
                  size={10}
                  style={{ transform: 'rotateY(180deg)' }}
                />
              </UnlockWrapper>
            ) : (
              <LockWrapper className="flex justify-center items-center">
                <BsFillLockFill size={10} className="text-white" />
              </LockWrapper>
            )}
          </div>

          <div className="text-left uppercase">
            <ProgressUpperB
              className="uppercase text-white text-sm"
              style={setLastLookStyle()}
            >
              Last{width < 1700 ? <br /> : <span> </span>}Look
            </ProgressUpperB>
            <ProgressBarWrapperB>
              <ProgressBar
                width={lastlookprogress}
                height={17}
                val={lastlookProgress}
                striped={true}
                maincolor={'#8cb22e'}
                bgcolor={'#1c1c1c'}
                stripedegree={135}
              />
            </ProgressBarWrapperB>
            <ProgressLowerB className="flex flex-row justify-end items-baseline text-gray text-xs uppercase">
              <ProgressLowerSmall>(24 HOURS)</ProgressLowerSmall>
            </ProgressLowerB>
          </div>

          <div className="uppercase text-gray">
            <SwapUpper>Swap</SwapUpper>
            {!swapstate ? (
              <UnswapWrapper className="flex justify-center items-center">
                <MdSwapHoriz size={10} />
              </UnswapWrapper>
            ) : (
              <SwapWrapper className="flex justify-center items-center">
                <MdSwapHoriz size={10} className="text-white" />
              </SwapWrapper>
            )}
          </div>

          <div className="text-left uppercase">
            <ProgressUpperB
              className="text-white text-sm"
              style={setPrivateFarmingStyle()}
            >
              Claim TOKE + {width < 1450 ? <br /> : <span></span>}Private
              Farming
            </ProgressUpperB>
            <ProgressBarWrapperB>
              <ProgressBar
                width={privatefarming}
                height={17}
                val={privatefarmingProgress}
                striped={true}
                borderradius={2}
                maincolor={'#8cb22e'}
                bgcolor={'#1c1c1c'}
                stripedegree={135}
              />
            </ProgressBarWrapperB>
            <ProgressLowerB className="flex flex-row px-1 justify-end items-baseline text-gray text-xs uppercase">
              <ProgressLowerSmallB>(14 Days)</ProgressLowerSmallB>
            </ProgressLowerB>
          </div>
        </ProgressContainer>
        <SocialConnect
          className={`text-white flex justify-center items-center ${
            width < 1650 ? 'flex-col' : 'flex-row'
          } ${showHeader ? 'landing-blur' : ''}`}
          flag={width < 1650}
        >
          <div
            className={`flex flex-row ${width < 1650 ? 'mb-1' : ''}`}
            style={{
              width: width < 1650 ? '100%' : 'auto',
              justifyContent: 'flex-end',
            }}
          >
            <SocialLinkIcon>
              <a href={DiscordIconLink} target="_blank" rel="noreferrer">
                <img
                  style={{ width: '90%', position: 'relative', left: '-4px' }}
                  src={DiscordIcon}
                  alt="DIscord"
                />
              </a>
            </SocialLinkIcon>
            <SocialLinkIcon>
              <a href={TwitterLink} target="_blank" rel="noreferrer">
                <GrTwitter size={20} />
              </a>
            </SocialLinkIcon>
            <SocialLinkIcon>
              <a href={MediumLink} target="_blank" rel="noreferrer">
                <AiOutlineMedium size={20} />
              </a>
            </SocialLinkIcon>
            <SocialLinkIcon>
              <a href={TokemakRadio} target="_blank" rel="noreferrer">
                <img src={TokoIcon} width={20} height={20} alt="TokoIcon" />
              </a>
            </SocialLinkIcon>
          </div>
          <ConnectWrapper className="flex flex-row items-center">
            <img
              src={MetaMaskIcon}
              width={20}
              height={20}
              className="mx-3"
              alt="MetaMask Icon"
            />
            {account && (
              <div className="uppercase mr-2">
                {balance === -1
                  ? ''
                  : balance
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                <span className="uppercase">{token}</span>
              </div>
            )}
            {!account ? (
              <WalletWrapper
                className="flex justify-center items-center text-white px-3 cursor-pointer"
                onClick={(e) => {
                  if (connectWallet) {
                    connectWallet();
                  }
                }}
              >
                <div style={{ height: '100%' }}>
                  <span style={{ lineHeight: '40px' }}>Connect Wallet</span>
                </div>
              </WalletWrapper>
            ) : (
              <WalletWrapper className="flex justify-center items-center text-white px-3 cursor-pointer">
                <div className="flex flex-row items-center">
                  <span className="mr-1" style={{ lineHeight: '40px' }}>
                    {account.slice(0, 5) + '...' + account.slice(-5)}
                  </span>
                  <Identicon string={account} size={20} />
                </div>
              </WalletWrapper>
            )}
          </ConnectWrapper>
        </SocialConnect>
      </div>
    </div>
  );
}
