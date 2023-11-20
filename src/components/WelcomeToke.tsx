import { useState } from 'react';
import styled from 'styled-components';
import { BiRightArrowAlt } from 'react-icons/bi';
import { DiscordLink, MediumTokemakDegenesis } from '../constants/links';
import TokoIcon from '../assets/img/toko.svg';

const SocialLink = styled.span`
  color: #b5ff00;
  text-decoration: underline;
`;

interface WelcomeTokeProps {
  width?: number;
  height?: number;
  onCloseClick?: (flag: boolean) => void;
}

export default function WelcomeToke({
  width,
  height,
  onCloseClick,
}: WelcomeTokeProps) {
  const [visibleFlag, setVisibleFlag] = useState<boolean>(true);

  function setMainStyle() {
    let styles = {
      borderRadius: '5px',
      border: '1px solid #ffffff',
      marginLeft: '15px',
      marginTop: '-7px',
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
      width: '137px',
      height: '137px',
      left: '-68.5px',
      top: '-70.5px',
      backgroundColor: '#000000',
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingTop: '16px',
      paddingBottom: '16px',
    };
    return styles;
  }

  function setLogoStyle() {
    let styles = {
      borderRadius: '50%',
      border: '2px solid #B5FF00',
      width: '100%',
      height: '100%',
      paddingTop: '21px',
    };
    return styles;
  }

  function setTitleStyle() {
    let styles = {
      paddingLeft: '46px',
      paddingTop: '91px',
      fontSize: '54.5px',
      letterSpacing: '0.5px',
      lineHeight: '1',
    };
    return styles;
  }

  function setDescriptionStyle() {
    let styles = {
      paddingLeft: '48px',
      marginBottom: '65px',
      fontSize: '24px',
      lineHeight: '1.2',
    };
    return styles;
  }

  function setButtonsStyle() {
    let styles = {
      height: '130px',
    };
    return styles;
  }

  function onClose() {
    setVisibleFlag(false);
    if (onCloseClick) onCloseClick(true);
  }

  function setContinueStyle() {
    let styles = {
      borderBottom: '1px solid #ffffff',
      height: '16px',
      marginRight: '33px',
      fontSize: '24px',
      marginTop: '-24px',
    };
    return styles;
  }

  function setRightStyle() {
    let styles = {
      marginRight: '-1px',
      marginTop: '-5px',
    };
    return styles;
  }

  function setReadStyle() {
    let styles = {
      fontSize: '18.2px',
      letterSpacing: '0.1px',
      paddingLeft: '51px',
      marginTop: '-22px',
    };
    return styles;
  }

  function setJoinStyle() {
    let styles = {
      fontSize: '18.2px',
      letterSpacing: '0.2px',
      paddingLeft: '51px',
      marginTop: '-22px',
    };
    return styles;
  }

  return (
    <div>
      {visibleFlag && (
        <div className="relative flex flex-col" style={setMainStyle()}>
          <div className="absolute" style={setLogoContainerStyle()}>
            <div
              className="px-3 py-3 flex items-center justify-center"
              style={setLogoStyle()}
            >
              <img src={TokoIcon} width="62px" alt="Token Icon" />
            </div>
          </div>
          <div className="flex-1 flex justify-between flex-col">
            <div
              className="uppercase text-left font-bold welcome-title-gradient"
              style={setTitleStyle()}
            >
              <p className="text-white">Welcome To The</p>
              <p className="text-green">Degenesis Event</p>
            </div>
            <div
              className="text-white text-md text-left"
              style={setDescriptionStyle()}
            >
              <div>
                {/* The beginning of <span className="italic">Cycle Zero</span>,
                TOKEMAK’s protocol collateralization period. */}
                Welcome to the DeGenesis. This event will secure the initial
                Tokemak reserve, bootstrapping sustainable liquidity deployment
                for DeFi.
                <br />
                <br />
              </div>
              <div>
                Please ensure you’ve read the{' '}
                <a
                  className="font-bold underline"
                  href={MediumTokemakDegenesis}
                  target="_blank"
                  rel="noreferrer"
                >
                  Medium article
                </a>{' '}
                in its entirety before participating.
              </div>
            </div>
          </div>
          <hr />
          <div
            style={setButtonsStyle()}
            className="flex flex-row items-center text-white justify-between"
          >
            {/* <div className="flex-1 flex flex-row text-white" style={setSocialStyle()}> */}
            {/* <SocialButton
                width={48}
                height={48}
                socialsize={30}
                socialtype="twitter"
                fontsize={24}
                description={'Twitter Post'}
                url={TwitterTokenomicsLink}
              />
              <div style={setSocialBetweenStyle()}></div>
              <SocialButton
                width={48}
                height={48}
                socialsize={30}
                socialtype="medium"
                fontsize={24}
                description={'Medium Article'}
                className={'ml-2'}
                url={MediumTokenomicsLink}
              /> */}
            <div style={setJoinStyle()}>
              JOIN OUR{' '}
              <a href={DiscordLink} target="_blank" rel="noreferrer">
                <SocialLink>DISCORD</SocialLink>
              </a>{' '}
              FOR UPDATES
            </div>
            <div style={setReadStyle()}>
              READ OUR{' '}
              <a href={MediumTokemakDegenesis} target="_blank" rel="noreferrer">
                <SocialLink>MEDIUM POST</SocialLink>
              </a>
            </div>
            {/* </div> */}
            <div
              className="text-white flex flex-row items-center cursor-pointer"
              style={setContinueStyle()}
              onClick={(e) => onClose()}
            >
              continue
              <BiRightArrowAlt
                className="align-middle"
                size={28}
                style={setRightStyle()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
