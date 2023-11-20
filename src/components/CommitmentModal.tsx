import { useState } from 'react';

import CommitSummary from './CommitSummary';
import WaitingApproval from './WaitingApproval';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
import { USDC_LIMIT_BIG_NUMBER } from '../constants/tokens';
import { BigNumber } from 'ethers';

interface CommitmentModalProps {
  // initial values come from the creator of the component
  // after they are set, we do not propagate changes back to the parent
  initialSelectedToken: string;
  initialCommitValue?: string;
  onClose: () => void;
  whitelistSettings: { allowed: boolean; proof: [] };
  usdcAllowance?: BigNumber;
  usdcCommitment?: string;
  ethCommitment?: string;
  getUpdatedUsdcAllowance: () => void;
}

export enum CommitmentState {
  Approve = 'Approve',
  WaitingApproval = 'WaitingApproval',
  Commit = 'Commit',
  WaitingCommit = 'WaitingCommit',
  Success = 'Success',
  Error = 'Error',
}

interface CommitmentModalState {
  state: CommitmentState;
  errMsg?: string;
}

export default function CommitmentModal({
  initialSelectedToken,
  initialCommitValue,
  onClose,
  whitelistSettings,
  usdcAllowance = BigNumber.from(0),
  usdcCommitment = '0',
  ethCommitment = '0',
  getUpdatedUsdcAllowance,
}: CommitmentModalProps) {
  function getStateBasedOnToken(token: string): CommitmentModalState {
    // ETH never needs approval. If the user has already committed ETH
    // we should never allow them to approve an allowance for USDC
    if (ethCommitment !== '0' || token === 'eth') {
      return { state: CommitmentState.Commit };
    }

    // if we already have the required allowance, then we don't
    // want a user to pay for another allowance
    const requiredAllowance = USDC_LIMIT_BIG_NUMBER.sub(usdcCommitment);
    if (usdcAllowance && usdcAllowance.gte(requiredAllowance)) {
      return { state: CommitmentState.Commit };
    }

    return { state: CommitmentState.Approve };
  }

  const initialModalState: CommitmentModalState =
    getStateBasedOnToken(initialSelectedToken);

  const [commitmentState, setCommitmentState] = useState(initialModalState);
  const [selectedToken, setSelectedToken] = useState(initialSelectedToken);
  const [commitmentAmount, setCommitmentAmount] = useState(
    initialCommitValue ?? '0'
  );
  const [progressStatus, setProgressStatus] = useState(0);
  const [approvalTxHash, setApprovalTxHash] = useState('');
  const [commitTxHash, setCommitTxHash] = useState('');

  const setToken = (token: string) => {
    // if nothing is changing, skip otherwise we can reset our approve/commit states incorrectly
    if (token === selectedToken) {
      return;
    }

    const state = getStateBasedOnToken(token);
    setCommitmentState(state);
    setSelectedToken(token);
  };

  const setWaitingApprovalState = () => {
    setProgressStatus(0);
    setCommitmentState({ state: CommitmentState.WaitingApproval });
  };

  const setCommitState = () =>
    setCommitmentState({ state: CommitmentState.Commit });

  const setWaitingCommitState = () => {
    setProgressStatus(0);
    setCommitmentState({ state: CommitmentState.WaitingCommit });
  };

  const setSuccessState = () =>
    setCommitmentState({ state: CommitmentState.Success });

  const setErrorState = (msg: string) => {
    console.log(`Error state ${msg}`);
    setCommitmentState({ state: CommitmentState.Error, errMsg: msg });
  };

  switch (commitmentState.state) {
    case CommitmentState.Approve:
    case CommitmentState.Commit:
      return (
        <CommitSummary
          width={360}
          height={500}
          commitVal={commitmentAmount}
          curToken={selectedToken}
          onCloseClick={onClose}
          setWaitingApproval={setWaitingApprovalState}
          setError={setErrorState}
          setToken={setToken}
          commitmentState={commitmentState.state}
          setCommitmentValue={setCommitmentAmount}
          setCommitState={setCommitState}
          setWaitingCommit={setWaitingCommitState}
          setSuccess={setSuccessState}
          setProgressStatus={setProgressStatus}
          setApprovalTxHash={setApprovalTxHash}
          setCommitTxHash={setCommitTxHash}
          whitelistSettings={whitelistSettings}
          getUpdatedUsdcAllowance={getUpdatedUsdcAllowance}
        />
      );
    case CommitmentState.WaitingApproval:
      return (
        <WaitingApproval
          width={376}
          height={480}
          onCloseClick={onClose}
          maxProgress={progressStatus}
          txHash={approvalTxHash}
        />
      );
    case CommitmentState.WaitingCommit:
      return (
        <WaitingApproval
          width={376}
          height={480}
          onCloseClick={onClose}
          maxProgress={progressStatus}
          txHash={commitTxHash}
        />
      );
    case CommitmentState.Success:
      return (
        <SuccessModal
          width={376}
          height={480}
          txHash={commitTxHash}
          onCloseClick={onClose}
        />
      );
    case CommitmentState.Error:
      return (
        <ErrorModal
          width={840}
          height={435}
          error={commitmentState.errMsg!!}
          token={selectedToken}
          onCloseClick={onClose}
        />
      );
  }
}
