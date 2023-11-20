import styled from 'styled-components';

const CenterContainer = styled.div`
  width: 100%;
  min-width: 941px;
  margin: 0 66px 0 50px;
`;

const SidePanel = styled.div`
  border-radius: 5px;
  border: 1px solid #ffffff;
  width: 338px;
  height: fit-content;
  min-width: 338px;
  max-width: 22.5vw;
`;

const CommitTitle = styled.div`
  border-left: 5px solid #b5ff00;
  margin-top: 39px;
  padding-left: 10px;
  line-height: 24px;
`;

const TotalCommitments = styled.div`
  border: 1px solid #ffffff;
  border-radius: 4px;
  padding: 27px 0 22px;
  margin-bottom: 26px;
`;

const TokemakXYZ = styled.div`
  margin-top: 27px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  padding: 25px 19px 24px 24px;
`;

const CommitContainer = styled.div`
  border-radius: 5px;
  border: 1px solid #ffffff;
  width: 510px;
`;

const ClaimDescription = styled.div`
  width: 550px;
  margin-left: 10px;
  margin-right: 20px;
  font-family: 'ABC Favorit Mono';
`;

const ClaimDescriptionNoLink = styled.div`
  width: 900px;
  margin-left: 10px;
  margin-right: 20px;
  font-family: 'ABC Favorit Mono';
`;

const Button = styled.div`
  background-color: #b5ff00;
  border-radius: 5px;
  padding: 10px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  width: 400px;
  height: 64px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 17px;
  font-family: 'ABC Favorit Mono';

  &:hover {
    background-color: #d8fe86;
  }
`;

const PrivateFarmingT = styled.div`
  font-size: 18px;
  padding: 4px 5px 0 23px;
`;

const TimeRemain = styled.div`
  padding: 10px 0 3px 9px;
`;

const SwapForToke = styled.div`
  font-size: 18px;
  padding-left: 23px;
  padding-top: 4px;
  padding-right: 10px;
`;

const TokeAmount = styled.div`
  font-size: 46px;
  margin: 28px 0 0 24px;
  line-height: 1;
  letter-spacing: 0.2px;
`;

const EthAmountEqual = styled.div`
  font-size: 24px;
  margin: 10px 0 0 23px;
  line-height: 1;
`;

const TokePrice = styled.span`
  font-size: 16px;
`;

const TokeBarContainer = styled.div`
  margin: 16px 75px 30px 0;
`;

const EthAmount = styled.div`
  font-size: 46px;
  line-height: 1;
  letter-spacing: 0.2px;
  margin: 28px 0 0 22px;
`;

const UsdAmount = styled.div`
  margin: 3px 0 0 21px;
  font-size: 24px;
`;

const TokeConversionRate = styled.div`
  font-size: 16px;
  margin: 10px 0 0 8px;
`;

const TokePriceWrapper = styled.div`
  margin: 5px 0 13px 3px;
`;

const TokePriceT = styled.span`
  font-size: 36px;
  line-height: 1;
  margin-left: 8px;
  padding-top: 1px;
`;

const YourCommitments = styled.div`
  font-size: 20px;
  margin: 5px 0 0 8px;
`;

const DollarAmount = styled.span`
  font-size: 36.5px;
  line-height: 1;
  margin-left: 8px;
  padding-top: 3px;
`;

const TokeBarWrapper = styled.div`
  margin: 36px 0 41px 22px;
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

const Exclamation = styled.div`
  border-radius: 50%;
  border: 1px solid #b5ff00;
`;

const MainContainer = styled.div`
  padding-top: 93.6px;
`;

const TextExtraLarge = styled.div`
  font-size: 36px;
  line-height: 36px;
`;

const TextLarge = styled.div`
  font-size: 24px;
  line-height: 24px;
`;

const TextMedium = styled.div`
  font-size: 21px;
  line-height: 21px;
`;

const TextMediumSmall = styled.div`
  font-size: 18px;
  line-height: 18px;
`;

const TextSmall = styled.div`
  font-size: 15px;
  line-height: 16px;
`;

const TextExtraSmall = styled.div`
  font-size: 12px;
  line-height: 12px;
`;

export {
  TextExtraLarge,
  TextLarge,
  TextMedium,
  TextMediumSmall,
  TextSmall,
  TextExtraSmall,
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
  WelcomeContainer,
  Exclamation,
  MainContainer,
  ClaimDescription,
  ClaimDescriptionNoLink,
};
