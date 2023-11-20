import { useState } from 'react';
import styled from 'styled-components';

import { DiscordLink, MediumTokemakDegenesis } from '../constants/links';
import TimesThin from '../assets/img/times-thin.svg';
import { IoWarningOutline } from 'react-icons/io5';

const SocialLink = styled.a`
  color: #b5ff00;
  text-decoration: underline;
`;

interface ConnectionWarningProps {
  width?: number;
  height?: number;
  curToken?: string;
  onCloseClick?: () => void;
}

export default function ConnectionWarning({
  width,
  height,
  curToken,
  onCloseClick,
}: ConnectionWarningProps) {
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

  return (
    <div>
      {visibleFlag && (
        <div className="relative flex flex-col" style={setMainStyle()}>
          <div className="absolute" style={setLogoContainerStyle()}>
            <IoWarningOutline size="110px" />
          </div>
          <div
            className="absolute text-white flex items-center justify-center cursor-pointer"
            style={setCloseStyle()}
          >
            <span onClick={onClose}>
              <img src={TimesThin} alt="" />
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div
              className="uppercase text-center font-bold text-white"
              style={setTitleStyle()}
            >
              Address Not Authorized
            </div>
            <div
              className="text-white text-center"
              style={setDescriptionStyle()}
            >
              <span>
                Looks like your <span className="uppercase">{curToken}</span>{' '}
                address wasn't whitelisted before the snapshot on July 27th. 
                You may still submit your address to be whitelisted in our 
                Discord in the #degenesis-whitelist channel. If you whitelist you will 
                be permitted to commit assets 48 hours after the start of the event, 
                provided the event hasn't reached commitment capacity.
              </span>
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
      )}
    </div>
  );
}
