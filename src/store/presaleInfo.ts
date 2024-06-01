import { create } from 'zustand';
import {
    PRESALE_ADDRESS,
    TOKEN_ADDRESS
} from "@/constants/constants";

interface PresaleInfo {
    TOKEN_PRESALE_HARDCAP: number;
    setHardCap: (value: number) => void;

    PRICE_PER_TOKEN: number;
    setPrice: (value: number) => void;

    BUYER_HARDCAP: number;
    setBuyerHardcap: (value: number) => void;

    BUYER_TOKEN_HARDCAP: number;
    setBuyerTokenHardcap: (value: number) => void;

    WHITELIST_ENABLED: boolean;
    setWhitelistEnabled: (value: boolean) => void;

    PRESALE_ENDED: boolean;
    setPresaleEnded: (value: boolean) => void;

    PRESALE_STARTED: boolean;
    setPresaleStarted: (value: boolean) => void;

    transactionPending: boolean;
    setTransactionPending: (value: boolean) => void;

    buyAmount: number;
    setBuyAmount: (value: number) => void;
    
    totalBuyAmount: number;
    setTotalBuyAmount: (value: number) => void;

    allowance: number;
    setAllowance: (value: number) => void;

    presaleStatus: number;
    setPresaleStatus: (value: number) => void;

    buyable: boolean;
    setBuyable: (value: boolean) => void;

    tokenClaimable: boolean;
    setTokenClaimable: (value: boolean) => void;

    claimableTokens: number;
    setClaimableTokens: (value: number) => void;

    trxType: number;
    setTrxType: (value: number) => void;
}

export const usePresaleInfoStore = create<PresaleInfo>((set) => ({
    TOKEN_PRESALE_HARDCAP: 1,
    setHardCap: (value: number) => {
        set({ TOKEN_PRESALE_HARDCAP: value });
    },

    PRICE_PER_TOKEN: 0,
    setPrice: (value: number) => {
        set({ PRICE_PER_TOKEN: value });
    },

    BUYER_HARDCAP: 1,
    setBuyerHardcap: (value: number) => {
        set({ BUYER_HARDCAP: value });
    },

    BUYER_TOKEN_HARDCAP: 0,
    setBuyerTokenHardcap: (value: number) => {
        set({ BUYER_TOKEN_HARDCAP: value });
    },

    WHITELIST_ENABLED: false,
    setWhitelistEnabled: (value: boolean) => {
        set({ WHITELIST_ENABLED: value });
    },

    PRESALE_ENDED: false,
    setPresaleEnded: (value: boolean) => {
        set({ PRESALE_ENDED: value });
    },

    PRESALE_STARTED: false,
    setPresaleStarted: (value: boolean) => {
        set({ PRESALE_STARTED: value });
    },

    transactionPending: false,
    setTransactionPending: (value: boolean) => {
        set({ transactionPending: value });
    },

    buyAmount: 0,
    setBuyAmount: (value: number) => {
        set({ buyAmount: value });
    },

    totalBuyAmount: 0,
    setTotalBuyAmount: (value: number) => {
        set({ totalBuyAmount: value });
    },

    allowance: 0,
    setAllowance: (value: number) => {
        set({ allowance: value });
    },

    presaleStatus: 0,
    setPresaleStatus: (value: number) => {
        set({ presaleStatus: value });
    },

    buyable: false,
    setBuyable: (value: boolean) => {
        set({ buyable: value });
    },

    tokenClaimable: false,
    setTokenClaimable: (value: boolean) => {
        set({ tokenClaimable: value });
    },

    claimableTokens: 0,
    setClaimableTokens: (value: number) => {
        set({ claimableTokens: value });
    },

    trxType: 0,
    setTrxType: (value: number) => {
        set({ trxType: value });
    }
}))