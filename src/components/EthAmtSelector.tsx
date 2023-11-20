import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { BsChevronDown } from 'react-icons/bs';
import { toFloat, formatValue } from '../utils/number';

import { ETH_LIMIT } from '../constants/tokens';

const AmountInput = styled.input`
  background: transparent;
  color: white;
  text-align: right;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const TokenList = styled.div`
  border: 1px solid #ffffff;
  border-radius: 5px;
  left: -4px;
  top: 0px;
  background-color: #000000;
`;

interface EtherAmtSelectorProps {
  borderwidth?: number;
  height?: number;
  bal?: number | string;
  maincolor?: string;
  bgcolor?: string;
  unit?: string;
  content?: boolean;
  flexflag?: boolean;
  className?: string;
  max?: number | string;
  initval?: string;
  curtoken?: string;
  withdrawal?: boolean;
  updateBalance?: (token: string) => void;
  updateCommitVal?: (bal: string) => void;
  updateToken?: (token: string) => void;
  disableTokenSelect?: boolean
}

export default function EtherAmtSelector({
  bal,
  className,
  max = ETH_LIMIT,
  initval,
  curtoken,
  withdrawal = false,
  updateBalance,
  updateCommitVal,
  updateToken,
  disableTokenSelect = false
  
}: EtherAmtSelectorProps) {
  const [curval, setCurVal] = useState<string>('0');
  const [openTokenList, setOpenTokenList] = useState(false);
  const [curToken, setCurToken] = useState<string>(curtoken ? curtoken : 'eth');
  const inputRegex = new RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

  console.log()

  const updateTokenAmount = (amount: string) => {
    const nextUserInput = amount ? amount.toString().replace(/[,]/g, '') : '';
    if (
      !nextUserInput ||
      inputRegex.test(nextUserInput.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    ) {
      if (bal && toFloat(nextUserInput) > bal) setMaxVal();
      else if (toFloat(nextUserInput) > max) setMaxVal();
      else if (
        toFloat(nextUserInput) === bal &&
        amount.length > bal.toString().length
      )
        setMaxVal();
      else if (
        toFloat(nextUserInput) === max &&
        amount.length > max.toString().length
      )
        setMaxVal();
      else if (!bal) setCurVal('0');
      else setCurVal(nextUserInput);
    }
  };

  useEffect(() => {
    if (initval) {
      setCurVal(initval);
    }
  }, [initval]);

  useEffect(() => {
    if (updateCommitVal) {
      updateCommitVal(curval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curval]);

  function setValueContainerStyle() {
    let styles: Record<string,string> = {
      borderRadius: '5px',
      border: '1px solid #ffffff',
      marginLeft: '15px',
      marginRight: '18px',
      marginTop: '-2px',
    };
    if (disableTokenSelect) {
      styles.userSelect = 'none';
    }
    return styles;
  }

  function getMaxContainer() {
    let styles = {
      borderLeft: '1px solid #ffffff',
      marginLeft: '-3px',
    };
    return styles;
  }

  function getMaxStyle() {
    let styles = {
      color: '#909090',
      paddingLeft: '14px',
      marginRight: '16px',
      height: '20px',
      lineHeight: '20px',
      fontSize: '10.91px',
    };
    return styles;
  }

  function setMaxVal() {
    if (bal && bal !== -1) {
      if (bal > max) setCurVal(max.toString());
      else setCurVal(bal.toString());
    }
  }

  function setToken(token: string) {
    setCurVal('');
    setCurToken(token);
    setOpenTokenList(false);
    if (updateToken) updateToken(token);

    if (updateBalance) {
      updateBalance(token);
    }
  }

  function setChevronDownStyle() {
    let styles = {
      marginLeft: '11px',
      marginTop: '-7px',
    };
    return styles;
  }

  function setTokenStyle() {
    let styles = {
      marginLeft: '-1px',
      marginBottom: '-4px',
    };
    return styles;
  }

  function setAmountInputStyle() {
    let styles = {
      marginRight: '8px',
      height: '100%',
    };
    return styles;
  }

  function formatNum(bal:number|string|undefined) {
    const ar = (bal || '0').toString().split('.');
    const val = [];
    val.push(ar[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    if (ar[1]) {
      val.push('.')
      val.push(ar[1]);
    }
    return val.join('');     
  }

  return (
    <div
      className={`flex flex-row px-2 ${!disableTokenSelect ? 'cursor-pointer' : ''} ${
        className ? className : ''
      }`}
      style={setValueContainerStyle()}
    >
      <div className="flex flex-col px-1 mr-2 py-1" style={{maxWidth: "70px"}}>
        <div
          className="text-white uppercase flex flex-row items-center relative"
          style={setTokenStyle()}
          
            onClick={(e) => {
              if (openTokenList === false && !disableTokenSelect) setOpenTokenList(true);
            }}
          
        >
          {curToken}
          {!withdrawal ? (
            <BsChevronDown
              size={12}
              style={setChevronDownStyle()}
              className="text-gray"
            />
          ) : (
            ''
          )}
          <TokenList
            className={`absolute flex flex-col uppercase ${
              openTokenList ? 'inline' : 'hidden'
            }`}
          >
            <div
              className={`px-2 cursor-pointer ${
                curToken === 'eth' ? 'text-black bg-white' : ''
              }`}
              onClick={(e) => setToken('eth')}
            >
              Eth
            </div>
            <hr />
            <div
              className={`px-2 cursor-pointer ${
                curToken === 'usdc' ? 'text-black bg-white' : ''
              }`}
              onClick={(e) => setToken('usdc')}
            >
              USDC
            </div>
          </TokenList>
        </div>
        <div className="text-xs uppercase text-gray text-left" style={{textOverflow: "ellipsis", overflow:"hidden"}}>
          {bal === -1
            ? ''
            : formatNum(bal)}
        </div>
      </div>
      <div
        className="flex-1 flex justify-between flex-row items-center py-2"
        style={getMaxContainer()}
      >
        <div
          className="uppercase text-xs cursor-pointer"
          style={getMaxStyle()}
          onClick={(e) => setMaxVal()}
        >
          Max
        </div>
        <div
          className="uppercase text-xl text-white flex-1"
          style={setAmountInputStyle()}
        >
          <AmountInput
            type="text"
            value={formatValue(
              curval === undefined || curval === '0' ? '' : curval
            )}
            onChange={(e) => updateTokenAmount(e.target.value)}
            placeholder={'0'}
            style={{ height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
