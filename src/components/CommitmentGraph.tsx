import { useState, useEffect } from 'react';
import type { StyledComponent } from 'styled-components';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import { calculateTotalContractBalanceAsNumber } from '../utils/CommitmentUtils';
import { useSubscription } from '@apollo/client';
import { TOTAL_COMMITMENT } from '../Query';
import { DEFI_ADDRESS } from '../constants/tokens';

interface CommitmentGraphProps {
  currentUsd: any;
  AssetsLegend: StyledComponent<'div', any, {}, never>;
  EffectiveLabel: StyledComponent<'div', any, {}, never>;
}

export default function CommitmentGraph({
  currentUsd,
  AssetsLegend,
  EffectiveLabel,
}: CommitmentGraphProps) {
  const maxTokePrice = 8;
  const tokeAmt = 3000000;

  const { data: contractData, loading: contractLoading } = useSubscription(
    TOTAL_COMMITMENT,
    {
      variables: {
        contractAddress: DEFI_ADDRESS.toLowerCase(),
      },
    }
  );

  const tdataAr: {
    swapped: number;
    notSwapped: number;
    farmed: number;
    notFarmed: number;
    name: string;
  }[] = [];

  const [tdata, setTData] = useState(tdataAr);
  const [indexOfLastBar, setIndexOfLastBar] = useState(-1);

  useEffect(() => {
    if (contractLoading) return;
    if (!contractData) return;

    let tvl =
      !contractLoading && contractData && contractData.contracts.length > 0
        ? calculateTotalContractBalanceAsNumber(
            contractData.contracts[0].balances,
            currentUsd
          )
        : 0;

    const xd: {
      swapped: number;
      notSwapped: number;
      farmed: number;
      notFarmed: number;
      name: string;
    }[] = [];

    let setIndex = 0;

    for (let i = 1; i <= 48; i++) {
      const item = {
        swapped: 0,
        notSwapped: 0,
        farmed: 0,
        notFarmed: 0,
        name: '',
      };
      const indexMil = i * 1000000;

      const maxPriceAtTick = i <= 6 ? 2 : i > 24 ? 8 : indexMil / tokeAmt;
      let farmPct = 0;
      const actualFarmPct = 1 - parseFloat(process.env.REACT_APP_SWAP_PCT!!);

      if (i <= 6) {
        item.swapped = tvl >= indexMil ? 2 : 0;
        item.notSwapped = item.swapped === 2 ? 0 : 2;
      }
      if (i > 6) {
        item.swapped = tvl > indexMil ? maxPriceAtTick : 0;
        item.notSwapped = item.swapped > 0 ? 0 : maxPriceAtTick;

        if (i >= 24) {
          farmPct = (indexMil - maxTokePrice * tokeAmt) / indexMil;

          if (item.swapped > 0) {
            item.farmed = item.swapped * farmPct;
            item.swapped = item.swapped - item.swapped * farmPct;
          } else {
            item.notFarmed = item.notSwapped * farmPct;
            item.notSwapped = item.notSwapped - item.notSwapped * farmPct;
          }
        }
      }

      if (i % 6 === 0) {
        item.name = '$' + i.toString() + 'M';
      }

      if (
        (tvl >= indexMil && tvl < (i + 1) * 1000000) ||
        (i === 48 && tvl >= 48000000)
      ) {
        setIndex = i - 1;
        (window as any)['farmPct'] = actualFarmPct;
        (window as any)['tvl'] = tvl;
      }

      xd.push(item);
    }

    if (tvl <= 1000000) {
      setIndex = -1;
    }
    if (setIndex > 47) {
      setIndex = 47;
    }
    setIndexOfLastBar(setIndex);

    setTData(xd);
  }, [contractData, contractLoading, currentUsd]);

  const renderCustomizedLabel = (props: any) => {
    const { x, y, index } = props;

    if (index === indexOfLastBar) {
      (window as any)['positionTooltip']();
      return (
        <ellipse
          style={{
            fill: '#ffffff',
            fillOpacity: 1,
            stroke: '#ffffff',
            strokeWidth: 0.474953,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeMiterlimit: 49.8,
            strokeDasharray: 'none',
            strokeOpacity: 1,
          }}
          id="graphdot"
          data-ix={index}
          cx={x + 2}
          cy={y - 1}
          rx="10"
          ry="10"
        />
      );
    } else {
      return <g></g>;
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '620px',
        padding: '60px',
        position: 'relative',
      }}
    >
      <EffectiveLabel>Conversion Rate</EffectiveLabel>
      <ResponsiveContainer>
        <BarChart
          data={tdata}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis tickMargin={16} tickCount={48} interval={0} dataKey="name" />
          <YAxis
            domain={[0, 8]}
            tickCount={7}
            tickFormatter={(x) => {
              if (x === 0 || x === 1) return '';
              return '$' + x.toString() + '   ';
            }}
            scale="linear"
          />

          <Bar barSize={3} dataKey="farmed" stackId="a" fill="#6889FF" />
          <Bar
            barSize={3}
            id="swappedBar"
            dataKey="swapped"
            stackId="a"
            fill="#B5FF00"
          >
            <LabelList position="center" content={renderCustomizedLabel}>
              Test
            </LabelList>
          </Bar>
          <Bar barSize={3} dataKey="notFarmed" stackId="a" fill="#767676" />
          <Bar barSize={3} dataKey="notSwapped" stackId="a" fill="#2C2C2C" />
        </BarChart>
      </ResponsiveContainer>
      <AssetsLegend>TOTAL COMMITMENTS</AssetsLegend>
    </div>
  );
}
