import styled from 'styled-components';

const DegenesisEvent = styled.div`
  background-image: linear-gradient(
    135deg,
    rgba(181, 255, 0, 0.5) 24.52%,
    #b5ff00 52.9%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  font-size: 20px;
  padding-left: 2.4px;
`;

const TokeMak = styled.div`
  font-size: 46.4px;
  line-height: 0.99;
  padding-left: 1px;
`;

const ProgressUpper = styled.div`
  padding-left: 11.2px;
  letter-spacing: 1.1px;
  line-height: 1;
`;

const ProgressBarWrapper = styled.div`
  padding-left: 7.2px;
  padding-top: 0.8px;
`;

const ProgressLower = styled.div`
  letter-spacing: 0px;
  padding-top: 1.6px;
`;

const ProgressLowerSmall = styled.div`
  font-size: 8px;
  letter-spacing: 0.1px;
  padding-right: 1.6px;
`;

const LockUpper = styled.div`
  font-size: 10px;
  letter-spacing: 0.7px;
  line-height: 1;
  margin-top: 3px;
  margin-bottom: 1.8px;
`;

const UnlockWrapper = styled.div`
  background-color: rgba(181, 255, 0, 0.3);
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
  height: 17px;
  width: 49px;
`;

const LockWrapper = styled.div`
  background-color: rgba(127, 178, 0, 1);
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
  height: 17px;
  width: 49px;
`;

const ProgressUpperB = styled.div`
  padding-left: 3.2px;
  letter-spacing: 1.1px;
  line-height: 1;
`;

const ProgressBarWrapperB = styled.div`
  padding-top: 0.8px;
`;

const ProgressLowerB = styled.div`
  letter-spacing: 0px;
  padding-top: 1.6px;
`;

const SwapUpper = styled.div`
  font-size: 10px;
  padding-left: 3.2px;
  letter-spacing: 0.7px;
  line-height: 1;
  margin-top: 3px;
  margin-bottom: 1.8px;
  text-align: center;
`;

const UnswapWrapper = styled.div`
  background-color: rgba(181, 255, 0, 0.3);
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
  height: 17px;
  width: 48px;
`;

const SwapWrapper = styled.div`
  background-color: rgba(127, 178, 0, 1);
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
  height: 17px;
  width: 48px;
`;

const ProgressLowerSmallB = styled.div`
  font-size: 8px;
  letter-spacing: 0.1px;
  padding-right: 4px;
`;

interface ISocialConnect {
  flag: boolean;
}

const SocialConnect = styled.div<ISocialConnect>`
  padding-top: ${(props) => (props.flag ? '0px' : '32px')};
  padding-right: 16px;
`;

const ConnectWrapper = styled.div`
  background-color: rgba(101, 101, 101, 0.1);
  border-radius: 32px;
  height: 40px;
`;

const WalletWrapper = styled.div`
  background-color: #262626;
  height: 100%;
  border-radius: 32px;
`;

const SocialLinkIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 24px;
  background-color: black;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressContainer = styled.div`
  padding-top: 39px;
`;

export {
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
};
