import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useWeb3React } from '@web3-react/core';
import { isRightNetwork, getContract } from '../utils/web3';
import { DEFI_ADDRESS, ETH, USDC } from '../constants/tokens';

import DEFIROUND_ABI from '../contracts/defiround.json';

import { BiDollar } from 'react-icons/bi';
import { FaEthereum } from 'react-icons/fa';
import UsdcIcon from '../assets/img/usdc.svg';

import TokeBar from '../components/TokeBar';
import { formatBalance } from '../utils/web3';

import {
  PrivateFarmingWithdrawal,
  PrivateFarmingMigrationSuccess,
} from '../components/PrivateFarmingModals';
import { ethers, BigNumber } from 'ethers';

import { TOTAL_COMMITMENT, USER_COMMITMENT } from '../Query';
import { useSubscription } from '@apollo/client';
import {
  calculateTotalContractBalance,
  calculateTotalContractBalanceAsNumber,
  getCommittedToken,
  getCurrentCoinValue,
} from '../utils/CommitmentUtils';
import CurrentTimestamp from '../components/CurrentTimestamp';
import WaitingApproval from '../components/WaitingApproval';
import ErrorModal from '../components/ErrorModal';
import { getDefiErrorOrTransactionErr } from '../utils/DefiErrorMsgUtil';
import { getCurrentStage, DefiStage } from '../utils/CurrentStageUtil';

const CommitmentPanelL = styled.div`
  border-radius: 5px;
  border: 1px solid #ffffff;
  margin-top: 36px;
  width: 338px;
  height: fit-content;
  // height: 539px;
  min-width: 338px;
  max-width: 22.5vw;
`;

const CommitmentPanelR = styled.div`
  border-radius: 5px;
  border: 1px solid #ffffff;
  margin-top: 36px;
  width: 338px;
  margin-right: 16px;
  height: fit-content;
  min-width: 338px;
  max-width: 22.5vw;
`;

const CommitTitle = styled.div`
  border-left: 5px solid #b5ff00;
  font-size: 24px;
  margin-top: 25px;
  padding-left: 8px;
  letter-spacing: 0.3px;
  padding-top: 8px;
  line-height: 1.2;
`;

const CommitDescription = styled.div`
  margin-top: 50px;
  font-size: 24px;
  margin-left: 14px;
  margin-right: 30px;
  letter-spacing: 0.1px;
  line-height: 1.1;
`;

const TotalCommitments = styled.div`
  margin-top: 36px;
  // margin-left: 5px;
  font-size: 21px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  padding: 28.5px;
`;

const TotalCommitmentsText = styled.span`
  position: relative;
  top: 2px;
`;

const CommitAmount = styled.span`
  padding-left: 10px;
  font-size: 36px;
  font-family: 'ABC Favorit Mono';
`;

const CommitContainer = styled.div`
  border-radius: 5px;
  border: 1px solid #ffffff;
  width: 510px;
  margin-top: 26px;
`;

const CommitContainer2 = styled.div`
  border-radius: 5px;
  border: 1px solid #ffffff;
  width: 510px;
  margin-left: 33px;
  margin-top: 26px;
`;

const OptOut = styled.button`
  border: 1px solid #616161;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 90px;
  margin-left: 14px;
  margin-right: 14px;
  font-size: 16px;
  letter-spacing: 0.3px;

  &:hover {
    border: 1px solid #b5ff00;
  }
`;

const PrivateFarmingT = styled.div`
  font-size: 20px;
  padding-left: 9px;
  padding-top: 2px;
  letter-spacing: 0.7px;
`;

const TimeRemain = styled.div`
  padding-left: 9px;
  padding-top: 10px;
`;

const ExpireBlock = styled.div`
  padding-left: 9px;
  margin-bottom: 3px;
`;

const SwapForToke = styled.div`
  font-size: 18px;
  padding-left: 23px;
  padding-top: 4px;
  padding-right: 10px;
`;

const CenterContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  // margin-top: 2px;
  min-width: 950px;
  max-width: 1200px;
`;

const TokeAmount = styled.div`
  font-size: 56px;
  margin-left: 24px;
  margin-top: 35px;
  line-height: 1;
  letter-spacing: 0.2px;
  max-width: 300px;
`;

const EthAmountEqual = styled.div`
  font-size: 24px;
  margin-left: 23px;
  margin-top: 15px;
  line-height: 1;
  max-width: 300px;
`;

const TokePrice = styled.div`
  // margin-left: 45px;
  margin-top: 13px;
  font-size: 14px;
`;

const TokeBarContainer = styled.div`
  margin-top: 16px;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const TokeBarContainer2 = styled.div`
  margin-top: 16px;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const PrivateFarmingT2 = styled.div`
  font-size: 18px;
  padding-left: 23px;
  padding-top: 4px;
  padding-right: 5px;
`;

const EthAmount = styled.div`
  font-size: 56px;
  margin-left: 22px;
  margin-top: 36px;
  line-height: 1;
  letter-spacing: 0.2px;
  max-width: 300px;
`;

const TokeConversionRate = styled.div`
  font-size: 16px;
  margin-left: 8px;
  margin-top: 15px;
`;

const SwapFarmSplit = styled.div`
  font-size: 16px;
  margin-left: 8px;
  margin-top: 15px;
`;

const TokePriceWrapper = styled.div`
  margin-left: 3px;
  margin-bottom: 23px;
  margin-top: 6px;
`;

const TokePriceT = styled.span`
  font-size: 36px;
  line-height: 1;
  margin-left: 8px;
  padding-top: 1px;
`;

const EthInUSD = styled.div`
  margin-top: 5px;
  margin-left: 8px;
`;

const YourCommitments = styled.div`
  font-size: 21px;
  margin-left: 8px;
  margin-top: 15px;
`;

const DollarAmountWrapper = styled.div`
  margin-left: 7px;
  margin-bottom: 9px;
`;

const DollarAmount = styled.span`
  font-size: 36.5px;
  line-height: 1;
  margin-left: 8px;
  padding-top: 3px;
`;

const TokeBarWrapper = styled.div`
  margin-left: 22px;
  margin-top: 36px;
  margin-bottom: 67px;
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

interface LaskLookProps {
  param?: string;
  setPageState: (val: string) => void;
}

export default function LaskLook({ param, setPageState }: LaskLookProps) {
  const { account, chainId, library } = useWeb3React();
  const [accountCommitment, setAccountCommitment] = useState<string>('0');
  const [swapRate, setSwapRate] = useState<number>(0);
  const [farmingRate, setFarmingRate] = useState<number>(0);
  const [swapAmt, setSwapAmt] = useState<string>();
  const [farmingAmt, setFarmingAmt] = useState<string>();
  const [swapTokeAmt, setSwapTokeAmt] = useState<number | string>();
  const [tokePrice, setTokePrice] = useState<number | string>();
  const [withdrawal, setWithdrawal] = useState(false);
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);
  const [curToken, setCurToken] = useState(ETH);
  const [remainDay, setRemainDay] = useState<number>(0);
  const [remainHour, setRemainHour] = useState<number>(0);
  const [remainMinute, setRemainMinute] = useState<number>(0);
  const [waitingApproval, setWaitingApproval] = useState(false);
  const [approvalProgress, setApprovalProgress] = useState(0);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [tokeRateUsd, setTokeRateUsd] = useState('');
  const [ethInUsd, setEthInUsd] = useState('');
  const [lastLookExpire, setLastLookExpire] = useState<number>();

  const [currentUsd, setCurrentUsd] = useState({
    ethereum: {
      usd: parseFloat(process.env.REACT_APP_ETH_IN_USD!!),
    },
    'usd-coin': {
      usd: 1,
    },
  });

  const { data: contractData, loading: contractLoading } = useSubscription(
    TOTAL_COMMITMENT,
    {
      variables: {
        contractAddress: DEFI_ADDRESS.toLowerCase(),
      },
    }
  );

  const { data: userData } = useSubscription(USER_COMMITMENT, {
    variables: {
      userAddress: account?.toLowerCase(),
    },
  });

  useEffect(() => {
    const currentStage = getCurrentStage(DefiStage.LAST_LOOK, contractData);
    if (currentStage === DefiStage.PRIVATE_FARMING) {
      setPageState('privatefarming');
    }
  }, [contractData, setPageState]);

  useEffect(() => {
    const everySecond = 1000;
    const interval = setInterval(() => {
      const current = +new Date();
      if (process.env.REACT_APP_LASTLOOK_COUNTER) {
        const remained =
          +process.env.REACT_APP_LASTLOOK_COUNTER - current / 1000;
        const days = Math.floor(remained / 60 / 60 / 24);
        const hours = Math.floor((remained - days * 60 * 60 * 24) / 60 / 60);
        const mins = Math.floor(
          (remained - days * 60 * 60 * 24 - hours * 60 * 60) / 60
        );
        setRemainDay(days);
        setRemainHour(hours);
        setRemainMinute(mins);
      }
    }, everySecond);

    // clear the interval on unmount to prevent a memory leak
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // usdc is being used as a proxy for USD. If we set the
    // rates as 1:1 then this works as intended
    const calculateUsdToTokeRate = (rate: any): string => {
      const tokeDecimals = 18;
      const usdcDecimals = USDC.decimals;
      const multiplier = BigNumber.from(10).pow(tokeDecimals - usdcDecimals);
      const decimalMult = BigNumber.from(10).pow(3);

      const numerator = rate.numerator as BigNumber;
      const denominator = rate.denominator as BigNumber;

      const result = numerator
        .mul(multiplier)
        .mul(decimalMult)
        .div(denominator);

      return (result.toNumber() / decimalMult.toNumber()).toFixed(2);
    };

    const calculateEthInUsd = (ethRate: any, usdcRate: any): string => {
      const ethNumerator = ethRate.numerator as BigNumber;
      const ethDenominator = ethRate.denominator as BigNumber;
      const usdcDenominator = usdcRate.denominator as BigNumber;

      // usdc is 6 decimals, so need to pad it to 18
      let usdcNumerator = usdcRate.numerator as BigNumber;
      const mult = BigNumber.from(10).pow(12);
      usdcNumerator = usdcNumerator.mul(mult);

      const numerator = ethDenominator.mul(usdcNumerator);
      const denominator = ethNumerator.mul(usdcDenominator);

      const numDecimals = BigNumber.from(10).pow(3);
      const result = numerator.mul(numDecimals).div(denominator);

      return (result.toNumber() / numDecimals.toNumber()).toFixed(2);
    };

    async function fetchBalance() {
      const contract = getContract(
        DEFI_ADDRESS,
        DEFIROUND_ABI,
        library,
        account
      );

      const lastLookExpiration =
        (await contract.lastLookExpiration()) as BigNumber;

      const userCommittedToken = getCommittedToken(userData) || ETH;

      const [overNumerator, overDenominator] =
        (await contract.overSubscriptionRate()) as [BigNumber, BigNumber];

      const decimals = userCommittedToken.decimals;

      const swaprate = overNumerator
        .mul(BigNumber.from('10').pow(BigNumber.from(decimals.toString())))
        .div(overDenominator);
      const swapNum = ethers.utils.formatUnits(swaprate, decimals.toString());

      const farmingrate = BigNumber.from('1')
        .mul(BigNumber.from('10').pow(BigNumber.from(decimals.toString())))
        .sub(swaprate);
      const farmingNum = ethers.utils.formatUnits(
        farmingrate,
        decimals.toString()
      );

      const accountData = await contract.getAccountData(account);

      const rates = await contract.getRates([ETH.address, USDC.address]);

      const rate = userCommittedToken === ETH ? rates[0] : rates[1];
      const rateNumerator = rate.numerator as BigNumber;
      const rateDenominator = rate.denominator as BigNumber;

      const dataForSelectedToken = accountData.filter((data: any) => {
        return (
          data.token.toLowerCase() === userCommittedToken.address.toLowerCase()
        );
      })[0];

      const currentBalance = dataForSelectedToken.currentBalance as BigNumber;

      const swapamount = dataForSelectedToken.effectiveAmt as BigNumber;
      const farmingamount = dataForSelectedToken.ineffectiveAmt as BigNumber;
      const tokeamount = dataForSelectedToken.actualTokeReceived as BigNumber;

      const multiplier = BigNumber.from(10).pow(
        18 - userCommittedToken.decimals
      );
      const numDecimals = BigNumber.from(10).pow(6);

      const tokeprice = rateNumerator
        .mul(multiplier)
        .mul(numDecimals)
        .div(rateDenominator);

      const tokerateUsd = calculateUsdToTokeRate(rates[1]);
      const ethinUsd = calculateEthInUsd(rates[0], rates[1]);

      // perform all setState operations after we've completed all
      // all of the calculations to ensure we don't partially update the UI
      setLastLookExpire(lastLookExpiration.toNumber());
      setSwapRate(parseFloat(swapNum.toString()) * 100);
      setFarmingRate(parseFloat(farmingNum.toString()) * 100);
      setCurToken(userCommittedToken);

      setAccountCommitment(
        formatBalance(currentBalance, userCommittedToken.decimals)
      );

      setSwapAmt(formatBalance(swapamount, userCommittedToken.decimals));
      setSwapTokeAmt(formatBalance(tokeamount, 18));

      const tokePriceFormatDecimals =
        userCommittedToken === ETH ? 5 : userCommittedToken.formatDecimals;
      setTokePrice(
        (tokeprice.toNumber() / 1000000).toFixed(tokePriceFormatDecimals)
      );

      setFarmingAmt(formatBalance(farmingamount, userCommittedToken.decimals));

      setTokeRateUsd(tokerateUsd);
      setEthInUsd(ethinUsd);
    }

    function timer(ms: number): Promise<void> {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

    async function retry(fn: () => Promise<void>) {
      const waitTimesMs = [
        100, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 3000, 3000, 3000, 5000, 5000, 5000,
      ];
      for (const waitMs of waitTimesMs) {
        try {
          await timer(waitMs);
          await fn();
          return;
        } catch (e) {
          console.error(`${Date.now()}:: error fetching balance`, e);
        }
      }
    }

    if (!library || !account || !isRightNetwork(chainId) || !userData) return;
    retry(fetchBalance);
    // including contractData as a way to trigger updates
    // including currentUSD to ensure it triggers on page change
  }, [chainId, account, library, userData, contractData, currentUsd]);

  function onMigrateClose() {
    setWithdrawalSuccess(false);
  }

  function onWithdrawalClose() {
    setWithdrawal(false);
  }

  async function onWithdrawal(withdrawAmt: string) {
    const contract = getContract(DEFI_ADDRESS, DEFIROUND_ABI, library, account);
    const asETH = curToken === ETH;
    const withdrawv = ethers.utils.parseUnits(withdrawAmt, curToken.decimals);

    let tx;
    try {
      setApprovalProgress(20);
      setWithdrawal(false);
      setWaitingApproval(true);
      tx = await contract.withdraw([curToken.address, withdrawv], asETH);
    } catch (e) {
      setWaitingApproval(false);
      setErrorMessage(getDefiErrorOrTransactionErr(e));
      setShowErrorModal(true);
      return;
    }

    try {
      setApprovalProgress(75);
      await tx.wait(1);
    } catch (e) {
      setWaitingApproval(false);
      setErrorMessage(getDefiErrorOrTransactionErr(e));
      setShowErrorModal(true);
      return;
    }

    setWaitingApproval(false);
    setWithdrawalSuccess(true);
  }

  function disableOptOut(): boolean {
    return accountCommitment === '0' || accountCommitment === '0.0';
  }

  return (
    <MainContainer>
      {withdrawalSuccess && (
        <WelcomeContainer>
          <PrivateFarmingMigrationSuccess
            width={376}
            height={480}
            onCloseClick={onMigrateClose}
          />
        </WelcomeContainer>
      )}
      {withdrawal && (
        <WelcomeContainer>
          <PrivateFarmingWithdrawal
            width={376}
            height={450}
            balance={accountCommitment}
            asset={curToken.symbol}
            onCloseClick={onWithdrawalClose}
            onRequestWithdrawClick={onWithdrawal}
          />
        </WelcomeContainer>
      )}
      {waitingApproval && (
        <WelcomeContainer>
          <WaitingApproval
            width={376}
            height={450}
            maxProgress={approvalProgress}
            onCloseClick={() => setWaitingApproval(false)}
          />
        </WelcomeContainer>
      )}
      {showErrorModal && (
        <WelcomeContainer>
          <ErrorModal
            width={840}
            height={435}
            error={errorMessage}
            onCloseClick={() => setShowErrorModal(false)}
          />
        </WelcomeContainer>
      )}
      <div
        className={`flex flex-row ml-5 pl-5 justify-between ${
          withdrawal || withdrawalSuccess || showErrorModal || waitingApproval
            ? 'landing-blur'
            : ''
        }`}
      >
        <CommitmentPanelL>
          <div className="flex justify-between uppercase items-baseline">
            <PrivateFarmingT className="text-white">Last Look</PrivateFarmingT>
          </div>
          <div className="flex justify-between uppercase items-baseline">
            <TimeRemain className="uppercase text-md text-left text-green">
              {remainDay > 0 ? <span>{remainDay} Days </span> : ''}
              {remainHour > 0 ? <span>{remainHour} Hours </span> : ''}
              {remainMinute > 0 ? <span>{remainMinute} Minutes </span> : ''}
              Remain (estimate)
            </TimeRemain>
          </div>
          <ExpireBlock className="text-white text-left uppercase text-sm">
            expires at block {lastLookExpire}
          </ExpireBlock>
          <hr />
          <CommitTitle className="text-white uppercase text-left flex flex-col">
            <div>Please Review Final Conversion Rate</div>
            <div
              className="text-gray italic"
              style={{ fontSize: 14, marginTop: 20 }}
            >
              And Swap/Farm split
            </div>
          </CommitTitle>
          <div className="flex flex-col">
            <CommitDescription className="uppercase text-left text-green">
              <p>NO ACTION REQUIRED TO CONFIRM YOUR COMMITMENT</p>
            </CommitDescription>
            <div
              className="text-gray text-left uppercase"
              style={{
                fontSize: 12,
                marginLeft: 14,
                marginRight: 14,
                marginTop: 25,
              }}
            >
              DURING THIS PERIOD, you may opt out and withdraw your commitment
            </div>
            <OptOut
              className="uppercase text-white cursor-pointer"
              onClick={(e) => {
                setWithdrawal(true);
              }}
              disabled={disableOptOut()}
            >
              Opt Out
            </OptOut>
          </div>
        </CommitmentPanelL>

        <CenterContainer>
          <TotalCommitments className="text-white uppercase flex flex-row items-center justify-center">
            <TotalCommitmentsText>Total Commitments</TotalCommitmentsText>
            <CommitAmount className="text-white items-center font-bold">
              $
              {!contractLoading &&
              contractData &&
              contractData.contracts.length > 0
                ? calculateTotalContractBalance(
                    contractData.contracts[0].balances,
                    currentUsd
                  )
                : '0'}
            </CommitAmount>
          </TotalCommitments>
          <div className="flex flex-row">
            <CommitContainer>
              <SwapForToke className="flex flex-row justify-between uppercase text-white items-center">
                <div>
                  YOUR AMOUNT ELIGIBLE FOR{' '}
                  <span className="text-green">TOKE SWAP</span>
                </div>
              </SwapForToke>
              <hr />
              <div className="flex flex-row justify-between">
                <div className="flex flex-col text-left">
                  <TokeAmount
                    title={swapAmt}
                    className="text-white uppercase break-words"
                  >
                    {formatBalance(
                      swapAmt,
                      curToken.decimals,
                      curToken.formatDecimals
                    )}{' '}
                    {curToken.symbol}
                  </TokeAmount>
                  <EthAmountEqual className="text-white uppercase flex flex-col break-words">
                    <div title={swapTokeAmt?.toString()}>
                      =&nbsp;{formatBalance(swapTokeAmt, 18, 3)} Toke
                    </div>
                    <TokePrice className="text-white">
                      @ {tokePrice} {curToken.symbol} / Toke
                    </TokePrice>
                  </EthAmountEqual>
                </div>
                <TokeBarContainer className="flex flex-col items-center">
                  <TokeBar
                    borderwidth={24}
                    height={210}
                    val={swapRate}
                    textColor={swapRate > 0 ? '#000' : '#fff'}
                    maincolor={'#B5FF00'}
                    bgcolor={'#aaaaaa'}
                    content={false}
                    textInside={true}
                    flexflag={false}
                  />
                </TokeBarContainer>
              </div>
              <div
                className="flex flex-row justify-between uppercase"
                style={{
                  marginLeft: 24,
                  marginRight: 16,
                  marginTop: 24,
                  marginBottom: 2,
                  lineHeight: 1,
                }}
              >
                <div
                  className="text-gray"
                  style={{ fontSize: 12, letterSpacing: 0 }}
                >
                  TOTAL ELIGIBLE to be swapped for toke
                </div>
                <div
                  className="text-white"
                  style={{ fontSize: 16, marginTop: -4 }}
                >
                  $
                  {!contractLoading &&
                  contractData &&
                  contractData.contracts.length > 0
                    ? (
                        (calculateTotalContractBalanceAsNumber(
                          contractData.contracts[0].balances,
                          currentUsd
                        ) *
                          swapRate) /
                        100
                      )
                        .toFixed(0)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '0'}
                </div>
              </div>
            </CommitContainer>
            <CommitContainer2>
              <PrivateFarmingT2 className="flex flex-row justify-between uppercase text-white items-center">
                <div>
                  YOUR AMOUNT ELIGIBLE FOR{' '}
                  <span className="text-blue">PRIVATE FARMING</span>
                </div>
              </PrivateFarmingT2>
              <hr />
              <div className="flex flex-row justify-between">
                <div className="flex flex-col text-left">
                  <EthAmount
                    title={farmingAmt}
                    className="text-white uppercase break-words"
                  >
                    {formatBalance(
                      farmingAmt,
                      curToken.decimals,
                      curToken.formatDecimals
                    )}{' '}
                    {curToken.symbol}
                  </EthAmount>
                  <div
                    className="flex flex-row text-gray"
                    style={{
                      marginLeft: 22,
                      marginTop: 20,
                      fontSize: 14,
                      marginRight: 20,
                      lineHeight: 1.3,
                    }}
                  >
                    <div>
                      FOLLOWING THE LAST LOOK, THESE FUNDS MAY BE MIGRATED TO A
                      PERIOD OF PRIVATE FARMING OR WITHDRAWN IMMEDIATELY
                    </div>
                  </div>
                </div>
                <TokeBarContainer2 className="flex flex-col items-center">
                  <TokeBar
                    borderwidth={24}
                    height={210}
                    val={farmingRate}
                    maincolor={'#2554F9'}
                    bgcolor={'#aaaaaa'}
                    content={false}
                    textInside={true}
                    flexflag={false}
                  />
                </TokeBarContainer2>
              </div>
              <div
                className="flex flex-row justify-between uppercase"
                style={{
                  marginLeft: 24,
                  marginRight: 16,
                  marginTop: 24,
                  marginBottom: 2,
                  lineHeight: 1,
                }}
              >
                <div
                  className="text-gray"
                  style={{ fontSize: 12, letterSpacing: 0 }}
                >
                  TOTAL ELIGIBLE FOR PRIVATE FARMING
                </div>
                <div
                  className="text-white"
                  style={{ fontSize: 16, marginTop: -4 }}
                >
                  $
                  {!contractLoading &&
                  contractData &&
                  contractData.contracts.length > 0
                    ? (
                        (calculateTotalContractBalanceAsNumber(
                          contractData.contracts[0].balances,
                          currentUsd
                        ) *
                          farmingRate) /
                        100
                      )
                        .toFixed(0)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '0'}
                </div>
              </div>
            </CommitContainer2>
          </div>
        </CenterContainer>

        <CommitmentPanelR>
          <YourCommitments className="flex justify-between uppercase items-baseline text-white">
            Your Commitment
          </YourCommitments>
          <DollarAmountWrapper className="uppercase text-left flex flex-row items-center">
            {curToken === ETH ? (
              <FaEthereum className="text-gray" size={24} />
            ) : (
              <img src={UsdcIcon} alt="Usdc Icon" />
            )}
            <DollarAmount title={accountCommitment} className="text-white">
              {formatBalance(
                accountCommitment,
                curToken.decimals,
                curToken.formatDecimals
              )}{' '}
              {curToken.symbol}
            </DollarAmount>
          </DollarAmountWrapper>
          <hr />
          <TokeConversionRate className="flex justify-between uppercase items-baseline text-gray">
            Conversion Rate (Final)
          </TokeConversionRate>
          <TokePriceWrapper className="uppercase text-left">
            <div className="flex flex-row items-center">
              <BiDollar className="text-gray" size={30} />
              <TokePriceT className="text-white">{tokeRateUsd}/Toke</TokePriceT>
            </div>
            {curToken === ETH && (
              <EthInUSD className="text-gray text-xs">
                ETH = ${ethers.utils.commify(ethInUsd)} (at start of last look)
              </EthInUSD>
            )}
          </TokePriceWrapper>
          <hr />
          <div className="flex flex-col">
            <SwapFarmSplit className="flex justify-between uppercase items-baseline text-gray">
              Swap/Farm Split (Final)
            </SwapFarmSplit>
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
          </div>
          <hr />
          <CurrentTimestamp />
        </CommitmentPanelR>
      </div>
    </MainContainer>
  );
}
