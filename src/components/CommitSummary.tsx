import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';

import TokoIcon from '../assets/img/toko.svg';
import TimesThin from '../assets/img/times-thin.svg';

import { BiLeftArrowAlt } from 'react-icons/bi';

import EtherAmtSelector from './EthAmtSelector';
import {
  isRightNetwork,
  getBalance,
  formatBalance,
  getContract,
} from '../utils/web3';
import { toFloat } from '../utils/number';
import {
  TokenList,
  DEFI_ADDRESS,
  USDC_LIMIT,
  getTokenBySymbol,
  Token,
  ETH,
  USDC_LIMIT_BIG_NUMBER,
} from '../constants/tokens';

import DEFIROUND_ABI from '../contracts/defiround.json';
import ERC20_ABI from '../contracts/erc20.json';
import { ethers } from 'ethers';
import { ETH_LIMIT } from '../constants/tokens';
import { CommitmentState } from './CommitmentModal';
import { getDefiErrorOrTransactionErr } from '../utils/DefiErrorMsgUtil';

const ApproveCommitment = styled.div`
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
const Description = styled.div`
  color: #aaaaaa;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 14px;
  font-size: 11px;
  letter-spacing: 0.2px;
`;

interface CommitSummaryProps {
  width?: number;
  height?: number;
  commitVal: string;
  curToken: string;
  commitmentState: CommitmentState;
  onCloseClick: () => void;
  setToken: (token: string) => void;
  setWaitingApproval: () => void;
  setError: (msg: string) => void;
  setCommitmentValue: (value: string) => void;
  setCommitState: () => void;
  setWaitingCommit: () => void;
  setSuccess: () => void;
  setProgressStatus: (progress: number) => void;
  setApprovalTxHash: (hash: string) => void;
  setCommitTxHash: (hash: string) => void;
  whitelistSettings: { allowed: boolean; proof: [] };
  getUpdatedUsdcAllowance: () => void;
}

export default function CommitSummary({
  width,
  height,
  commitVal,
  curToken,
  commitmentState,
  onCloseClick,
  setToken,
  setWaitingApproval,
  setError,
  setCommitmentValue,
  setCommitState,
  setWaitingCommit,
  setSuccess,
  setProgressStatus,
  setApprovalTxHash,
  setCommitTxHash,
  whitelistSettings,
  getUpdatedUsdcAllowance,
}: CommitSummaryProps) {
  const { account, chainId, library } = useWeb3React();
  const [balance, setBalance] = useState(-1);
  const [maxcommit, setMaxCommit] = useState(ETH_LIMIT);

  useEffect(() => {
    setCommitmentValue(commitVal);
    updateBalance(curToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curToken]);

  useEffect(() => {
    if (!library || !account || !isRightNetwork(chainId)) return;
    updateBalance(curToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account, library, curToken]);

  useEffect(() => {
    if (curToken === 'eth') setMaxCommit(ETH_LIMIT);
    else setMaxCommit(USDC_LIMIT);
  }, [curToken]);

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
      width: '24px',
      height: '24px',
      top: '18px',
      right: '23px',
    };
    return styles;
  }

  function setTitleStyle() {
    let styles = {
      paddingTop: '64px',
      fontSize: '24px',
      marginTop: '61px',
    };
    return styles;
  }

  function setApproveStyle() {
    let styles = {
      marginTop: '50px',
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
    };
    return styles;
  }

  async function onApprove() {
    let token: Token;
    try {
      token = getTokenBySymbol(curToken);
    } catch (e: any) {
      return setError(e.message);
    }

    if (commitmentState === CommitmentState.Approve) {
      // this state should never occur
      if (token === ETH) {
        setError('ETH should not need approval');
        return;
      }

      const erc20Instance = getContract(
        token.address,
        ERC20_ABI,
        library,
        account
      );

      const approvalTx = erc20Instance.approve(
        DEFI_ADDRESS,
        USDC_LIMIT_BIG_NUMBER
      );
      setWaitingApproval();

      let tx;
      try {
        setProgressStatus(20);
        tx = await approvalTx;
        setApprovalTxHash(tx.hash);
      } catch (e: any) {
        return setError(getDefiErrorOrTransactionErr(e));
      }

      try {
        setProgressStatus(75);
        await tx.wait(1);
      } catch (e: any) {
        return setError(getDefiErrorOrTransactionErr(e));
      }

      setProgressStatus(100);
      getUpdatedUsdcAllowance();
      setCommitState();
    }

    if (commitmentState === CommitmentState.Commit) {
      const contract = getContract(
        DEFI_ADDRESS,
        DEFIROUND_ABI,
        library,
        account
      );
      const commitv = ethers.utils.parseUnits(
        commitVal.toString(),
        token.decimals
      );

      const value = curToken === 'eth' ? commitv : '0';

      const commitTx = contract.deposit(
        [token.address, commitv],
        whitelistSettings.proof,
        { value: value }
      );
      setWaitingCommit();

      let tx;
      try {
        setProgressStatus(20);
        tx = await commitTx;
        setCommitTxHash(tx.hash);
      } catch (e: any) {
        return setError(getDefiErrorOrTransactionErr(e));
      }

      try {
        setProgressStatus(75);
        await tx.wait(1);
      } catch (e) {
        return setError(getDefiErrorOrTransactionErr(e));
      }

      setProgressStatus(100);
      setSuccess();
    }
  }

  return (
    <div>
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
          <span onClick={onCloseClick}>
            <img src={TimesThin} alt="" />
          </span>
        </div>
        <div className="flex-1 flex flex-col">
          <div
            className="uppercase text-center font-bold text-white"
            style={setTitleStyle()}
          >
            {commitmentState} {curToken}
          </div>
          <div
            className="text-white text-md text-left"
            style={setApproveStyle()}
          >
            <EtherAmtSelector
              bal={balance}
              updateBalance={updateBalance}
              updateCommitVal={setCommitmentValue}
              initval={commitVal}
              updateToken={setToken}
              max={maxcommit}
              curtoken={curToken}
            />
            <ApproveCommitment
              className={`uppercase font-bold text-center cursor-pointer ${
                toFloat(commitVal) > 0
                  ? 'text-black'
                  : 'pointer-events-none text-gray-400'
              }`}
              onClick={(e) => onApprove()}
            >
              {commitmentState} {curToken}
            </ApproveCommitment>
            <Description className="text-left uppercase">
              Final {curToken}/Toke conversion rate is set at start of last
              look. Max individual commitments may not exceed $100K USD. Any
              combined commitment attempts that exceed $100K USD will fail.
            </Description>
          </div>
        </div>
        <div
          style={setButtonsStyle()}
          className="flex flex-row text-white items-center uppercase justify-center cursor-pointer"
          onClick={(e) => onCloseClick()}
        >
          <BiLeftArrowAlt className="align-middle" size={22} />
          go back
        </div>
      </div>
    </div>
  );
}
