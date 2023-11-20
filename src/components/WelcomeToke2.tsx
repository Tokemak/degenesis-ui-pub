import { useState } from 'react';
import styled from 'styled-components';
import { BiRightArrowAlt } from 'react-icons/bi';

import { DiscordLink, MediumTokemakDegenesis } from '../constants/links';
import TokoIcon from '../assets/img/toko.svg';
import TimesThin from '../assets/img/times-thin.svg';

const SocialLink = styled.span`
  color: #b5ff00;
  text-decoration: underline;
`;

interface WelcomeToke2Props {
  width?: number;
  height?: number;
  onCloseClick?: (flag: boolean) => void;
}

export default function WelcomeToke2({
  width,
  height,
  onCloseClick,
}: WelcomeToke2Props) {
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
      paddingLeft: '20px',
    };
    return styles;
  }

  function setTitleStyle() {
    let styles = {
      paddingLeft: '98px',
      paddingTop: '40px',
      fontSize: '36px',
      lineHeight: '1',
    };
    return styles;
  }

  function setDescriptionStyle() {
    let styles = {
      paddingLeft: '48px',
      paddingRight: '48px',
      // marginBottom: '65px',
      fontSize: '24px',
      lineHeight: '1.2',
      paddingTop: '30px',
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
      marginRight: '50px',
      fontSize: '24px',
      marginTop: '-25px',
    };
    return styles;
  }

  function setRightStyle() {
    let styles = {
      marginRight: '-6px',
      marginTop: '-2px',
    };
    return styles;
  }

  function setArrowStyle() {
    let styles = {
      marginTop: '-2px',
      marginLeft: '3px',
      marginRight: '20px',
    };
    return styles;
  }

  function setLineStyle() {
    let styles = {
      marginTop: '4px',
      marginLeft: '0px',
    };
    return styles;
  }

  function setLine2Style() {
    let styles = {
      marginTop: '30px',
      marginLeft: '0px',
    };
    return styles;
  }

  function setCloseStyle() {
    let styles = {
      border: '1px solid #ffffff',
      right: '26px',
      top: '23px',
      width: '36px',
      height: '36px',
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
          <div className="absolute px-3 py-3" style={setLogoContainerStyle()}>
            <div className="px-3 py-3 flex" style={setLogoStyle()}>
              <img src={TokoIcon} width="62px" alt="Token Icon" />
            </div>
          </div>
          <div
            className="absolute text-white cursor-pointer"
            style={setCloseStyle()}
            onClick={(e) => onClose()}
          >
            <img src={TimesThin} alt="" />
          </div>
          <div className="flex-1 flex flex-col">
            <div
              className="uppercase text-2xl text-left font-bold"
              style={setTitleStyle()}
            >
              <span className="text-white">The Degenesis </span>
              <span className="text-green">Tl;dr</span>
            </div>
            <div
              className="text-white text-md text-left"
              style={setDescriptionStyle()}
            >
              <div className="flex flex-row" style={setLineStyle()}>
                <BiRightArrowAlt
                  className="align-middle text-green"
                  size={48}
                  style={setArrowStyle()}
                />
                3,000,000 TOKE are available in the DeGenesis and everyone will
                receive TOKE at the same final rate between $2 and $8 per TOKE
              </div>
              <div className="flex flex-row" style={setLine2Style()}>
                <BiRightArrowAlt
                  className="align-middle text-green"
                  size={32}
                  style={setArrowStyle()}
                />
                Final rate is determined by total commitments, capped at $8 once
                total commitments reach $24M
              </div>
              <div className="flex flex-row" style={setLine2Style()}>
                <BiRightArrowAlt
                  className="align-middle text-green"
                  size={40}
                  style={setArrowStyle()}
                />
                Once total commitments surpass $24M, up to the $48M max cap, a
                proportional swap/private farming split is globally applied
              </div>
              {/* <div className="flex flex-row" style={setDotLineStyle()}>
                <BsFillCircleFill
                  className="align-middle text-white"
                  size={9}
                  style={setDotStyle()}
                />
                TOKE Price
              </div>
              <div className="flex flex-row" style={setDotLineStyle()}>
                <BsFillCircleFill
                  className="align-middle text-white"
                  size={9}
                  style={setDotStyle()}
                />
                Per-address commitments
              </div>
              <div className="flex flex-row" style={setDotLineStyle()}>
                <BsFillCircleFill
                  className="align-middle text-white"
                  size={9}
                  style={setDotStyle()}
                />
                Total commitments
              </div> */}
              <div className="flex flex-row" style={setLine2Style()}>
                <BiRightArrowAlt
                  className="align-middle text-green"
                  size={48}
                  style={setArrowStyle()}
                />
                Everyone’s commitments qualify for the same relative split
                between TOKE swap and private farming (detailed extensively in
                the Medium article)
              </div>
              <div className="flex flex-row" style={setLine2Style()}>
                <BiRightArrowAlt
                  className="align-middle text-green"
                  size={28}
                  style={setArrowStyle()}
                />
                Individual ETH addresses may contribute a max value of $100,000
                in either ETH or USDC
              </div>
            </div>
          </div>
          <hr />
          <div
            style={setButtonsStyle()}
            className="flex flex-row items-center justify-between text-white"
          >
            {/* <div className="flex-1 flex flex-row" style={setSocialStyle()}> */}
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
              continue to site
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
