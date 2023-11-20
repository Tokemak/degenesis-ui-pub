import styled from 'styled-components';

import { FaEthereum } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';

import TokeBar from '../components/TokeBar';
const CommitmentPanelL = styled.div`
  border-radius: 5px;
  border: 1px solid #ffffff;
  width: 339px;
  margin-top: 106px;
  height: fit-content;
  min-width: 339px;
  max-width: 22.5vw;
`;

const CommitmentPanelR = styled.div`
  border-radius: 5px;
  border: 1px solid #ffffff;
  width: 338px;
  margin-top: 106px;
  margin-right: 16px;
  height: fit-content;
  min-width: 338px;
  max-width: 22.5vw;
`;

const CommitTitle = styled.div`
  border-left: 5px solid #b5ff00;
  font-size: 24px;
  margin-top: 36px;
  padding-left: 8px;
  letter-spacing: 0.3px;
  padding-top: 8px;
  line-height: 1;
`;

const CommitDescription = styled.div`
  margin-top: 82px;
  font-size: 12px;
  margin-left: 14px;
  letter-spacing: 0.1px;
`;

const CommitDescription2 = styled.div`
  font-size: 12px;
  margin-left: 15px;
  margin-top: 16px;
  line-height: 1.4;
  margin-bottom: 37px;
`;

const YourCommitment = styled.div`
  margin-top: 96px;
  margin-left: 5px;
  font-size: 28px;
`;

const YourCommitment2 = styled.div`
  font-size: 16px;
  margin-left: 8px;
  margin-top: 5px;
`;

const TotalCommitments = styled.div`
  font-size: 16px;
  margin-left: 8px;
  margin-top: 5px;
`;

const TokeConversionRate = styled.div`
  font-size: 16px;
  margin-left: 8px;
  margin-top: 6px;
`;

const EtherAmountWrapper = styled.div`
  margin-left: 5px;
  margin-bottom: 20px;
`;

const DollarAmountWrapper = styled.div`
  margin-left: 7px;
  margin-top: 6px;
  margin-bottom: 15px;
`;

const DollarAmountWrapper2 = styled.div`
  margin-left: 7px;
  margin-top: 5px;
  margin-bottom: 15px;
`;

const EtherAmount = styled.span`
  font-size: 36px;
  line-height: 1;
  margin-left: 10px;
  padding-top: 4px;
`;

const DollarAmount = styled.span`
  font-size: 36.5px;
  line-height: 1;
  margin-left: 8px;
  padding-top: 3px;
`;

const DollarAmount2 = styled.span`
  font-size: 36.5px;
  line-height: 1;
  margin-left: 8px;
  padding-top: 3px;
`;

const CommitContainer = styled.div`
  border-radius: 5px;
  border: 1px solid #ffffff;
  width: 510px;
  margin-top: 38px;
`;

const CommitContainer2 = styled.div`
  border-radius: 5px;
  border: 1px solid #ffffff;
  width: 510px;
  margin-left: 33px;
  margin-top: 38px;
`;

const Optout = styled.div`
  border: 1px solid #b5ff00;
  border-radius: 5px;
  margin-left: 15px;
  margin-right: 17px;
  padding-top: 10px;
  padding-bottom: 8px;
`;

const LastLook = styled.div`
  font-size: 20px;
  padding-left: 9px;
  padding-top: 2px;
  letter-spacing: 0.7px;
`;

const CurrentPeriod = styled.div`
  font-size: 12px;
  padding-right: 12px;
  letter-spacing: 0px;
`;

const TimeRemain = styled.div`
  padding-left: 9px;
  padding-top: 10px;
  margin-bottom: 3px;
`;

const CenterContainer = styled.div`
  margin-left: -18px;
`;

const CommitAmount = styled.span`
  padding-left: 15px;
`;

const ToSwapForToke = styled.div`
  font-size: 18px;
  padding-left: 23px;
  padding-top: 4px;
`;

const SwapAmount = styled.div`
  font-size: 56px;
  margin-left: 25px;
  margin-top: 36px;
  line-height: 1;
  letter-spacing: 0.2px;
`;

const PrivateFarmingAmount = styled.div`
  font-size: 56px;
  margin-left: 22px;
  margin-top: 36px;
  line-height: 1;
  letter-spacing: 0.2px;
`;

const TokeAmountEqual = styled.div`
  font-size: 23.9px;
  margin-left: 24px;
  margin-top: 16px;
  line-height: 1;
`;

const PrivateFarmingUsd = styled.div`
  font-size: 23.9px;
  margin-left: 22px;
  margin-top: 16px;
  line-height: 1;
`;

const TokePrice = styled.div`
  font-size: 15px;
  margin-left: 23px;
  letter-spacing: 0.6px;
  margin-top: 9px;
`;

const TokePercent = styled.div`
  font-size: 14px;
  margin-top: 11px;
`;

const TokeBarContainer = styled.div`
  margin-top: 16px;
  margin-right: 62px;
  margin-bottom: 30px;
`;

const TokeBarContainer2 = styled.div`
  margin-top: 16px;
  margin-right: 52px;
  margin-bottom: 30px;
`;

const PrivateFarmingDescriptionWrapper = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`;

const PrivateFarmingDescription = styled.div`
  font-size: 14px;
  margin-left: 15px;
  line-height: 1.25;
  letter-spacing: 0.1px;
`;

const TotalSwappedForToke = styled.div`
  font-size: 12px;
  margin-left: 8px;
  line-height: 1;
  margin-top: 8px;
  margin-bottom: 9px;
`;

const TotalAvailble = styled.div`
  font-size: 11.5px;
  margin-left: 8px;
  line-height: 1.1;
  margin-top: 8px;
  margin-bottom: 9px;
  letter-spacing: 0.2px;
`;

const TotalSwappedAmount = styled.div`
  margin-left: 8px;
`;

const TotalAvailableWrapper = styled.div`
  border-left: 1px solid #ffffff;
  margin-left: 30px;
  padding-left: 5px;
  margin-bottom: 15px;
`;

const TotalAvailbleAmount = styled.div`
  margin-left: 8px;
`;

const TokeBarWrapper = styled.div`
  margin-left: 22px;
  margin-top: 25px;
  margin-bottom: 30px;
`;

interface CommitFundsProps {
  param?: string;
}

export default function CommitFunds({ param }: CommitFundsProps) {
  return (
    <div className="flex flex-row ml-5 pl-5 justify-between">
      <CommitmentPanelL>
        <div className="flex justify-between uppercase items-baseline">
          <LastLook className="text-white">Last Look</LastLook>
          <CurrentPeriod className="text-gray">Current Period</CurrentPeriod>
        </div>
        <TimeRemain className="uppercase text-md text-left text-green">
          23 Hours 59 Minutes Remain
        </TimeRemain>
        <hr />
        <CommitTitle className="text-white uppercase text-left">
          Toke swap
          <br />
          confirmed at end of last look. Toke is claimable at start
          <br />
          of public farming
        </CommitTitle>
        <CommitDescription className="uppercase text-left text-gray">
          <p>
            you may opt out and withdraw your commitment during the last look
          </p>
          <p className="py-3 mb-3">TOKE Swap executes at end last look</p>
        </CommitDescription>
        <Optout className="uppercase font-bold text-white">Opt out</Optout>
        <CommitDescription2 className="uppercase text-left text-gray font-bold">
          You may opt out and withdraw your commitment during the last look
          period
        </CommitDescription2>
      </CommitmentPanelL>

      <CenterContainer>
        <YourCommitment className="font-bold text-white text-left uppercase">
          Your Commitment:
          <CommitAmount className="text-green">20.6780 ETH</CommitAmount>
        </YourCommitment>
        <div className="flex flex-row">
          <CommitContainer>
            <ToSwapForToke className="flex flex-row justify-between uppercase text-white items-center">
              To Swap For Toke
            </ToSwapForToke>
            <hr />
            <div className="flex flex-row justify-between">
              <div className="flex flex-col text-left">
                <SwapAmount className="text-white uppercase">
                  13.238 Eth
                </SwapAmount>
                <TokeAmountEqual className="text-white uppercase">
                  = 2640 Toke
                </TokeAmountEqual>
                <TokePrice className="text-gray uppercase">
                  @ $10.00/Toke
                </TokePrice>
              </div>
              <TokeBarContainer className="flex flex-col items-center">
                <TokeBar
                  borderwidth={24}
                  height={210}
                  val={66}
                  maincolor={'#B5FF00'}
                  bgcolor={'#aaaaaa'}
                  content={false}
                  flexflag={false}
                />
                <TokePercent className="text-gray">(66%)</TokePercent>
              </TokeBarContainer>
            </div>
          </CommitContainer>
          <CommitContainer2>
            <ToSwapForToke className="flex flex-row justify-between uppercase text-white text-md items-center">
              Private Farming
            </ToSwapForToke>
            <hr />
            <div className="flex flex-row justify-between">
              <div className="flex flex-col text-left">
                <PrivateFarmingAmount className="text-white uppercase">
                  6.835 Eth
                </PrivateFarmingAmount>
                <PrivateFarmingUsd className="uppercase text-white">
                  ≈ $19,210.82 USD
                </PrivateFarmingUsd>
                <PrivateFarmingDescriptionWrapper className="flex flex-row text-gray uppercase">
                  <div className="">*</div>
                  <PrivateFarmingDescription>
                    Exclusive private farming
                    <br />
                    opportunity available at
                    <br />
                    end of Last look period
                  </PrivateFarmingDescription>
                </PrivateFarmingDescriptionWrapper>
              </div>
              <TokeBarContainer2 className="flex flex-col items-center">
                <TokeBar
                  borderwidth={24}
                  height={210}
                  val={34}
                  maincolor={'#2554F9'}
                  bgcolor={'#aaaaaa'}
                  content={false}
                  flexflag={false}
                />
                <TokePercent className="text-gray">(34%)</TokePercent>
              </TokeBarContainer2>
            </div>
          </CommitContainer2>
        </div>
      </CenterContainer>

      <CommitmentPanelR>
        <YourCommitment2 className="flex uppercase items-baseline text-gray">
          Your Commitments
        </YourCommitment2>
        <EtherAmountWrapper className="uppercase text-left flex flex-row items-center">
          <FaEthereum className="text-gray" size={24} />
          <EtherAmount className="text-green">20.6780 ETH</EtherAmount>
        </EtherAmountWrapper>
        <hr />
        <TotalCommitments className="flex uppercase items-baseline text-gray">
          Total Commitments
        </TotalCommitments>
        <DollarAmountWrapper className="uppercase text-left flex flex-row items-center">
          <BiDollar className="text-gray" size={24} />
          <DollarAmount className="text-white">45,000,359</DollarAmount>
        </DollarAmountWrapper>
        <hr />
        <div className="flex flex-row justify-between uppercase items-baseline">
          <div className="text-left">
            <TotalSwappedForToke className="text-gray">
              Total To Be
              <br />
              Swapped for Toke
            </TotalSwappedForToke>
            <TotalSwappedAmount className="text-white">
              $30,000,000.00
            </TotalSwappedAmount>
          </div>
          <TotalAvailableWrapper className="text-left">
            <TotalAvailble className="text-gray">
              Total Available for Private Farming
            </TotalAvailble>
            <TotalAvailbleAmount className="text-white">
              $15,000,359.00
            </TotalAvailbleAmount>
          </TotalAvailableWrapper>
        </div>
        <hr />
        <TokeBarWrapper className="flex flex-row">
          <TokeBar
            borderwidth={24}
            height={100}
            val={67}
            maincolor={'#B5FF00'}
            bgcolor={'#aaaaaa'}
            unit={'Toke'}
          />
          <TokeBar
            borderwidth={24}
            height={100}
            val={34}
            maincolor={'#2554F9'}
            bgcolor={'#aaaaaa'}
            unit={'Farm'}
          />
        </TokeBarWrapper>
        <hr />
        <TokeConversionRate className="flex justify-between uppercase items-baseline text-gray">
          Toke Conversion Rate
        </TokeConversionRate>
        <DollarAmountWrapper2 className="uppercase text-left flex flex-row items-center">
          <BiDollar className="text-gray" size={24} />
          <DollarAmount2 className="text-white">10.00/Toke</DollarAmount2>
        </DollarAmountWrapper2>
      </CommitmentPanelR>
    </div>
  );
}
