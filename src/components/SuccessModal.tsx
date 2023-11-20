import { useState } from 'react';
import styled from 'styled-components';

import TokoIcon from '../assets/img/toko.svg';
import TimesThin from '../assets/img/times-thin.svg';

const OkayButton = styled.div`
  border: 2px solid #b5ff00;
  border-radius: 5px;
  margin-left: 34px;
  margin-right: 34px;
  padding-top: 9px;
  padding-bottom: 9px;
`;

const Description = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  font-size: 17px;
  letter-spacing: 0.5px;
  line-height: 1.3;
`;

const ViewOnEtherscan = styled.div`
  padding-top: 20px;
  color: #2554f9;
`;

interface SuccessModalProps {
  width?: number;
  height?: number;
  txHash?: string;
  onCloseClick?: () => void;
}

export default function SuccessModal({
  width,
  height,
  txHash,
  onCloseClick,
}: SuccessModalProps) {
  const [visibleFlag, setVisibleFlag] = useState<boolean>(true);

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

  function setTitleStyle() {
    let styles = {
      marginTop: '40px',
      fontSize: '24px',
      marginBottom: '18px',
    };
    return styles;
  }

  function setButtonsStyle() {
    let styles = {
      height: '90px',
      marginBottom: '35px',
    };
    return styles;
  }

  function onClose() {
    setVisibleFlag(false);
    if (onCloseClick) onCloseClick();
  }

  return (
    <div>
      {visibleFlag && (
        <div className="relative flex flex-col" style={setMainStyle()}>
          <div className="absolute" style={setLogoContainerStyle()}>
            <div className="flex" style={setLogoStyle()}>
              <img
                src={TokoIcon}
                width={'100%'}
                height={'100%'}
                alt="Token Icon"
              />
            </div>
          </div>
          <div
            className="absolute text-white flex items-center justify-center cursor-pointer"
            style={setCloseStyle()}
          >
            <span onClick={(e) => onClose()}>
              <img src={TimesThin} alt="" />
            </span>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div
              className="uppercase text-center font-bold text-white"
              style={setTitleStyle()}
            >
              Success!
            </div>
            <Description className="text-white text-center">
              Your assets have been successfully committed. Check back during
              the ‘last look’ period for final conversion rate.
            </Description>
            <ViewOnEtherscan className="uppercase underline cursor-pointer">
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="blank"
                rel="noreferrer"
              >
                View on Etherscan
              </a>
            </ViewOnEtherscan>
          </div>
          <div
            style={setButtonsStyle()}
            className="flex flex-row text-white items-center uppercase justify-center"
          >
            <OkayButton
              className="uppercase text-white font-bold text-center w-full cursor-pointer"
              onClick={(e) => onClose()}
            >
              Okay
            </OkayButton>
          </div>
        </div>
      )}
    </div>
  );
}
