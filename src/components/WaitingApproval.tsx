import { useEffect, useState } from 'react';
import styled from 'styled-components';

import TokoIcon from '../assets/img/toko.svg';
import TimesThin from '../assets/img/times-thin.svg';
import ProgressBar from '../components/ProgressBar';

const WaitingForApproval = styled.div`
  font-size: 15px;
  margin-top: 10px;
  letter-spacing: 0px;
  margin-left: 3px;
`;

const TransactionSubmitted = styled.div`
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 80px;
  letter-spacing: 0px;
  margin-left: 3px;
`;

const ProgressBarContainer = styled.div`
  margin-top: 27px;
`;

const ViewOnEtherscan = styled.div`
  padding-top: 20px;
  color: #2554f9;
`;

interface WaitingApprovalProps {
  width?: number;
  height?: number;
  maxProgress: number;
  txHash?: string;
  onCloseClick: () => void;
}

export default function WaitingApproval({
  width,
  height,
  maxProgress,
  txHash,
  onCloseClick,
}: WaitingApprovalProps) {
  const [currentProgress, setCurrentProgres] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentProgress <= maxProgress) {
        const inc = Math.min(2, maxProgress - currentProgress);
        setCurrentProgres(currentProgress + inc);
      }
    }, 200);
    return () => clearInterval(interval);
  });

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
      width: '20px',
      height: '20px',
      top: '18px',
      right: '23px',
    };
    return styles;
  }

  return (
    <div>
      <div
        className="relative flex flex-col justify-center items-center"
        style={setMainStyle()}
      >
        <div className="absolute" style={setLogoContainerStyle()}>
          <div className="flex" style={setLogoStyle()}>
            <img src={TokoIcon} alt="Token Icon" />
          </div>
        </div>
        <div
          className="absolute text-white flex justify-center items-center cursor-pointer"
          style={setCloseStyle()}
        >
          <span onClick={(e) => onCloseClick()}>
            <img src={TimesThin} alt="" />
          </span>
        </div>
        <ProgressBarContainer className="flex text-white flex-col justify-center items-center">
          <TransactionSubmitted className="text-white uppercase font-bold">
            Transaction Submitted
          </TransactionSubmitted>
          <ProgressBar
            width={265}
            height={34}
            val={Math.min(100, currentProgress)}
            striped={true}
            maincolor={'#8cb22e'}
            bgcolor={'#1c1c1c'}
            stripecolor={'rgba(28, 28, 28, 1)'}
            stripedegree={135}
          />
          <WaitingForApproval className="text-white uppercase font-bold">
            Waiting For Confirmation...
          </WaitingForApproval>
          {txHash && (
            <ViewOnEtherscan className="uppercase underline cursor-pointer">
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="blank"
                rel="noreferrer"
              >
                View on Etherscan
              </a>
            </ViewOnEtherscan>
          )}
        </ProgressBarContainer>
      </div>
    </div>
  );
}
