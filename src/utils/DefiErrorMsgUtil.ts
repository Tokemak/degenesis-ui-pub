export const DEFAULT_ERROR =
  "Whoops! Something's gone wrong. Please contact us in the Discord channel for support.";

export function getDefiErrorMsg(e: any): string | undefined {
  return e?.data?.message;
}

export function getTransactionErr(e: any): string | undefined {
  return e?.message;
}

export function getDefiErrorOrTransactionErr(e: any): string {
  return getDefiErrorMsg(e) || getTransactionErr(e) || DEFAULT_ERROR;
}
