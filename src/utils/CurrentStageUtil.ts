interface Data {
  contracts: ContractData[];
}

interface ContractData {
  depositsOpen: boolean;
  withdrawalsOpen: boolean;
  privateFarmingOpen: boolean;
}

export enum DefiStage {
  COMMITMENT,
  LAST_LOOK,
  PRIVATE_FARMING,
}

// REACT_APP_DEFI_CURRENT_STAGE enviornment variable allows us to know where we are without making a network call
// it is only used for determing what to display on the MainLanding before
// a user connects a wallet (and before we're able to query the contractData from The Graph)
function getCurrentStageFromEnvVar(): DefiStage {
  switch (process.env.REACT_APP_DEFI_CURRENT_STAGE) {
    case 'LAST_LOOK':
      return DefiStage.LAST_LOOK;
    case 'PRIVATE_FARMING':
      return DefiStage.PRIVATE_FARMING;
    default:
      return DefiStage.COMMITMENT;
  }
}

function getCurrentStateFromContractData(
  data: Data | undefined
): DefiStage | undefined {
  const defiContract = data?.contracts?.[0];

  if (!defiContract) {
    return;
  }

  if (defiContract.depositsOpen) return DefiStage.COMMITMENT;
  if (defiContract.withdrawalsOpen) return DefiStage.LAST_LOOK;
  if (defiContract.privateFarmingOpen) return DefiStage.PRIVATE_FARMING;
}

export function getCurrentStage(
  existingStage: DefiStage,
  data: Data | undefined = undefined
): DefiStage {
  const currentStage =
    getCurrentStateFromContractData(data) || getCurrentStageFromEnvVar();

  // we don't want the app to accidentally toggle between stages if there is an issue with
  // the contractData query at some point. Never let the app move backwards in stages.
  if (existingStage > currentStage) return existingStage;
  return currentStage;
}
