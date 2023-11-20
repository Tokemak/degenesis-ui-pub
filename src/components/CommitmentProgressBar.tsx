import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TokeBar from './TokeBar';

const MaxSpan = styled.p`
  margin-top: -8px;
`;

const AmountDiv = styled.div`
  height: 100px;
`;

const TokeBox = styled.div`
  border: 1px solid #ffffff;
  border-radius: 3px;
  background: #191919;
  width: 130px;
`;

const TokeBoxContainer = styled.div`
  top: -123px;
`;

const TokeMaxLabel = styled.div`
  padding-top: 12px;
  margin-left: -3px;
`;

interface CommitmentProgressBarProps {
  width?: number;
  height?: number;
  toke?: number;
  farm?: number;
  striped?: boolean;
  tokecolor?: string;
  farmcolor?: string;
  bgcolor?: string;
  stripecolor?: string;
  stripedegree?: number;
  maxval?: number;
  valunit?: string;
  tokemax?: number;
  amountmax?: number;
  updateTokeFarm?: (toke: number, farm: number) => void;
}

export default function CommitmentProgressBar({
  width,
  height,
  toke,
  farm,
  striped,
  tokecolor,
  farmcolor,
  bgcolor,
  stripecolor,
  stripedegree,
  tokemax,
  amountmax,
  updateTokeFarm,
}: CommitmentProgressBarProps) {
  const [realToke, setRealToke] = useState(toke);
  const [realFarm, setRealFarm] = useState(farm);
  const [realTokeBar, setRealTokeBar] = useState(0);
  const [realFarmBar, setRealFarmBar] = useState(0);

  useEffect(() => {
    if (toke !== undefined && farm !== undefined) {
      if (toke === 100 && farm > 0) {
        setRealTokeBar((toke / (toke + farm)) * 100);
        setRealFarmBar((farm / (toke + farm)) * 100);
        if (updateTokeFarm)
          updateTokeFarm(
            (toke / (toke + farm)) * 100,
            (farm / (toke + farm)) * 100
          );
      } else {
        setRealTokeBar(100);
        if (updateTokeFarm) updateTokeFarm(100, 0);
      }
    }
  }, []);

  function setMainStyle() {
    let styles = {};
    if (width) {
      const firstStyle = {
        width: '' + width / 2 + 'px',
      };
      styles = Object.assign(styles, firstStyle);
    }
    if (height) {
      const secondStyle = {
        height: '' + height + 'px',
      };
      styles = Object.assign(styles, secondStyle);
    }
    if (bgcolor) {
      const thirdStyle = {
        backgroundColor: bgcolor,
      };
      styles = Object.assign(styles, thirdStyle);
    }
    if (striped) {
      if (stripecolor) {
        const thirdStyle = {
          backgroundSize: '0.5rem 0.5rem',
        };
        styles = Object.assign(styles, thirdStyle);
        const fourthStyle = {
          backgroundImage:
            'linear-gradient(' +
            stripedegree +
            'deg,' +
            stripecolor +
            ' 25%,transparent 0,transparent 50%,' +
            stripecolor +
            ' 0,' +
            stripecolor +
            ' 75%,transparent 0,transparent)',
        };
        styles = Object.assign(styles, fourthStyle);
      }
    }
    return styles;
  }

  function setSubStyle(part: number) {
    let styles = {};
    let firstStyle;
    if (part === 1) {
      firstStyle = {
        width: '' + realToke + '%',
        height: '100%',
        backgroundColor: tokecolor,
      };
    } else {
      firstStyle = {
        width: '' + realFarm + '%',
        height: '100%',
        backgroundColor: farmcolor,
      };
    }
    styles = Object.assign(styles, firstStyle);
    if (striped) {
      if (stripecolor) {
        const thirdStyle = {
          backgroundSize: '0.5rem 0.5rem',
        };
        styles = Object.assign(styles, thirdStyle);
        const fourthStyle = {
          backgroundImage:
            'linear-gradient(' +
            stripedegree +
            'deg,' +
            stripecolor +
            ' 25%,transparent 0,transparent 50%,' +
            stripecolor +
            ' 0,' +
            stripecolor +
            ' 75%,transparent 0,transparent)',
        };
        styles = Object.assign(styles, fourthStyle);
      }
    }
    return styles;
  }

  function setSplitBar() {
    let styles = {
      width: '3px',
      marginLeft: '4px',
      marginRight: '2px',
    };
    if (bgcolor) {
      const firstStyle = {
        backgroundColor: bgcolor,
      };
      styles = Object.assign(styles, firstStyle);
    }
    if (height) {
      const secondStyle = {
        height: '' + height * 2.5 + 'px',
      };
      styles = Object.assign(styles, secondStyle);
    }
    return styles;
  }

  function setAmountStyle(part: number) {
    let styles = {
      bottom: '0px',
    };
    let offset = 0;
    if (part === 1) {
      if (amountmax) {
        offset = amountmax / 2;
        offset = offset.toString().length;
        offset =
          (parseInt(getComputedStyle(document.documentElement).fontSize) *
            offset) /
          2;
      }
      offset = offset + 2;
      const firstStyle = {
        fontSize: '1rem',
        right: 'calc(50% - ' + offset + 'px)',
        bottom: '6px',
      };
      styles = Object.assign(styles, firstStyle);
    } else {
      if (amountmax) {
        offset = amountmax;
        offset = offset.toString().length;
        offset =
          (parseInt(getComputedStyle(document.documentElement).fontSize) *
            offset) /
          2;
      }
      offset = offset - 8;
      const firstStyle = {
        fontSize: '1rem',
        right: '-' + offset + 'px',
        bottom: '5px',
      };
      styles = Object.assign(styles, firstStyle);
    }
    return styles;
  }

  function getTokeCurrent() {
    if (tokemax && realToke)
      return (Math.round(tokemax * 1.0 * realToke) / 100).toFixed(2);
    return 0;
  }

  function getLineStyle() {
    let styles = {
      width: '1px',
      height: '93px',
      left: '50%',
    };
    if (farm && farm > 0) {
      const firstStyle = {
        backgroundColor: farmcolor,
      };
      styles = Object.assign(styles, firstStyle);
    } else {
      const firstStyle = {
        backgroundColor: tokecolor,
      };
      styles = Object.assign(styles, firstStyle);
    }
    return styles;
  }

  function getTokeBoxContainer() {
    let styles = {};
    let tokeboxwidth = 65;
    if (realFarm && realFarm > 0 && width) {
      const offset =
        width / 2 + 9 + ((width / 2) * realFarm) / 100.0 - tokeboxwidth;
      const firstStyle = {
        left: '' + offset + 'px',
      };
      styles = Object.assign(styles, firstStyle);
    } else if (realToke && width) {
      const offset = ((width / 2) * realToke) / 100.0 - tokeboxwidth;
      const firstStyle = {
        left: '' + offset + 'px',
      };
      styles = Object.assign(styles, firstStyle);
    }
    return styles;
  }

  function onTokeMouseMove(e: any) {
    const offset = e.nativeEvent.offsetX;
    if (width) {
      const curval = ((offset * 100.0) / width) * 2;
      if (curval >= 25) {
        setRealToke(((offset * 100.0) / width) * 2);
      } else {
        setRealToke(25);
      }
      setRealFarm(0);

      setRealTokeBar(100);
      setRealFarmBar(0);

      if (updateTokeFarm) updateTokeFarm(realTokeBar, realFarmBar);
    }
  }

  function onTokeMouseOut() {
    // setRealToke(toke)
    // setRealFarm(farm)
  }

  function onFarmMouseMove(e: any) {
    const offset = e.nativeEvent.offsetX;
    if (width) {
      setRealToke(100);
      setRealFarm(((offset * 100.0) / width) * 2);

      if (realToke && realFarm) {
        setRealTokeBar(+((realToke / (realToke + realFarm)) * 100).toFixed(2));
        setRealFarmBar(+((realFarm / (realToke + realFarm)) * 100).toFixed(2));
      }

      if (updateTokeFarm) updateTokeFarm(realTokeBar, realFarmBar);
    }
  }

  function onFarmMouseOut() {
    // setRealToke(toke)
    // setRealFarm(farm)
  }

  return (
    <div>
      <AmountDiv className="flex relative flex-row">
        <div className="absolute text-white" style={setAmountStyle(1)}>
          ${amountmax ? amountmax / 2 : ''}M
        </div>
        <div className="absolute text-white" style={setAmountStyle(2)}>
          ${amountmax}M
        </div>
      </AmountDiv>
      <div className="flex flex-row items-center relative">
        <TokeBoxContainer
          className="absolute"
          id="tokeboxcontainer"
          style={getTokeBoxContainer()}
        >
          <TokeBox className="flex flex-row text-white uppercase px-1 py-2 justify-center items-center">
            <div>${getTokeCurrent()}/Toke</div>
            <div className="ml-2">
              <TokeBar
                borderwidth={5}
                height={25}
                val={realTokeBar}
                maincolor={'#B5FF00'}
                bgcolor={'#aaaaaa'}
                content={false}
              />
            </div>
            <div className="ml-1">
              <TokeBar
                borderwidth={5}
                height={25}
                val={realFarmBar}
                maincolor={'#2554F9'}
                bgcolor={'#aaaaaa'}
                content={false}
              />
            </div>
          </TokeBox>
          <div style={getLineStyle()} className="absolute"></div>
        </TokeBoxContainer>
        <div
          style={setMainStyle()}
          className="commitment-progress-gradient"
          onMouseMove={(e) => onTokeMouseMove(e)}
          onMouseOut={(e) => onTokeMouseOut()}
        >
          <div style={setSubStyle(1)}></div>
        </div>
        <div style={setSplitBar()} />
        <div
          style={setMainStyle()}
          className="commitment-progress-gradient"
          onMouseMove={onFarmMouseMove}
          onMouseOut={onFarmMouseOut}
        >
          <div style={setSubStyle(2)}></div>
        </div>
        <div style={setSplitBar()} />
      </div>
      <TokeMaxLabel className="w-full flex justify-center text-white flex-col">
        ${tokemax}/TOKE
        <MaxSpan className="uppercase text-gray">Max</MaxSpan>
      </TokeMaxLabel>
    </div>
  );
}
