import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaEthereum } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';
import UsdcIcon from '../assets/img/usdc.svg';
import { TiInfoLarge } from 'react-icons/ti';
import { useWeb3React } from '@web3-react/core';
import { useSubscription } from '@apollo/client';
import TokeBar from '../components/TokeBar';
import CommitmentGraph from '../components/CommitmentGraph';
import {
  isRightNetwork,
  getBalance,
  formatBalance,
  getContract,
  getUsdcAllowance,
} from '../utils/web3';
import { toFloat } from '../utils/number';
import EtherAmtSelector from '../components/EthAmtSelector';
import {
  TokenList,
  USDC_LIMIT,
  ETH_LIMIT,
  DEFI_ADDRESS,
} from '../constants/tokens';
import DEFIROUND_ABI from '../contracts/defiround.json';
import { MediumTokemakDegenesis } from '../constants/links';
import { TOTAL_COMMITMENT, USER_COMMITMENT } from '../Query';
import {
  calculateTotalContractBalance,
  formatUserCommitment,
  getCurrentCoinValue,
  getCommitmentAmountForToken,
  calculateTotalContractBalanceAsNumber,
} from '../utils/CommitmentUtils';

import { getProof, MerkleTree } from '@airswap/merkle';
import { ethers } from 'ethers';

import CommitmentModal from '../components/CommitmentModal';
import CurrentTimestamp from '../components/CurrentTimestamp';
import { DefiStage, getCurrentStage } from '../utils/CurrentStageUtil';
import ErrorModal from '../components/ErrorModal';

const BigNumber = ethers.BigNumber;

const CommitmentPanelL = styled.div`
  border-radius: 5px;
  border: 1px solid #ffffff;
  width: 338px;
  margin-top: 36px;
  height: fit-content;
  min-width: 350px;
  max-width: 22.5vw;
`;

const CommitmentPanelR = styled.div`
  border-radius: 5px;
  border: 1px solid #ffffff;
  width: 338px;
  margin-top: 36px;
  margin-right: 16px;
  height: fit-content;
  min-width: 350px;
  max-width: 22.5vw;
`;

const CommitmentPanelCenter = styled.div`
  border-radius: 5px;
  border: 1px solid #ffffff;
  margin-top: 36px;
  margin-right: 16px;
  height: fit-content;
  min-width: 750px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1200px;
  flex: 1;
  padding-bottom: 25px;
`;

const CommitTitle = styled.div`
  border-left: 5px solid #b5ff00;
  margin-top: 32px;
  padding-left: 9.6px;
  margin-right: 24px;
  font-size: 22.4px;
  line-height: 1.3;
  letter-spacing: 1px;
`;

const CommitTitle2 = styled.div`
  border-left: 5px solid #b5ff00;
  margin-top: 21px;
  padding-left: 10px;
  margin-right: 24px;
  font-size: 22.4px;
  line-height: 1.3;
  letter-spacing: 1.1px;
`;

const CommitTitle3 = styled.div`
  border-left: 5px solid #b5ff00;
  margin-top: 21px;
  padding-left: 10px;
  margin-right: 45px;
  font-size: 24px;
  // line-height: 16.8px;
  letter-spacing: 120%;
`;

const CommitDescription = styled.div`
  padding-left: 9px;
  padding-top: 10px;
  background: rgba(97, 97, 97, 0.1);
  margin-top: 17px;
  letter-spacing: 0.1px;
  padding-right: 16px;
`;

const CommitDescription2 = styled.div`
  padding-left: 16px;
  padding-top: 10px;
  margin-top: 26px;
  background: rgba(97, 97, 97, 0.1);
  letter-spacing: 0.1px;
  padding-right: 16px;
`;

const CommitDescription3 = styled.div`
  padding-left: 9px;
  padding-top: 10px;
  // background: rgba(97, 97, 97, 0.1);
  margin-top: 17px;
  letter-spacing: 0.1px;
  padding-right: 16px;
`;

const ConnectWalletPanel = styled.div`
  background-color: rgba(97, 97, 97, 0.1);
  margin-top: 13px;
  padding-top: 12.8px;
  padding-bottom: 12.8px;
`;

const ConnectWalletPanel2 = styled.div`
  background-color: rgba(97, 97, 97, 0.1);
  margin-top: 0px;
  padding-top: 12.8px;
  padding-bottom: 12.8px;
`;

const ConnectWallet = styled.div`
  background-color: #b5ff00;
  border-radius: 5px;
  margin-left: 16px;
  margin-right: 17px;
  padding-top: 9.6px;
  padding-bottom: 8px;

  &:hover {
    background-color: #d8fe86;
  }
`;

const ConnectWallet2 = styled.button`
  background-color: #b5ff00;
  border-radius: 5px;
  margin-left: 16px;
  margin-right: 17px;
  padding-top: 9.6px;
  padding-bottom: 8px;
  user-select: none;
  margin-top: 15px;

  &:not([disabled]):hover {
    background-color: #d8fe86;
  }

  &[disabled] {
    cursor: not-allowed;
  }
`;

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

const MainContainer = styled.div`
  padding-top: 57.6px;
`;

const CommitmentTitle = styled.div`
  font-size: 21.44px;
  padding-left: 8px;
  padding-top: 2.4px;
`;

const RemainTime = styled.div`
  padding-left: 9.6px;
  padding-top: 7.2px;
`;

const CommitmentHR = styled.hr`
  margin-top: 3px;
`;

interface IInfoMessage {
  marginTop: number;
  marginRight: number;
}

const InfoMessage = styled.div<IInfoMessage>`
  padding-left: 16px;
  margin-top: ${(props) => props.marginTop}px;
  margin-right: ${(props) => props.marginRight}px;
  font-size: 10.88px;
  margin-bottom: 12.8px;
  line-height: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoWrapper = styled.div`
  border-radius: 50%;
  border: 1px solid #b5ff00;
  margin-right: 9.6px;
`;

const YourCommitments = styled.div`
  padding-left: 8px;
  padding-top: 6.4px;
`;

const EtherAmountWrapper = styled.div`
  padding-left: 6.4px;
  margin-top: -6.4px;
  padding-bottom: 5px;
`;

const DollarAmount = styled.div`
  font-size: 33.6px;
  padding-left: 9.6px;
  letter-spacing: 1px;
`;

const TotalConversionRate = styled.div`
  padding-left: 8px;
  padding-top: 6.4px;
`;

const TokePrice = styled.div`
  font-size: 33.6px;
  padding-left: 9.6px;
  letter-spacing: 1px;
`;

const TokePriceWrapper = styled.div`
  padding-left: 6.4px;
  padding-bottom: 9.6px;
`;

const TokeBarWrapper = styled.div`
  margin-left: 28px;
  margin-top: 32px;
  margin-bottom: 32px;
`;

const AsOf = styled.div`
  font-size: 12px;
  letter-spacing: 1px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const MaxCommitment = styled.div`
  font-size: 11px;
  padding-left: 15px;
  padding-top: 15px;
`;

const CommitmentCenterPanelHeader = styled.div`
  text-transform: uppercase;
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid white;
  padding-left: 12px;
  padding-right: 12px;
`;

const EventStateTitle = styled.div`
  font-size: 21.44px;
  color: white;
`;

const TotalCommitments = styled.span`
  font-size: 36px;
  padding-left: 10px;
  font-weight: bold;
  font-family: 'ABC Favorit Mono';
`;

const TotalCommitmentsContainer = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
`;

const CommittedAssetsLegend = styled.div`
  color: white;
  text-transform: uppercase;
  font-size: 20px;
  margin-top: 35px;
`;

const EffectiveLabel = styled.div`
  color: white;
  position: absolute;
  left: -3.5rem;
  top: 50%;
  transform: rotate(270deg);
  text-transform: uppercase;
  font-size: 20px;
`;

const ErrorContainer = styled.div`
  position: fixed;
  left: 16px;
  top: 0px;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface MainLandingProps {
  setToken?: (token: string) => void;
  setShowWelcome?: (val: boolean) => void;
  connectWallet?: () => void;
  setUpdateBalance?: () => void;
  setPageState?: (val: string) => void;
}

interface LocalWhitelistSettings {
  allowed: boolean;
  proof: [];
}

function isSoldOut(tvl: number): boolean {
  return tvl >= 48000000;
}

export default function MainLanding({
  setToken,
  setShowWelcome,
  connectWallet,
  setUpdateBalance,
  setPageState,
}: MainLandingProps) {
  const showTokemakLink = process.env.REACT_APP_SHOW_TOKEMAK_LINK === '1';

  const [showCommitSummary, setShowCommitSummary] = useState(false);
  const { account, chainId, library, deactivate } = useWeb3React();
  const [balance, setBalance] = useState(-1);
  const [commitval, setCommitVal] = useState<string>('0');
  const [curToken, setCurToken] = useState<string>('eth');
  const [maxcommit, setMaxCommit] = useState(ETH_LIMIT);
  const [whitelistAllowed, setIsWhitelistAllowed] =
    useState<LocalWhitelistSettings>({ allowed: false, proof: [] });
  const [swapRate, setSwapRate] = useState<number>();
  const [farmingRate, setFarmingRate] = useState<number>();
  const [remainDay, setRemainDay] = useState<number>(0);
  const [remainHour, setRemainHour] = useState<number>(0);
  const [remainMinute, setRemainMinute] = useState<number>(0);
  const [hideWhitelist, setHideWhitelist] = useState<boolean>(false);
  const [whitelistSetOnce, setWhitelistSecOnce] = useState<boolean>(false);
  const [contractTVL, setContractTVL] = useState(0);

  const [canCommit, setCanCommit] = useState<{
    allowed: boolean;
    reason: string;
  }>({ allowed: false, reason: '' });

  // used exclusively for changing text on MainLanding when a user does not
  // have their wallet connected. It does not move users through the pages.
  const [currentStage, setCurrentStage] = useState(
    getCurrentStage(DefiStage.COMMITMENT)
  );

  const [tokePrice, setTokePrice] = useState<number | string>();
  // const [realToke, setRealToke] = useState(80);
  // const [realFarm, setRealFarm] = useState(0);
  // const [realTokeBar, setRealTokeBar] = useState(0);
  // const [realFarmBar, setRealFarmBar] = useState(0);
  // const [succTxHash, setSuccTxHash] = useState('');
  // const [approveTxHash, setApproveTxHash] = useState('');
  const [usdcAllowance, setUsdcAllowance] = useState(BigNumber.from(0));
  const [currentUsd, setCurrentUsd] = useState({
    ethereum: {
      usd: parseFloat(process.env.REACT_APP_ETH_IN_USD!!),
    },
    'usd-coin': {
      usd: 1,
    },
  });
  const tokenid = ['ethereum', 'usd-coin'];

  const { data: contractData, loading: contractLoading } = useSubscription(
    TOTAL_COMMITMENT,
    {
      variables: {
        contractAddress: DEFI_ADDRESS.toLowerCase(),
      },
    }
  );

  const { data: userData, loading: isUserLoading } = useSubscription(
    USER_COMMITMENT,
    {
      variables: {
        userAddress: account?.toLowerCase(),
      },
    }
  );

  const SECOND_MS = 1000;

  useEffect(() => {
    const stage = getCurrentStage(currentStage, contractData);
    if (stage !== currentStage) {
      setCurrentStage(stage);
    }
  }, [currentStage, setCurrentStage, contractData]);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = +new Date();
      let remained = 0;
      if (
        currentStage === DefiStage.COMMITMENT &&
        process.env.REACT_APP_COMMITMENT_COUNTER
      ) {
        remained = +process.env.REACT_APP_COMMITMENT_COUNTER - current / 1000;
      } else if (
        currentStage === DefiStage.LAST_LOOK &&
        process.env.REACT_APP_LASTLOOK_COUNTER
      ) {
        remained = +process.env.REACT_APP_LASTLOOK_COUNTER - current / 1000;
      } else if (
        currentStage === DefiStage.PRIVATE_FARMING &&
        process.env.REACT_APP_PRIVATEFARMING_COUNTER
      ) {
        remained =
          +process.env.REACT_APP_PRIVATEFARMING_COUNTER - current / 1000;
      }
      remained = Math.max(0, remained);
      const days = Math.floor(remained / 60 / 60 / 24);
      const hours = Math.floor((remained - days * 60 * 60 * 24) / 60 / 60);
      const mins = Math.floor(
        (remained - days * 60 * 60 * 24 - hours * 60 * 60) / 60
      );
      setRemainDay(days);
      setRemainHour(hours);
      setRemainMinute(mins);
    }, SECOND_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  function connectWallet1() {
    if (connectWallet) {
      connectWallet();
    }
  }

  useEffect(() => {
    // async function fetchBalance() {
    //   try {
    //     let newBalance = await getBalance(account, null, library);
    //     newBalance = formatBalance(newBalance);
    //     setBalance(Math.trunc(toFloat(newBalance) * 100) / 100);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    async function getCurStage() {
      if (currentStage === DefiStage.LAST_LOOK) {
        if (setPageState) setPageState('lastlook');
      } else if (currentStage === DefiStage.PRIVATE_FARMING) {
        if (setPageState) setPageState('privatefarming');
      }
    }

    async function fetchBalance() {
      try {
        const contract = getContract(
          DEFI_ADDRESS,
          DEFIROUND_ABI,
          library,
          account
        );
        // const totalValueLocked = Number(
        //   ethers.utils.formatUnits(await contract.totalValue(), 8)
        // );
        const prices = await getCurrentCoinValue();
        const unitprice = prices[tokenid[curToken === 'eth' ? 0 : 1]].usd;

        const [overNumerator, overDenominator] =
          await contract.overSubscriptionRate();
        const overnumerator: number = +overNumerator;
        const overdenominator: number = +overDenominator;

        const rates = await contract.getRates([
          TokenList[0].address,
          TokenList[1].address,
        ]);
        const ratenumerator = +formatBalance(
          rates[curToken === 'eth' ? 0 : 1].numerator,
          TokenList[curToken === 'eth' ? 0 : 1].decimals
        );
        const ratedenominator = +formatBalance(
          rates[curToken === 'eth' ? 0 : 1].denominator,
          18
        );
      } catch (e) {
        console.log(e);
      }
    }

    if (!library || !account || !isRightNetwork(chainId)) return;
    fetchBalance();
    updateBalance(curToken);
    getCurStage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account, library, currentStage]);

  useEffect(() => {
    let price = 8;
    let swapRate = parseFloat(process.env.REACT_APP_SWAP_PCT!!);
    let farmRate = 1 - swapRate;
    if (!contractLoading && contractData && contractData.contracts.length > 0) {
      const balance = calculateTotalContractBalanceAsNumber(
        contractData.contracts[0].balances,
        currentUsd
      );
      setContractTVL(balance);
    }

    setSwapRate(swapRate * 100);
    setFarmingRate(farmRate * 100);
    setTokePrice(price.toFixed(2));
  }, [contractData, contractLoading, currentUsd]);

  //All scenarios for whether you're allowed to commit
  useEffect(() => {
    if (contractLoading) {
      setCanCommit({ allowed: false, reason: 'Loading' });
      return;
    }
    if (isUserLoading) {
      setCanCommit({ allowed: false, reason: 'Loading' });
      return;
    }
    if (!account) {
      setCanCommit({ allowed: false, reason: 'Not Connected' });
      return;
    }
    if (!library) {
      setCanCommit({ allowed: false, reason: 'Invalid Network' });
      return;
    }
    if (chainId?.toString() !== process.env.REACT_APP_VALID_CHAIN_ID) {
      setCanCommit({ allowed: false, reason: 'Invalid Chain' });
      return;
    }

    if (!whitelistAllowed.allowed) {
      setCanCommit({ allowed: false, reason: 'Not Whitelisted' });
      return;
    }

    if (!contractLoading && contractData && contractData.contracts.length > 0) {
      const balance = calculateTotalContractBalanceAsNumber(
        contractData.contracts[0].balances,
        currentUsd
      );
      if (balance >= 48000000) {
        setCanCommit({
          allowed: false,
          reason: 'Max Global Commitments Reached',
        });
        return;
      }
    }

    let commitNum = BigNumber.from(0);
    try {
      commitNum = ethers.utils.parseUnits(commitval.toString(), 18);
    } catch {}

    if (!commitval || commitNum.lte(0)) {
      setCanCommit({ allowed: false, reason: 'Invalid Commitment Value' });
      return;
    }

    setCanCommit({ allowed: true, reason: '' });
  }, [
    whitelistAllowed,
    userData,
    account,
    library,
    chainId,
    contractLoading,
    isUserLoading,
    commitval,
  ]);

  //Check the whitelist
  useEffect(() => {
    const contract = getContract(DEFI_ADDRESS, DEFIROUND_ABI, library, account);

    (async () => {
      try {
        const whitelistSettings = await contract.whitelistSettings();

        if (!whitelistSettings.enabled) {
          setIsWhitelistAllowed({ allowed: true, proof: [] });
          return;
        }
        const startTime = new Date();
        const response = await fetch(process.env.REACT_APP_WHITELIST_URL!);
        const csv = await response.text();
        const addresses = csv.split('\n');

        const found = addresses.filter(
          (x) => x.toLowerCase() === account?.toLowerCase()
        );
        if (found.length > 0) {
          const tree = new MerkleTree(
            addresses.map((x) => ethers.utils.keccak256(x))
          );
          const proof = getProof(
            tree,
            ethers.utils.keccak256(account ? account : '')
          );
          setIsWhitelistAllowed({ allowed: true, proof: proof });
        } else {
          setIsWhitelistAllowed({ allowed: false, proof: [] });
        }

        setWhitelistSecOnce(true);

        const endTime = new Date();
        console.log(
          `Processing time: ${endTime.getTime() - startTime.getTime()}`
        );
      } catch (error) {
        console.log('Whitelist Not Allowed Due to Error');
        setIsWhitelistAllowed({ allowed: false, proof: [] });
      }
    })().then();
  }, [chainId, account, library]);

  useEffect(() => {
    const totalCommitment = getCommitmentAmountForToken(curToken, userData);
    let limit = curToken === 'eth' ? ETH_LIMIT : USDC_LIMIT;

    if (totalCommitment) {
      const decimals = curToken === 'eth' ? 18 : 6;
      const newLimit = BigNumber.from('10')
        .pow(BigNumber.from(decimals))
        .mul(BigNumber.from(limit))
        .sub(BigNumber.from(totalCommitment));
      limit = parseFloat(
        ethers.utils.formatUnits(newLimit.toString(), decimals)
      );
    }
    setMaxCommit(limit);
  }, [curToken, userData]);

  function getDescriptionStyle() {
    let styles = {};
    if (!account) {
      const firstStyle = {
        height: '150px',
      };
      styles = Object.assign(styles, firstStyle);
    }

    return styles;
  }

  function commitAssets() {
    setShowCommitSummary(true);
  }

  async function updateBalance(token: string) {
    let newBalance = await getBalance(account, null, library);
    newBalance = formatBalance(newBalance);
    if (token === 'usdc') {
      newBalance = await getBalance(account, TokenList[1].address, library);
      newBalance = formatBalance(newBalance, 6);
    }
    setBalance(Math.trunc(toFloat(newBalance) * 100) / 100);
    if (setToken) setToken(token);
  }

  async function updateUsdcAllowance() {
    setUsdcAllowance(await getUsdcAllowance(account, library, DEFI_ADDRESS));
  }

  useEffect(() => {
    updateUsdcAllowance();
  }, [account, library]);

  function updateCommitVal(curval: string) {
    setCommitVal(curval);
  }

  function onCommitSummaryClose() {
    setShowCommitSummary(false);
    updateBalance(curToken);
    setCommitVal('0');
    setHideWhitelist(true);
    if (setUpdateBalance) setUpdateBalance();
  }

  return (
    <MainContainer>
      {showCommitSummary && (
        <WelcomeContainer>
          <CommitmentModal
            initialCommitValue={commitval}
            initialSelectedToken={curToken}
            onClose={onCommitSummaryClose}
            whitelistSettings={whitelistAllowed}
            ethCommitment={getCommitmentAmountForToken('eth', userData)}
            usdcCommitment={getCommitmentAmountForToken('usdc', userData)}
            usdcAllowance={usdcAllowance}
            getUpdatedUsdcAllowance={updateUsdcAllowance}
          />
        </WelcomeContainer>
      )}
      <div
        className={`flex flex-row ml-5 pl-5 justify-between ${
          showCommitSummary ||
          (account &&
            !whitelistAllowed.allowed &&
            !hideWhitelist &&
            whitelistSetOnce)
            ? 'landing-blur'
            : ''
        }`}
      >
        <CommitmentPanelL id="panel1">
          <div className="flex justify-between uppercase items-baseline">
            {currentStage === DefiStage.PRIVATE_FARMING && !showTokemakLink ? (
              <CommitmentTitle className="text-white">
                DEGENESIS HAS ENDED
              </CommitmentTitle>
            ) : currentStage === DefiStage.PRIVATE_FARMING ? (
              <CommitmentTitle className="text-white">
                FARMING HAS BEGUN
              </CommitmentTitle>
            ) : currentStage === DefiStage.LAST_LOOK ? (
              <CommitmentTitle className="text-white">
                LAST LOOK HAS BEGUN
              </CommitmentTitle>
            ) : isSoldOut(contractTVL) ? (
              <CommitmentTitle className="text-white">
                LAST LOOK HAS BEGUN
              </CommitmentTitle>
            ) : (
              <CommitmentTitle className="text-white">
                Commitment
              </CommitmentTitle>
            )}
            {/* <CurrentPeriod className="text-xs text-gray">
              Current Period
            </CurrentPeriod> */}
          </div>
          {showTokemakLink && (
            <RemainTime className="uppercase text-md text-left text-green">
              {remainDay >= 0 ? <span>{remainDay} Days </span> : ''}
              {remainHour >= 0 ? <span>{remainHour} Hours </span> : ''}
              {remainMinute >= 0 ? <span>{remainMinute} Minutes </span> : ''}
              Remain
            </RemainTime>
          )}
          <CommitmentHR />
          {currentStage === DefiStage.PRIVATE_FARMING && !showTokemakLink ? (
            <CommitTitle3 className="uppercase text-left">
              <p
                className="text-green italic uppercase"
                style={{ fontSize: 16, paddingTop: 20 }}
              >
                if you committed assets, you will soon be able to claim toke and
                migrate eth / usdc or withdraw on tokemak.xyz once transition to
                new site is completed
              </p>
              <p
                className="text-green italic uppercase"
                style={{ fontSize: 16, paddingTop: 20 }}
              >
                the new site will launch at 5am UTC, august 7th
              </p>
            </CommitTitle3>
          ) : currentStage === DefiStage.PRIVATE_FARMING ? (
            <CommitTitle3 className="uppercase text-left">
              <p className="text-white">the degenesis has ended</p>
              <p
                className="text-green italic"
                style={{ fontSize: 16, paddingTop: 20 }}
              >
                IF YOU COMMITTED ASSETS PLEASE CONNECT YOUR WALLET TO PROCEED TO
                THE PRIVATE FARMING
              </p>
            </CommitTitle3>
          ) : currentStage === DefiStage.LAST_LOOK ? (
            <CommitTitle3 className="uppercase text-left">
              <p className="text-white">the commitment period has ended</p>
              <p
                className="text-green italic"
                style={{ fontSize: 16, paddingTop: 20 }}
              >
                IF YOU COMMITTED ASSETS PLEASE CONNECT YOUR WALLET TO PROCEED TO
                THE LAST LOOK
              </p>
            </CommitTitle3>
          ) : isSoldOut(contractTVL) ? (
            <CommitTitle3 className="uppercase text-left text-white">
              <p style={{ fontSize: '24px', lineHeight: '28.8px' }}>
                limit reached
              </p>
              <p
                className="text-green italic"
                style={{ fontSize: 16, paddingTop: 20 }}
              >
                IF YOU COMMITTED ASSETS PLEASE CONNECT YOUR WALLET TO PROCEED TO
                THE LAST LOOK
              </p>
            </CommitTitle3>
          ) : !account ? (
            <CommitTitle className="text-white uppercase text-left">
              <span>Commit Eth Or Usdc To Swap For Toke</span>
            </CommitTitle>
          ) : (
            <CommitTitle2 className="text-white uppercase text-left">
              <p>Commit Eth or Usdc to swap for toke.</p>
              <p className="text-gray italic" style={{ fontSize: 16 }}>
                Final Eth/Toke conversion rate is set at start of last look.
              </p>
            </CommitTitle2>
          )}
          {currentStage !== DefiStage.COMMITMENT ? (
            <CommitDescription3
              className="uppercase text-left text-green"
              style={{ height: 150, position: 'relative' }}
            >
              <p style={{ position: 'absolute', bottom: 0, fontSize: 12 }}>
                PLEASE REFRESH THE PAGE IF YOU ARE NOT AUTOMATICALLY REDIRECTED
              </p>
            </CommitDescription3>
          ) : isSoldOut(contractTVL) ? (
            <CommitDescription3
              className="uppercase text-left text-green"
              style={{ height: 150, position: 'relative' }}
            >
              <p style={{ position: 'absolute', bottom: 0, fontSize: 12 }}>
                PLEASE REFRESH THE PAGE IF YOU ARE NOT AUTOMATICALLY REDIRECTED
              </p>
            </CommitDescription3>
          ) : !account ? (
            <CommitDescription
              className="uppercase text-left text-xs text-gray"
              style={getDescriptionStyle()}
            >
              If total commitments exceed $24m USD at start of last look, a
              proportional swap/private farming split is globally applied.
            </CommitDescription>
          ) : (
            <CommitDescription2
              className="uppercase text-left text-xs text-gray"
              style={getDescriptionStyle()}
            >
              If total commitments exceed $24m USD at start of last look, a
              proportional swap/private farming split is globally applied.
            </CommitDescription2>
          )}

          {!account ? (
            <ConnectWalletPanel>
              <div>
                <ConnectWallet
                  className="uppercase font-bold cursor-pointer"
                  onClick={(e) => connectWallet1()}
                >
                  Connect Wallet
                </ConnectWallet>
                {/* <CommitTooltip className="uppercase text-left text-gray">
                Commit eth or usdc
              </CommitTooltip> */}
              </div>
            </ConnectWalletPanel>
          ) : (
            <ConnectWalletPanel2>
              <div className="flex flex-col">
                <EtherAmtSelector
                  initval={commitval}
                  bal={balance}
                  updateBalance={updateBalance}
                  updateCommitVal={updateCommitVal}
                  updateToken={setCurToken}
                  max={maxcommit}
                  curtoken={curToken}
                />
                <MaxCommitment className="uppercase text-left text-gray">
                  Max Commitment{' '}
                  {(curToken === 'eth' ? ETH_LIMIT : USDC_LIMIT)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  {curToken}
                </MaxCommitment>
                <ConnectWallet2
                  disabled={!canCommit.allowed}
                  title={canCommit.reason}
                  className={`mx-3 uppercase py-2 font-bold cursor-pointer ${
                    toFloat(commitval) > 0 && canCommit.allowed
                      ? ''
                      : ' text-black back-gray'
                  }`}
                  onClick={(e) => commitAssets()}
                >
                  Commit Assets
                </ConnectWallet2>
                {currentStage !== DefiStage.COMMITMENT ? (
                  <div
                    className="uppercase text-left text-gray"
                    style={{ paddingLeft: 16, paddingTop: 10, fontSize: 10.91 }}
                  >
                    COMMITMENT PERIOD HAS ENDED
                  </div>
                ) : isSoldOut(contractTVL) ? (
                  <div
                    className="uppercase text-left text-gray"
                    style={{ paddingLeft: 16, paddingTop: 10, fontSize: 10.91 }}
                  >
                    COMMITMENT PERIOD HAS ENDED
                  </div>
                ) : (
                  ''
                )}
              </div>
            </ConnectWalletPanel2>
          )}

          <div className="flex flex-row justify-between">
            <InfoMessage
              className="uppercase text-left flex flex-row cursor-pointer text-gray"
              onClick={(e) => (setShowWelcome ? setShowWelcome(true) : null)}
              marginTop={!account ? 64 : 18}
              marginRight={0}
            >
              <InfoWrapper className="text-white">
                <TiInfoLarge size={16} />
              </InfoWrapper>
              View TL;DR
            </InfoMessage>
            <InfoMessage
              className="uppercase text-left flex flex-row cursor-pointer text-gray"
              marginTop={!account ? 64 : 18}
              marginRight={15}
            >
              <a href={MediumTokemakDegenesis} target="_blank" rel="noreferrer">
                Read Medium Article
              </a>
            </InfoMessage>
          </div>
        </CommitmentPanelL>
        <CommitmentPanelCenter>
          <div style={{ width: '100%' }}>
            <CommitmentCenterPanelHeader>
              <EventStateTitle>Degenesis EVENT STATE</EventStateTitle>
              <TotalCommitmentsContainer className="text-gray">
                TOTAL COMMITMENTS
                <TotalCommitments className="text-green">
                  $
                  {!contractLoading &&
                  contractData &&
                  contractData.contracts.length > 0
                    ? calculateTotalContractBalance(
                        contractData.contracts[0].balances,
                        currentUsd
                      )
                    : '0'}
                </TotalCommitments>
              </TotalCommitmentsContainer>
            </CommitmentCenterPanelHeader>
            <CommitmentGraph
              currentUsd={currentUsd}
              AssetsLegend={CommittedAssetsLegend}
              EffectiveLabel={EffectiveLabel}
            ></CommitmentGraph>
            <div id="graphTooltip" style={{ display: 'none' }}>
              <div className="toke">$6.60/TOKE</div>
              <div className="pcts">
                <div className="toke">100% SWAP</div>
                <div className="farm">0% FARM</div>
              </div>
            </div>
          </div>
        </CommitmentPanelCenter>

        <CommitmentPanelR id="panel2">
          <div className="flex justify-between uppercase items-baseline">
            <YourCommitments className="text-gray">
              Your Commitments
            </YourCommitments>
          </div>
          <EtherAmountWrapper className="uppercase text-md text-left flex flex-row items-center">
            {!isUserLoading && userData && userData.user ? (
              <>
                {formatUserCommitment(userData).symbol === 'eth' ? (
                  <FaEthereum className="text-gray" size={24} />
                ) : (
                  <img src={UsdcIcon} alt="Usdc Icon" width={24} height={24} />
                )}
                <DollarAmount className="text-green">
                  {formatUserCommitment(userData).value}&nbsp;
                  {(formatUserCommitment(userData).symbol + '').toUpperCase()}
                </DollarAmount>
              </>
            ) : (
              <>
                <BiDollar className="text-gray" size={24} />
                <DollarAmount className="text-green">{0}</DollarAmount>
              </>
            )}
          </EtherAmountWrapper>
          <hr />
          <div className="flex justify-between uppercase items-baseline">
            <TotalConversionRate className="text-gray">
              Conversion Rate{' '}
              {currentStage === DefiStage.COMMITMENT && '(Not Final)'}
            </TotalConversionRate>
          </div>
          <TokePriceWrapper className="uppercase text-md text-left flex flex-row items-center">
            <BiDollar className="text-gray" size={24} />
            <TokePrice className="text-white">{tokePrice}/Toke</TokePrice>
          </TokePriceWrapper>
          <div
            className="justify-between uppercase items-baseline text-left"
            style={{
              marginBottom: '15px',
              marginRight: '29px',
              lineHeight: 'normal',
            }}
          >
            (
            <TotalConversionRate className="text-green">
              {currentStage === DefiStage.COMMITMENT &&
                'The conversion rate is not final at the time of commitment.'}
            </TotalConversionRate>
            <TotalConversionRate className="text-gray">
              The conversion rate was determined at the last look period based
              on total commitments.
            </TotalConversionRate>
            <TotalConversionRate className="text-gray">
              All users will swap for toke at the same final rate.
            </TotalConversionRate>
          </div>
          <hr />
          <div className="flex justify-between uppercase items-baseline">
            <TotalConversionRate className="text-gray">
              SWAP/FARM SPLIT{' '}
              {currentStage === DefiStage.COMMITMENT && '(Not Final)'}
            </TotalConversionRate>
          </div>
          <TokeBarWrapper className="flex flex-row">
            <TokeBar
              borderwidth={24}
              height={100}
              val={swapRate}
              maincolor={'#B5FF00'}
              bgcolor={'#aaaaaa'}
              unit={'Swap'}
            />
            <TokeBar
              borderwidth={24}
              height={100}
              val={farmingRate}
              maincolor={'#2554F9'}
              bgcolor={'#aaaaaa'}
              unit={'Farm'}
            />
          </TokeBarWrapper>
          <hr />
          <CurrentTimestamp />
        </CommitmentPanelR>
      </div>
      {account &&
        !whitelistAllowed.allowed &&
        !hideWhitelist &&
        whitelistSetOnce && (
          <ErrorContainer>
            <ErrorModal
              width={840}
              height={435}
              error={'PROOF_INVALID'}
              token={curToken}
              onCloseClick={onCommitSummaryClose}
            />
            <div
              className={`flex flex-row ml-5 pl-5 justify-between landing-blur`}
            ></div>
          </ErrorContainer>
        )}
    </MainContainer>
  );
}
