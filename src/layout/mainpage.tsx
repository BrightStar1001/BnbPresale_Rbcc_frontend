import React, { useState, useEffect } from "react";
import TimerLayout from "@/layout/timer-layout";
import BuyLayout from "@/layout/buy-layout";
import StatsLayout from "@/layout/stats-layout";
import { toast } from "react-toastify";

import PRESALE_ABI from '@/abi/Presale_abi.json';
import MAZZE_ABI from '@/abi/Mazze_abi.json';
import { usePresaleInfoStore } from "@/store/presaleInfo";
import { useAccount, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, formatEther } from 'viem'

import {
    PRESALE_ADDRESS,
    TOKEN_ADDRESS
} from "@/constants/constants";

export default function MainPage() {
    const setHardCap = usePresaleInfoStore((state) => state.setHardCap);
    const setPrice = usePresaleInfoStore((state) => state.setPrice);
    const setBuyerHardcap = usePresaleInfoStore((state) => state.setBuyerHardcap);
    const setTransactionPending = usePresaleInfoStore((state) => state.setTransactionPending);
    const setBuyAmount = usePresaleInfoStore((state) => state.setBuyAmount);
    const setTotalBuyAmount = usePresaleInfoStore((state) => state.setTotalBuyAmount);
    const setPresaleStatus = usePresaleInfoStore((state) => state.setPresaleStatus);
    const setTokenClaimable = usePresaleInfoStore((state) => state.setTokenClaimable);
    const setClaimableTokens = usePresaleInfoStore((state) => state.setClaimableTokens);
    const setBuyable = usePresaleInfoStore((state) => state.setBuyable);
    const setTrxType = usePresaleInfoStore((state) => state.setTrxType);
    const trxType = usePresaleInfoStore((state) => state.trxType);

    const { data:hash, writeContract: writePresaleContract } = useWriteContract();
    const { isPending } = useWaitForTransactionReceipt({hash});
    const account = useAccount()

    const mazzeContract = {
        address: TOKEN_ADDRESS,
        abi: MAZZE_ABI,
    } as const;

    const result1 = useReadContracts({
        contracts: [
            {
                ...mazzeContract,
                functionName: 'balanceOf',
                args: [PRESALE_ADDRESS],
            },
        ]
    });
    const presaleContract = {
        address: PRESALE_ADDRESS as `0x${string}`,
        abi: PRESALE_ABI,
    } as const;

    const result = useReadContracts({
        contracts: [
            {
                ...presaleContract,
                functionName: 'presaleStatus',
            },
            {
                ...presaleContract,
                functionName: 'getMaxTokensPerWallet'
            },
            {
                ...presaleContract,
                functionName: 'totalSoldTokens'
            },
            {
                ...presaleContract,
                functionName: 'getTokenPrice'
            },
            {
                ...presaleContract,
                functionName: 'isClaimable'
            },
            {
                ...presaleContract,
                functionName: 'getClaimableTokens',
                args: [account.address],
            },
            {
                ...presaleContract,
                functionName: 'getUserPaidETH',
                args: [account.address],
            }
            ,
            {
                ...presaleContract,
                functionName: 'isWhitelistEnabled'
            }
            ,
            {
                ...presaleContract,
                functionName: 'whitelist',
                args: [account.address],
            }
        ]
    });

    useEffect(()=>{
        if(hash)
        {
            setTransactionPending(isPending);
            if(trxType == 1)
                toast.success("Mazze tokens are successfully claimed.");
            else if(trxType == 2)
                toast.success("You bought the MAZZE tokens successfully.");
            setTrxType(0);
            result.refetch();
        }
    }, [isPending]);

    useEffect(()=>{
        let totalHardCap = result1?(result1.data?(result1.data[0].status=='success'?result1.data[0].result:0):0):0;
        setHardCap(parseFloat(formatEther(totalHardCap as bigint)));
    }, [result1]);

    useEffect(()=>{
        let presaleStatus = result?(result.data?(result.data[0].status=='success'?result.data[0].result:0):0):0;
        let buyerHardCap = result?(result.data?(result.data[1].status=='success'?result.data[1].result:0):0):0;
        let totalSoldTokens = result?(result.data?(result.data[2].status=='success'?result.data[2].result:0):0):0;
        let tokenPrice = result?(result.data?(result.data[3].status==='success'?result.data[3].result:0):0):0;
        let isClaimable = result?(result.data?result.data[4].result:false):false;
        let claimableTokens = result?(result.data?(result.data[5].status==='success'?result.data[5].result:0):0):0;
        let userBuyAmount =result?(result.data?(result.data[6].status==='success'?result.data[6].result:0):0):0;
        let isWhitelistEnabled = result?(result.data?result.data[7].result:false):false;
        let whitelist = result?(result.data?result.data[8].result:false):false;

        setTokenClaimable(isClaimable as boolean);

        setPresaleStatus(presaleStatus as number);
        setBuyerHardcap(parseFloat(formatEther(buyerHardCap as bigint)));
        setTotalBuyAmount(parseFloat(formatEther(totalSoldTokens as bigint)));
        setPrice(parseFloat(formatEther(tokenPrice as bigint)));
        setBuyAmount(parseFloat(formatEther(userBuyAmount as bigint)));
        setClaimableTokens(parseFloat(formatEther(claimableTokens as bigint)));
        setBuyable((isWhitelistEnabled as boolean) && (whitelist as boolean) || !(isWhitelistEnabled as boolean));
    }, [result]);

    const onWriteContractError = (error: any) => {
        let errorName = error?.name.toString();
        if (errorName == 'EstimateGasExecutionError')
            toast.error("InsufficientFundsError: The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.");
        else if (errorName == 'TransactionExecutionError')
            toast.error("TransactionExecutionError: User rejected the request.");
        else {
            let errorString = error.toString();
            let errorDesc1 = errorString.split("MAZZEPresale: ");
            if (errorDesc1.length > 1) {
                let errorDesc2 = errorDesc1[1].split("Contract Call:");
                toast.error(errorDesc2[0]);
            }
            else
                toast.error(errorString);
        }
        setTransactionPending(false);
    }
    
    /* ------------------------  For Claim Mazze ------------------------- */
    const claimTokensFn = async () => {
        if (!account.address) return;
        setTransactionPending(true);
        setTrxType(1);
        writePresaleContract({
            abi: PRESALE_ABI,
            address: PRESALE_ADDRESS as `0x${string}`,
            functionName: 'claimTokens',
            args: []
        }, { onError: onWriteContractError });
    };

    /* ------------------------  For Buy Mazze ------------------------- */
    const buyTokensFn = async (amount: string) => {
        if (!account.address) return;
        setTransactionPending(true);
        setTrxType(2);
        writePresaleContract({
            abi: PRESALE_ABI,
            address: PRESALE_ADDRESS as `0x${string}`,
            functionName: 'buyTokensWithETH',
            args: [],
            value: parseEther(amount)
        }, { onError: onWriteContractError });
    };

    return (
        <div className="flex flex-row justify-center pt-[160px] sm:pt-[130px]">
            <div className="w-full max-w-[1440px] px-5 py-9 relative flex flex-col gap-12">
                <div className="flex flex-col items-center gap-12 lg:flex-row">
                    <TimerLayout claimTokensFn={claimTokensFn}/>
                    <BuyLayout buyTokensFn={buyTokensFn} />
                </div>
                <StatsLayout />
            </div>
        </div>
    );
}