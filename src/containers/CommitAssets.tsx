import styled from 'styled-components';
import { FaEthereum } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';

import TokeBar from '../components/TokeBar';
import CommitmentProgressBar from '../components/CommitmentProgressBar';
import EtherAmtSelector from '../components/EthAmtSelector';

const CommitmentPanel = styled.div`
  border-radius: 5px;
  border: 1px solid #ffffff;
  width: 300px;
  margin-top: 3rem;
  margin-right: 2.5rem;
`;

const CommitTitle = styled.div`
  border-left: 5px solid #b5ff00;
`;

const ConnectWalletPanel = styled.div`
  background-color: rgba(97, 97, 97, 0.1);
`;

const ConnectWallet = styled.div`
  background-color: #b5ff00;
  border-radius: 5px;
`;

const TotalCommitment = styled.div`
  margin-top: 3rem;
`;

const EtherAmount = styled.span`
  color: #b5ff00;
`;

interface CommitAssetsProps {
  param?: string;
}

export default function CommitAssets({ param }: CommitAssetsProps) {
  return (
    <div className="flex flex-row ml-5 pl-5 justify-between">
      <CommitmentPanel>
        <div className="flex justify-between uppercase items-baseline px-3 pt-2">
          <div className="text-white text-xl">Commitment</div>
          <div className="text-xs text-gray">Current Period</div>
        </div>
        <div className="py-3 uppercase text-md text-left px-3 text-green">
          23 Hours 59 Minutes Remain
        </div>
        <hr />
        <CommitTitle className="text-white uppercase text-xl mt-3 px-3 text-left">
          Commit Eth or Usdc to swap for toke. Each user may only commit one
          asset type.
          <br />
          <br />
          <div className="text-gray text-sm">
            Final Eth/Toke conversion rate is set at start of last look.
          </div>
        </CommitTitle>

        <ConnectWalletPanel className="py-3 my-3">
          <div className="px-3 uppercase text-left text-xs text-gray">
            If total commitments exceed $30m USD at start of last look, get
            exclusive access to private farming in genesis pools.
          </div>
          <div className="px-3 py-3">
            <EtherAmtSelector />
          </div>
          {/* <div className="uppercase text-xs text-left px-3 py-3 text-gray">
            Commit Eth or Usdc
          </div> */}
          <ConnectWallet className="mx-3 uppercase py-2 font-bold">
            Commit Assets
          </ConnectWallet>
        </ConnectWalletPanel>
      </CommitmentPanel>

      <div>
        <TotalCommitment className="font-bold text-3xl text-white underline text-left uppercase mb-5">
          Total Commitments
        </TotalCommitment>
        <CommitmentProgressBar
          width={800}
          height={20}
          toke={100}
          farm={89}
          striped={true}
          tokecolor={'#8cb22e'}
          farmcolor={'#2554F9'}
          bgcolor={'#ffffff'}
          stripecolor={'rgba(0, 0, 0, 1)'}
          stripedegree={90}
          tokemax={10}
          amountmax={60}
        />
      </div>

      <CommitmentPanel>
        <div className="flex justify-between uppercase items-baseline px-3 pt-2">
          <div className="text-white text-md">Your Commitments</div>
        </div>
        <div className="py-3 uppercase text-md text-left px-3 flex flex-row items-center">
          <FaEthereum className="text-gray" size={24} />
          <EtherAmount className="text-3xl">20.6780 ETH</EtherAmount>
        </div>
        <hr />
        <div className="flex justify-between uppercase items-baseline px-3 pt-2">
          <div className="text-md text-gray">Total Commitments</div>
        </div>
        <div className="py-3 uppercase text-md text-left px-3 flex flex-row items-center">
          <BiDollar className="text-gray" size={24} />
          <div className="text-3xl text-white">28,000,359</div>
        </div>
        <hr />
        <div className="flex justify-between uppercase items-baseline px-3 pt-2">
          <div className="text-md text-gray">Toke Conversion Rate</div>
        </div>
        <div className="py-3 uppercase text-md text-left px-3 flex flex-row items-center">
          <BiDollar className="text-gray" size={24} />
          <div className="text-3xl text-white">8.56 / Toke</div>
        </div>
        <hr />
        <div className="flex justify-between uppercase items-baseline px-3 pt-2">
          <div className="text-md text-gray">Toke To Be Swapped</div>
        </div>
        <div className="py-3 uppercase text-md text-left px-3 flex flex-row items-center">
          <div className="text-3xl text-white">3,000,000</div>
        </div>
        <hr />
        <div className="flex flex-row mx-5 my-5">
          <TokeBar
            borderwidth={20}
            height={90}
            val={67}
            maincolor={'#B5FF00'}
            bgcolor={'#aaaaaa'}
            unit={'Toke'}
          />
          <TokeBar
            borderwidth={20}
            height={90}
            val={29}
            maincolor={'#2554F9'}
            bgcolor={'#aaaaaa'}
            unit={'Farm'}
          />
        </div>
        <hr />
        <div className="text-center uppercase text-md text-gray">
          As Of 2021-06-25 21:19:47Z
        </div>
      </CommitmentPanel>
    </div>
  );
}
