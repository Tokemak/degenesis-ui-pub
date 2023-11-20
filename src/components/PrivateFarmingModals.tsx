import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { BiLeftArrowAlt } from 'react-icons/bi';
// import TokoIcon from '../assets/img/toko.svg'
import Modal from './widgets';
import EtherAmtSelector from './EthAmtSelector';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

const GrayButton = styled.div`
  color: black;
  background-color: #404040;
  width: 304px;
  height: 44px;
  line-height: 44px;
  border-radius: 5px;
`;

const GreenOutlineButton = styled.button`
  width: 304px;
  height: 44px;
  border-radius: 5px;
  border: 2px solid #b5ff00;

  &[disabled] {
    border: 2px solid rgba(181, 255, 0, .5);
    color: rgba(255, 255, 255, .5);
    cursor: not-allowed;
  }
`;

interface PrivateFarmingModalNoticeProps {
  width?: number;
  height?: number;
  onCloseClick?: () => void;
}

export function PrivateFarmingModalNotice({
  width,
  height,
  onCloseClick,
}: PrivateFarmingModalNoticeProps) {
  const [visibleFlag, setVisibleFlag] = useState<boolean>(true);
  const onClose = () => {
    setVisibleFlag(false);
    if (onCloseClick) onCloseClick();
  };

  return (
    (visibleFlag && (
      <Modal width={width} height={height} onClose={onClose}>
        <div className="flex-1 flex flex-col items-center justify-start">
          <div
            className="text-white font-bold"
            style={{ fontSize: 36, marginTop: 131 }}
          >
            NOTICE
          </div>
          <div
            className="text-white center full-width"
            style={{
              fontSize: 24,
              marginTop: 30,
              width: 672,
              textAlign: 'center',
            }}
          >
            Private farming rewards at claimable claimable at start of Public
            Farming/Staking.
          </div>
        </div>
      </Modal>
    )) ||
    null
  );
}

interface PrivateFarmingModalSuccessProps {
  width?: number;
  height?: number;
  onCloseClick?: () => void;
}

export function PrivateFarmingModalSuccess({
  width,
  height,
  onCloseClick,
}: PrivateFarmingModalSuccessProps) {
  const [visibleFlag, setVisibleFlag] = useState<boolean>(true);
  const onClose = () => {
    setVisibleFlag(false);
    if (onCloseClick) onCloseClick();
  };

  return (
    (visibleFlag && (
      <Modal width={width} height={height} onClose={onClose}>
        <div className="flex-1 flex flex-col items-center justify-start">
          <div
            className="uppercase text-xl text-center font-bold text-white"
            style={{ marginTop: 60, fontSize: 24 }}
          >
            Manage Private Farming
          </div>
          <div
            className="uppercase text-green text-center mx-5 text-huge"
            style={{ marginTop: 45 }}
          >
            SUCCESS!
          </div>
          <div
            className="text-gray text-xl text-center mx-5"
            style={{ width: 330, marginTop: 40 }}
          >
            Assets will be available to withdraw at the start of the next cycle.
          </div>
          <div>
            <GrayButton
              className="uppercase py-2 mx-5 text-white font-bold text-center mt-20"
              style={{ width: 300 }}
            >
              Request Pending
            </GrayButton>
          </div>
          <div className="text-gray text-center mt-2">
            NEXT CYCLE 2021-06-25 21:19:47Z
          </div>
        </div>
        <div
          style={{ height: 90 }}
          className="flex flex-row text-white items-center uppercase justify-center cursor-pointer"
          onClick={(e) => onClose()}
        >
          <BiLeftArrowAlt className="align-middle" />
          go back
        </div>
      </Modal>
    )) ||
    null
  );
}

interface PrivateFarmingMigrationSuccessProps {
  width?: number;
  height?: number;
  onCloseClick?: () => void;
}

export function PrivateFarmingMigrationSuccess({
  width,
  height,
  onCloseClick,
}: PrivateFarmingMigrationSuccessProps) {
  const [visibleFlag, setVisibleFlag] = useState<boolean>(true);
  const onClose = () => {
    setVisibleFlag(false);
    if (onCloseClick) onCloseClick();
  };

  return (
    (visibleFlag && (
      <Modal width={width} height={height} onClose={onClose}>
        <div className="flex-1 flex flex-col items-center justify-start">
          <div
            className="uppercase text-white text-center mx-5"
            style={{ marginTop: 155, fontSize: 24 }}
          >
            SUCCESS!
          </div>
          <div
            className="text-white text-xl text-center mx-5"
            style={{ width: 330, marginTop: 40 }}
          >
            Your assets have been withdrawn.
          </div>
          <div>
            <GreenOutlineButton
              className="uppercase py-2 mx-5 text-white font-bold text-center mt-20 cursor-pointer"
              style={{ width: 300 }}
              onClick={(e) => onClose()}
            >
              GOT IT
            </GreenOutlineButton>
          </div>
        </div>
      </Modal>
    )) ||
    null
  );
}

interface PrivateFarmingWithdrawalProps {
  width?: number;
  height?: number;
  amount?: number | string;
  asset?: string;
  balance?: number | string;
  onCloseClick?: () => void;
  onRequestWithdrawClick?: (value:string) => void;
  onMigrate?: () => void;
  onWithdrawAmt?: (val: number) => void;
}

export function PrivateFarmingWithdrawal({
  width,
  height,
  amount,
  asset,
  balance,
  onCloseClick,
  onRequestWithdrawClick,
  onMigrate,
  onWithdrawAmt,
}: PrivateFarmingWithdrawalProps) {
  const [visibleFlag, setVisibleFlag] = useState<boolean>(true);
  const [withdrawAmtEntered, setWithdrawAmtEntered] = useState<string>('');
  const [withdrawButtonEnabled, setWithdrawButtonEnabled] = useState<{allowed:Boolean, reason:string}>({allowed: false, reason:"Must be greater than 0"});

  const onClose = () => {
    setVisibleFlag(false);
    if (onCloseClick) onCloseClick();
  };

  const onRequestWithdraw = () => {
    setVisibleFlag(false);
    if (onRequestWithdrawClick) 
      onRequestWithdrawClick(withdrawAmtEntered);
  };

  function updateWithdrawAmt(val: string) {
    if (onWithdrawAmt) onWithdrawAmt(+val);
    setWithdrawAmtEntered(val);
  }

  useEffect(() => {

   
    if (!withdrawAmtEntered || withdrawAmtEntered === '0' || withdrawAmtEntered === '.') {
      setWithdrawButtonEnabled({allowed: false, reason:"Must be greater than 0"});
      return;
    }

    const decimals = asset?.toLowerCase() === 'eth' ? 18 : 6;
    const valueBN = ethers.utils.parseUnits(withdrawAmtEntered.toString(), decimals);
    const balanceBN = ethers.utils.parseUnits(balance!.toString(), decimals);

    if (valueBN.eq(ethers.BigNumber.from('0'))) {
      setWithdrawButtonEnabled({allowed: false, reason:"Must be greater than 0"});
      return;
    }

    if (valueBN.gt(balanceBN)) {
      setWithdrawButtonEnabled({allowed: false, reason:"Must be less than commitment"});
      return;
    }

    setWithdrawButtonEnabled({allowed: true, reason:""});
  

  }, [withdrawAmtEntered, asset, balance]);

  return (
    (visibleFlag && (
      <Modal width={width} height={height} onClose={onClose}>
        <div className="flex-1 flex flex-col items-center justify-start">
          <div
            className="uppercase text-white text-center mx-5"
            style={{ marginTop: 120, fontSize: 24 }}
          >
            Withdrawal
            {/* <br />
            Private Farming */}
          </div>
          <div
            className="text-white text-xl text-center mx-5 uppercase"
            style={{ width: 330, marginTop: 40 }}
          >
            {/* {amount} {asset} */}
            <EtherAmtSelector
              bal={balance}
              initval={'0'}
              max={balance}
              curtoken={asset}
              withdrawal={true}
              updateCommitVal={updateWithdrawAmt}
              disableTokenSelect={true}
            />
          </div>
          <div className="flex flex-col">
            <GreenOutlineButton
              className="uppercase py-2 mx-5 text-white font-bold text-center mt-5 cursor-pointer"
              style={{ width: 300 }}
              disabled={!withdrawButtonEnabled.allowed}
              title={withdrawButtonEnabled.reason}
              onClick={(e) => onRequestWithdraw()}
            >
              Request Withdraw
            </GreenOutlineButton>
            {/* <div
              style={{ marginTop: 30 }}
              className="flex flex-row text-white underline items-center uppercase justify-center cursor-pointer"
              onClick={(e) => onMigratePrivateFarming()}
            >
              or migrate to private farming
            </div> */}
            <div
              style={{ height: 120 }}
              className="flex flex-row text-white items-center uppercase justify-center cursor-pointer"
              onClick={(e) => onClose()}
            >
              <BiLeftArrowAlt className="align-middle" />
              go back
            </div>
          </div>
        </div>
      </Modal>
    )) ||
    null
  );
}

const EthAmount = styled.div`
  font-size: 56px;
  margin-left: 22px;
  margin-top: 28px;
  line-height: 1;
  letter-spacing: 0.2px;
`;

const UsdAmount = styled.div`
  margin-left: 21px;
  margin-top: 3px;
`;

const ApyDiv = styled.div`
  border: 1px solid #8c8c8c;
  border-radius: 5px;
  color: #4b6903;
  margin-left: 20px;
  margin-top: 5px;
`;
const ApyPercent = styled.div`
  font-size: 28px;
  padding-left: 20px;
  padding-right: 16px;
  padding-top: 2px;
`;

const TokeEarnedWrapper = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  border-left: 1px solid #8c8c8c;
`;

const TokeEarned = styled.div`
  font-size: 21px;
  line-height: 1;
  margin-top: 5px;
`;

const EarnedMark = styled.div`
  font-size: 12px;
`;

const ConnectWalletWrapper = styled.div`
  margin-top: 100px;
  margin-left: 20px;
  margin-right: 20px;
`;

const ConnectWallet = styled.div`
  background-color: #b5ff00;
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 20px;
  margin-right: 5px;
  font-size: 16px;
  letter-spacing: 0.3px;
`;

const ClaimTokeRewards = styled.div`
  border: 1px solid #707070;
  color: #707070;
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 20px;
  margin-right: 5px;
  margin-top: 20px;
  font-size: 16px;
  letter-spacing: 0.3px;
`;

interface PrivateFarmingManageProps {
  width?: number;
  height?: number;
  amount?: number;
  asset?: string;
  usdamount?: string;
  onCloseClick?: () => void;
  onRequestWithdrawClick?: () => void;
  onClaim?: () => void;
}

export function PrivateFarmingManage({
  width,
  height,
  amount,
  asset,
  usdamount,
  onCloseClick,
  onRequestWithdrawClick,
  onClaim,
}: PrivateFarmingManageProps) {
  const [visibleFlag, setVisibleFlag] = useState<boolean>(true);

  const onClose = () => {
    setVisibleFlag(false);
    if (onCloseClick) onCloseClick();
  };

  const onRequestWithdraw = () => {
    setVisibleFlag(false);
    if (onRequestWithdrawClick) onRequestWithdrawClick();
  };

  const onClaimTokeRewards = () => {
    setVisibleFlag(false);
    if (onClaim) onClaim();
  };

  return (
    (visibleFlag && (
      <Modal width={width} height={height} onClose={onClose}>
        <div className="flex-1 flex flex-col items-center justify-start">
          <div
            className="uppercase text-white text-center mx-5"
            style={{ marginTop: 80, marginBottom: 20, fontSize: 24 }}
          >
            Manage Private Farming
          </div>
          <div className="flex flex-col text-left">
            <EthAmount className="text-white uppercase">
              {amount} {asset}
            </EthAmount>
            <UsdAmount className="uppercase text-gray">
              ≈ ${usdamount} USD
            </UsdAmount>
            <ApyDiv className="text-white uppercase flex flex-row">
              <ApyPercent className="font-bold flex items-center back-green text-black">
                43.56% Apy
              </ApyPercent>
              <TokeEarnedWrapper className="uppercase flex flex-col justify-center items-center flex-1 text-gray">
                <TokeEarned className="text-white">0.321 Toke</TokeEarned>
                <EarnedMark>(Earned)</EarnedMark>
              </TokeEarnedWrapper>
            </ApyDiv>
            <ConnectWalletWrapper className="flex flex-col">
              <ConnectWallet
                className="uppercase text-black text-center cursor-pointer"
                onClick={(e) => onRequestWithdraw()}
              >
                Request Withdrawl
              </ConnectWallet>
              <ClaimTokeRewards
                className="uppercase text-black text-center cursor-pointer"
                onClick={(e) => onClaimTokeRewards()}
              >
                Claim Toke Rewards
              </ClaimTokeRewards>
            </ConnectWalletWrapper>
          </div>
          <div
            style={{ height: 120 }}
            className="flex flex-row text-white items-center uppercase justify-center cursor-pointer"
            onClick={(e) => onClose()}
          >
            <BiLeftArrowAlt className="align-middle" />
            go back
          </div>
        </div>
      </Modal>
    )) ||
    null
  );
}
