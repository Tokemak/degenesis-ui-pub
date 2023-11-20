import { useState } from 'react';
import styled from 'styled-components';
import { MediumTokemakDegenesis, DiscordLink } from '../constants/links';
import { IoWarningOutline } from 'react-icons/io5';

const SocialLink = styled.span`
  color: #b5ff00;
  text-decoration: underline;
`;

const IAgree = styled.div`
  background-color: #b5ff00;
  border-radius: 5px;
  margin-left: 16px;
  margin-right: 17px;
  padding-top: 9.6px;
  padding-bottom: 8px;
  padding-left: 100px;
  padding-right: 100px;
  margin-top: 30px;
  margin-bottom: 20px;

  &:hover {
    background-color: #d8fe86;
  }
`;

interface TermsProps {
  width?: number;
  height?: number;
  onCloseClick?: () => void;
}

export default function Terms({ width, height, onCloseClick }: TermsProps) {
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

  function setTitleStyle() {
    let styles = {
      paddingLeft: '3px',
      marginTop: '60px',
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
          <div className="flex-1 flex flex-col items-center justify-center">
            <div
              className="uppercase text-center font-bold text-white"
              style={setTitleStyle()}
            >
              Terms of Participation
            </div>
            <div
              className="text-white text-center"
              style={setDescriptionStyle()}
            >
              <span>
                Before participating in the DeGenesis, you must affirm that you
                are not located, incorporated, or a citizen or resident of: the
                United States of America, Hong Kong (HKSAR), People’s
                Republic of China, the Republic of Seychelles, Bermuda, Burundi,
                Central African Republic, Democratic Republic of Congo, Eritrea,
                Guinea-Bissau, Libya, Mali, Palestine, Somalia, South Sudan,
                Western Sahara, Yemen, Cuba, Crimea and Sevastopol, Iran, Syria,
                North Korea, Sudan, or any state, country, or jurisdiction where
                it would be illegal according to applicable law for
                participation. If you cannot affirm the above, please exit this
                website.
              </span>
            </div>
            <IAgree
              className="uppercase font-bold cursor-pointer"
              onClick={(e) => onClose()}
            >
              I Agree
            </IAgree>
          </div>
          <hr />
          <div
            style={setButtonsStyle()}
            className="flex flex-row justify-between text-white uppercase items-center"
          >
            <div style={setJoinStyle()}>
              Join Our{' '}
              <SocialLink>
                <a href={DiscordLink} target="_blank" rel="noreferrer">
                  Discord
                </a>
              </SocialLink>{' '}
              For Updates
            </div>
            <div style={setReadStyle()}>
              Read Our{' '}
              <SocialLink>
                <a
                  href={MediumTokemakDegenesis}
                  target="_blank"
                  rel="noreferrer"
                >
                  Medium Post
                </a>
              </SocialLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
