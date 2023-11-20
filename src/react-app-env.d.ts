/// <reference types="react-scripts" />

declare module 'fortmatic'

interface Window {
    ethereum?: {
        isMetaMask?: true
        isTrust?: true
        on?: (...args: any[]) => void
        removeListener?: (...args: any[]) => void
        autoRefreshOnNetworkChange?: boolean
    }
    web3?: {}
}