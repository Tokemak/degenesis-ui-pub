import { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { BiDollar } from 'react-icons/bi';
import { FaEthereum } from 'react-icons/fa';
import { BsExclamation } from 'react-icons/bs';

import TokeBar from '../components/TokeBar';
import CurrentTimestamp from '../components/CurrentTimestamp';

import { DEFI_ADDRESS, TokenList } from '../constants/tokens';
import DEFIROUND_ABI from '../contracts/defiround.json';
import { isRightNetwork, getContract } from '../utils/web3';
import {
  calculateTotalContractBalance,
  calculateTotalContractBalanceAsNumber,
  formatUserCommitment,
  getCurrentCoinValue,
} from '../utils/CommitmentUtils';
import { TOTAL_COMMITMENT, USER_COMMITMENT } from '../Query';
import UsdcIcon from '../assets/img/usdc.svg';
import { TokemakXYZ as TokemakXYZLink } from '../constants/links';

import {
  CenterContainer,
  SidePanel,
  CommitTitle,
  TotalCommitments,
  TokemakXYZ,
  CommitContainer,
  Button,
  PrivateFarmingT,
  SwapForToke,
  TokeAmount,
  EthAmountEqual,
  TokePrice,
  TokeBarContainer,
  EthAmount,
  UsdAmount,
  Exclamation,
  MainContainer,
  ClaimDescription,
  TextExtraLarge,
  TextLarge,
  TextMedium,
  TextSmall,
  TextExtraSmall,
} from './PrivateFarmingStyles';

export default function PrivateFarming() {
  const { account, chainId, library } = useWeb3React();
  const [swapAmt, setSwapAmt] = useState<number>();
  const [farmingAmt, setFarmingAmt] = useState<number>();
  const [unitPrice, setUnitPrice] = useState<number>();
  const [swapTokeAmt, setSwapTokeAmt] = useState<number | string>();
  const [tokePrice, setTokePrice] = useState<number | string>();
  const [curToken, setCurToken] = useState(1);
  const [tokeRate, setTokeRate] = useState(1);
  const tokenid = ['ethereum', 'usd-coin'];
  const [remainDay, setRemainDay] = useState<number>(0);
  const [remainHour, setRemainHour] = useState<number>(0);
  const [remainMinute, setRemainMinute] = useState<number>(0);

  const [isFetched, setIsFetched] = useState(false);

  const [currentUsd, setCurrentUsd] = useState({
    ethereum: {
      usd: 0,
    },
    'usd-coin': {
      usd: 0,
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

  const { data: userData, loading: isUserLoading } = useSubscription(
    USER_COMMITMENT,
    {
      variables: {
        userAddress: account?.toLowerCase(),
      },
    }
  );

  useEffect(() => {
    getCurrentCoinValue().then(setCurrentUsd);

    const interval = setInterval(() => {
      const current = +new Date();
      if (process.env.REACT_APP_PRIVATEFARMING_COUNTER) {
        const remained =
          +process.env.REACT_APP_PRIVATEFARMING_COUNTER - current / 1000;
        const days = Math.floor(remained / 60 / 60 / 24);
        const hours = Math.floor((remained - days * 60 * 60 * 24) / 60 / 60);
        const mins = Math.floor(
          (remained - days * 60 * 60 * 24 - hours * 60 * 60) / 60
        );
        setRemainDay(days);
        setRemainHour(hours);
        setRemainMinute(mins);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const calculateTokePrice = async (): Promise<number> => {
      const usdValue = await getCurrentCoinValue();

      if (contractData && contractData.contracts.length > 0) {
        const balance = calculateTotalContractBalanceAsNumber(
          contractData.contracts[0].balances,
          usdValue
        );
        if (balance >= 24000000) return 8;
        if (balance <= 6000000) return 2;
        else return balance / 3000000;
      }
      return 0;
    };
    async function fetchBalance() {
      try {
        let userCommitedAsset = 0; // 0 = ETH, 1 = USDC
        if (userData && userData.user) {
          const symbol = formatUserCommitment(userData).symbol;
          if (symbol === 'eth') userCommitedAsset = 0;
          else userCommitedAsset = 1;
        }

        const contract = getContract(
          DEFI_ADDRESS,
          DEFIROUND_ABI,
          library,
          account
        );

        const [overNumerator, overDenominator] =
          await contract.overSubscriptionRate();
        const overnumerator = +overNumerator;
        const overdenominator = +overDenominator;
        const _tokeRate = overnumerator / overdenominator; // ratio of Swap/Farm
        const acccommitment = formatUserCommitment(userData).rawValue; // User Commited Amount in the original asset
        const _swappedAmount = +(acccommitment * _tokeRate).toFixed(2);
        const prices = await getCurrentCoinValue(); // get USD value of both ETH & USDC
        const _unitPrice = prices[tokenid[userCommitedAsset]].usd; // The USD value of commited asset
        const _tokePrice = await calculateTokePrice();

        setCurToken(userCommitedAsset);
        setTokeRate(_tokeRate);
        setSwapAmt(_swappedAmount);
        setFarmingAmt(+(acccommitment - _swappedAmount).toFixed(2));
        setUnitPrice(_unitPrice);
        setTokePrice(_tokePrice);
        setSwapTokeAmt(((_swappedAmount * _unitPrice) / _tokePrice).toFixed(2));

        setIsFetched(true);
      } catch (e) {
        console.log(e);
      }
    }

    if (
      !isFetched &&
      library &&
      account &&
      isRightNetwork(chainId) &&
      !isUserLoading &&
      !contractLoading
    ) {
      fetchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account, library, isUserLoading, contractLoading]);

  return (
    <MainContainer className={'flex flex-row mx-10 justify-between'}>
      <SidePanel style={{ padding: '8px 0 23px' }}>
        <TextMedium
          className="uppercase text-left text-white"
          style={{ paddingLeft: 9 }}
        >
          Private Farming
        </TextMedium>
        <TextSmall
          className="uppercase text-left text-green"
          style={{ padding: '17px 0 8px 9px' }}
        >
          {remainDay > 0
            ? remainDay + ` Day${remainDay === 1 ? '' : 's'} `
            : ''}
          {remainHour > 0
            ? remainHour + ` Hour${remainHour === 1 ? '' : 's'} `
            : ''}
          {remainMinute > 0
            ? remainMinute + ` Minute${remainMinute === 1 ? '' : 's'} `
            : ''}
          Remain
        </TextSmall>
        <hr />
        <CommitTitle>
          <TextLarge className="uppercase text-left text-white">
            THANK YOU FOR PARTICIPATING IN THE DEGENESIS
          </TextLarge>
        </CommitTitle>
        <div
          className="flex flex-col justify-between uppercase"
          style={{ margin: '56px 38px 0 14px' }}
        >
          <TextSmall className="text-left text-gray">
            PLEASE CONTINUE TO
            <a target="_blank" rel="noreferrer" href={TokemakXYZLink}>
              <span className="text-green"> TOKEMAK.XYZ </span>
            </a>
            TO CLAIM, MIGRATE and/OR WITHDRAW YOUR ASSETS
          </TextSmall>
          <div style={{ height: 170 }} />
          <TextSmall className="text-right text-dark-blue">
            Private farming opportunities are available on tokemak.xyz
            <br />
            <br />
            enjoy!
          </TextSmall>
        </div>
      </SidePanel>

      <CenterContainer>
        <TotalCommitments className="font-bold text-white uppercase flex flex-row items-center justify-center">
          <TextMedium style={{ lineHeight: '36px' }}>
            Total Commitments
          </TextMedium>
          <div style={{ height: '36px' }}>
            <BiDollar className="text-gray ml-8" size={30} />
          </div>
          <TextExtraLarge className="text-white">
            {!contractLoading &&
            contractData &&
            contractData.contracts.length > 0
              ? calculateTotalContractBalance(
                  contractData.contracts[0].balances,
                  currentUsd
                )
              : '0'}
          </TextExtraLarge>
        </TotalCommitments>
        <div className="flex flex-row">
          <CommitContainer>
            <SwapForToke className="flex flex-row justify-between uppercase text-white items-center">
              <span>
                YOUR <span className="text-green">TOKE SWAP</span>
              </span>
            </SwapForToke>
            <hr />
            <div className="flex flex-row justify-between">
              <div className="flex flex-col text-left">
                <TokeAmount className="text-white uppercase">
                  {swapTokeAmt} Toke
                </TokeAmount>
                <EthAmountEqual className="text-white uppercase">
                  You swapped {swapAmt} {TokenList[curToken].symbol}
                  <br />
                  <div className="mt-1" />
                  <TokePrice className="text-gray">
                    @ ${tokePrice} / Toke
                  </TokePrice>
                </EthAmountEqual>
              </div>
              <TokeBarContainer className="flex flex-col items-center">
                <TokeBar
                  borderwidth={24}
                  height={210}
                  val={tokeRate * 100}
                  maincolor={'#B5FF00'}
                  bgcolor={'#aaaaaa'}
                  content={false}
                  flexflag={false}
                  textInside={true}
                  textColor={'#000'}
                />
              </TokeBarContainer>
            </div>
            <div
              className="flex flex-row justify-between uppercase"
              style={{ margin: '0 13px 5px 21.5px' }}
            >
              <TextExtraSmall className="text-gray">
                TOTAL SWAPPED FOR TOKE
              </TextExtraSmall>
              <TextSmall className="text-white">
                $
                {!contractLoading &&
                contractData &&
                contractData.contracts.length > 0
                  ? (
                      calculateTotalContractBalanceAsNumber(
                        contractData.contracts[0].balances,
                        currentUsd
                      ) * tokeRate
                    )
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : '0'}
              </TextSmall>
            </div>
          </CommitContainer>
          <div style={{ width: '33px' }} />
          <CommitContainer>
            <PrivateFarmingT className="flex flex-row justify-between uppercase text-white items-center">
              <div>
                YOUR AMOUNT ELIGIBLE FOR{' '}
                <span className="text-blue">PRIVATE FARMING</span>
              </div>
            </PrivateFarmingT>
            <hr />
            <div className="flex flex-row justify-between">
              <div className="flex flex-col text-left">
                <EthAmount className="text-white uppercase">
                  {farmingAmt} {TokenList[curToken].symbol}
                </EthAmount>
                <UsdAmount className="uppercase text-white">
                  ≈ $
                  {unitPrice && farmingAmt
                    ? (unitPrice * farmingAmt).toFixed(2)
                    : ''}{' '}
                  USD
                </UsdAmount>
              </div>
              <TokeBarContainer className="flex flex-col items-center">
                <TokeBar
                  borderwidth={24}
                  height={210}
                  val={(1 - tokeRate) * 100}
                  maincolor={'#2554F9'}
                  bgcolor={'#aaaaaa'}
                  content={false}
                  flexflag={false}
                  textInside={true}
                />
              </TokeBarContainer>
            </div>
            <div
              className="flex flex-row justify-between uppercase"
              style={{ margin: '0 13px 7px 21.5px' }}
            >
              <TextExtraSmall className="text-gray">
                TOTAL ELIGIBLE FOR PRIVATE FARMING
              </TextExtraSmall>
              <TextSmall className="text-white">
                $
                {!contractLoading &&
                contractData &&
                contractData.contracts.length > 0
                  ? (
                      calculateTotalContractBalanceAsNumber(
                        contractData.contracts[0].balances,
                        currentUsd
                      ) *
                      (1 - tokeRate)
                    )
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : '0'}
              </TextSmall>
            </div>
          </CommitContainer>
        </div>
        <TokemakXYZ className="font-bold text-white uppercase flex flex-row items-center justify-center">
          <Exclamation>
            <BsExclamation size={30} />
          </Exclamation>
          <ClaimDescription
            style={{ textAlign: 'justify', textAlignLast: 'justify' }}
          >
            <TextMedium>
              Claim TOKE, migrate ETH/USDC to farming pools or withdraw assets
              on tokemak.xyz
            </TextMedium>
          </ClaimDescription>
          <Button className="text-black text-center cursor-pointer flex-1">
            <TextSmall>
              <a href={TokemakXYZLink} target="_blank" rel="noreferrer">
                GO TO TOKEMAK.XYZ ↗
              </a>
            </TextSmall>
          </Button>
        </TokemakXYZ>
      </CenterContainer>

      <SidePanel>
        <div style={{ padding: '7px 0 0 11px' }}>
          <TextMedium className="uppercase text-left text-white">
            Your Commitment
          </TextMedium>
          <div
            className="uppercase text-left flex flex-row items-center"
            style={{ margin: '5px 0 10px' }}
          >
            {!isUserLoading && userData && userData.user ? (
              <>
                {formatUserCommitment(userData).symbol === 'eth' ? (
                  <FaEthereum className="text-gray" size={24} />
                ) : (
                  <img src={UsdcIcon} alt="USDC" width={24} height={24} />
                )}
                <TextExtraLarge className="text-white">
                  {formatUserCommitment(userData).value}&nbsp;
                  {(formatUserCommitment(userData).symbol + '').toUpperCase()}
                </TextExtraLarge>
              </>
            ) : (
              <>
                <BiDollar className="text-gray" size={24} />
                <TextExtraLarge className="text-green">{0}</TextExtraLarge>
              </>
            )}
          </div>
        </div>
        <hr />
        <div style={{ padding: '21px 0 0 9px' }}>
          <TextSmall className="uppercase text-left text-gray">
            Conversion Rate (Final)
          </TextSmall>
          <div
            className="uppercase text-left flex flex-row items-center"
            style={{ margin: '10px 0 23px' }}
          >
            <BiDollar className="text-gray" size={24} />
            <TextExtraLarge className="text-white">
              {tokePrice}/Toke
            </TextExtraLarge>
          </div>
        </div>
        <hr />
        <div className="flex flex-col">
          <TextSmall
            className="uppercase text-left text-gray"
            style={{ margin: '14px 0 40px 9px' }}
          >
            Swap/Farm Split (Final)
          </TextSmall>
          <div className="flex" style={{ margin: '0 23px 67px' }}>
            <TokeBar
              borderwidth={24}
              height={100}
              val={tokeRate * 100}
              maincolor={'#B5FF00'}
              bgcolor={'#aaaaaa'}
              unit={'Swap'}
            />
            <TokeBar
              borderwidth={24}
              height={100}
              val={(1 - tokeRate) * 100}
              maincolor={'#2554F9'}
              bgcolor={'#aaaaaa'}
              unit={'Farm'}
            />
          </div>
        </div>
        <hr />
        <div
          style={{
            textAlignLast: 'justify',
            margin: '20px 40px',
            lineHeight: '19.2px',
            letterSpacing: '.2rem',
          }}
        >
          <TextExtraSmall className="text-center uppercase text-gray">
            <CurrentTimestamp />
          </TextExtraSmall>
        </div>
      </SidePanel>
    </MainContainer>
  );
}
