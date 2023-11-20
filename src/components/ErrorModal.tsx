import { useState } from 'react';
import styled from 'styled-components';

import { DiscordLink, MediumTokemakDegenesis } from '../constants/links';
import TimesThin from '../assets/img/times-thin.svg';
import { IoWarningOutline } from 'react-icons/io5';

import ConnectionWarning from './ConnectionWarning';
import MaxCommitmentWarning from './MaxCommitmentWarning';

type DefiContractError = string;
const MAX_LIMIT_EXCEEDED: DefiContractError = 'MAX_LIMIT_EXCEEDED';
const PROOF_INVALID: DefiContractError = 'PROOF_INVALID';

const ErrorMessageMapping: Record<DefiContractError, string> = {
  DEPOSITS_NOT_ACCEPTED:
    'The DeGenesis is not accepting any commitments at this time.',
  DEPOSITS_LOCKED:
    'The Commitment Period has reached max capacity. No further commitments can be added at this time.',
  UNSUPPORTED_TOKEN:
    'This is an unsupported token for the DeGenesis. Only ETH or USDC may be committed.',
  INVALID_AMOUNT:
    'Invalid amount of committed assets. Amount must be greater than zero.',
  INVALID_MSG_VALUE:
    "Whoops! Something's gone wrong. Either an invalid commitment amount or a bug. Please contact us in the Discord channel for support.",
  NO_ETH:
    "Whoops! Something's gone wrong. Either an invalid commitment amount or a bug. Please contact us in the Discord channel for support.",
  SINGLE_ASSET_DEPOSITS:
    'Only one asset type can be deposited per individual participant. Please make sure to chose the correct asset when adding funds to your commitment.',
  WITHDRAWS_NOT_ACCEPTED:
    'We are not currently in the Last Look phase, and withdraws are temporarily disabled. Please return during the Last Look in order to withdraw commitment funds.',
  WITHDRAWS_EXPIRED:
    'The Last Look has now ended and withdraws are no longer possible. You may claim your TOKE, migrate remianing funds to the private farm (if applicable), or withdraw those unswapped assets.',
  NOT_SYSTEM_FINAL:
    'Error: Private farming period has not started, and no migration is currently possible. Please check back after the Last Look period has ended and commitments are confirmed.',
  NO_DATA: 'Error: No assets available to migrate to private farming.',
  NOTHING_TO_MOVE:
    'The DeGenesis total commitments did not surpass $24M and private farming was not unlocked. Please join our Discord for more information.',
};

const errorKeys = [...Object.keys(ErrorMessageMapping), MAX_LIMIT_EXCEEDED, PROOF_INVALID];

function getErrorKey(error: string): string {
  for(const key of errorKeys) {
      if (error.includes(key)) {
          return key;
      }
  }
  return error
}

function getErrorMessage(error: string): string {
  return ErrorMessageMapping[error] || error;
}

const SocialLink = styled.a`
  color: #b5ff00;
  text-decoration: underline;
`;

interface ErrorModalProps {
  width?: number;
  height?: number;
  error: string;
  token?: string;
  onCloseClick: () => void;
}

export default function ErrorModal({
  width,
  height,
  error,
  onCloseClick,
  token,
}: ErrorModalProps) {
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
      left: 'calc(50% - 55px)',
      top: '-60px',
      backgroundColor: '#000000',
      color: '#B5FF00',
    };
    return styles;
  }

  function setCloseStyle() {
    let styles = {
      border: '1px solid #ffffff',
      width: '38px',
      height: '38px',
      top: '19px',
      right: '21px',
    };
    return styles;
  }

  function setTitleStyle() {
    let styles = {
      paddingLeft: '3px',
      marginTop: '26px',
      fontSize: '36px',
      marginBottom: '36.5px',
    };
    return styles;
  }

  function setButtonsStyle() {
    let styles = {
      paddingLeft: '48px',
      paddingRight: '44px',
      height: '54px',
    };
    return styles;
  }

  function setReadStyle() {
    let styles = {
      fontSize: '18.2px',
      letterSpacing: '0.1px',
    };
    return styles;
  }

  function setJoinStyle() {
    let styles = {
      fontSize: '18.2px',
      letterSpacing: '0.2px',
    };
    return styles;
  }

  function setDescriptionStyle() {
    let styles = {
      fontSize: '24px',
      lineHeight: '1.25',
      paddingLeft: '80px',
      paddingRight: '80px',
    };
    return styles;
  }

  function onClose() {
    setVisibleFlag(false);
    if (onCloseClick) onCloseClick();
  }

  interface GenericErrorComponentProps {
    errMsg: string;
  }

  const GenericErrorComponent = ({ errMsg }: GenericErrorComponentProps) => (
    <div className="relative flex flex-col" style={setMainStyle()}>
      <div className="absolute" style={setLogoContainerStyle()}>
        <IoWarningOutline size="110px" />
      </div>
      <div
        className="absolute text-white flex items-center justify-center cursor-pointer"
        style={setCloseStyle()}
      >
        <span onClick={(e) => onClose()}>
          <img src={TimesThin} alt="" />
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className="uppercase text-center font-bold text-white"
          style={setTitleStyle()}
        >
          There was an error with your transaction
        </div>
        <div className="text-white text-center" style={setDescriptionStyle()}>
          <span>{errMsg}</span>
        </div>
      </div>
      <hr />
      <div
        style={setButtonsStyle()}
        className="flex flex-row justify-between text-white uppercase items-center"
      >
        <div style={setJoinStyle()}>
          Join Our{' '}
          <SocialLink href={DiscordLink} target="_blank" rel="noreferrer">
            Discord
          </SocialLink>{' '}
          For Updates
        </div>
        <div style={setReadStyle()}>
          Read Our{' '}
          <SocialLink
            href={MediumTokemakDegenesis}
            target="_blank"
            rel="noreferrer"
          >
            Medium Post
          </SocialLink>
        </div>
      </div>
    </div>
  );

  if (!visibleFlag) return null;

  const errKey = getErrorKey(error);

  switch (errKey) {
    case MAX_LIMIT_EXCEEDED:
      return (
        <MaxCommitmentWarning
          width={938}
          height={378}
          curToken={token}
          onCloseClick={onClose}
        />
      );
    case PROOF_INVALID:
      return (
        <ConnectionWarning
          width={840}
          height={435}
          curToken={token}
          onCloseClick={onClose}
        />
      );
    default:
      return <GenericErrorComponent errMsg={getErrorMessage(errKey)} />;
  }
}
