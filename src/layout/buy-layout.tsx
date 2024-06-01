import { Icon, IconType } from "@/components/icons";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { usePresaleInfoStore } from "@/store/presaleInfo";
import { useAccount, useBalance } from "wagmi";

type Props = {
  buyTokensFn: (amount: string) => void;
}

export default function BuyLayout({ buyTokensFn }: Props) {
  const account = useAccount()

  const buyable = usePresaleInfoStore((state) => state.buyable);
  const presaleStatus = usePresaleInfoStore((state) => state.presaleStatus);
  const transactionPending = usePresaleInfoStore((state) => state.transactionPending);
  const buyAmount = usePresaleInfoStore((state) => state.buyAmount);
  const trxType = usePresaleInfoStore((state) => state.trxType);

  const BUYER_HARDCAP = usePresaleInfoStore((state) => state.BUYER_HARDCAP);
  const PRICE_PER_TOKEN = usePresaleInfoStore((state) => state.PRICE_PER_TOKEN);

  const [ethBalance, setEthBalance] = useState(0);

  const { data, isError, isLoading } = useBalance({
    address: account.address,
    })

  const onBuyToken = async () => {
    if (ethBalance > BUYER_HARDCAP) {
      toast.warning("Please check ETH balance again.");
      return;
    }
    buyTokensFn(ethBalance.toString());
  };

  const onMaxButton = async ()=> {
    let max = Math.min(parseFloat(data ? (data.formatted ? data.formatted : "0") : "0"), BUYER_HARDCAP);
    setEthBalance(max);
  }

  return (
    <div className="backdrop-blur-[2.5px] w-full h-[520px] sm:h-96 max-w-[700px] rounded-lg bg-[#a3a7bf]/[.03] px-8 sm:px-12 py-8 flex flex-col gap-3 sm:gap-5 border-[#ffa2001f] border transition_box">
      <div className="font-['inter'] detail-text small border-[#fff]/[.15] border-b">PRESALE AMOUNT</div>
      <span className="font-inter font-bold text-[white] text-sm sm:text-lg">
        Please Enter the MAZZE Amount to Buy
      </span>
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <div className="h-32 w-full rounded-[8px] bg-[#a3a7bf]/[.03] flex flex-col justify-between px-3 py-3 shadow-[0_0_50px_0_#00000010] border-[#ffa2001f] border">
          <div className="font-inter text-sm text-[white] flex flex-row items-center justify-between">
            <span className="font-bold">From</span>
          </div>
          <div>
            <button className="font-inter font-bold bg-[#ffa200] text-[black] text-[9px] px-2 py-2 pt-[12px] rounded-md hover:text-[#ffa200] hover:bg-[#44361f] border-[#ffa200] border"
              onClick={onMaxButton}
            >
              MAX
            </button>
          </div>
          <div className="flex flex-row items-center justify-between">
            <input
              type="number"
              value={ethBalance}
              onChange={(e) => {
                setEthBalance(Number(e.target.value));
              }}
              className="w-full h-10 outline-none px-2 font-inter font-bold text-[white] text-xl bg-transparent"
            />
            <div className="w-44 h-10 px-2 pr-3 py-1 flex flex-row items-center justify-between rounded-lg bg-[#c1cfd7]">
              <img alt="eth" src="/images/eth.png" className="h-full" />
              <span className="font-inter font-bold text-[black] text-sm">
                ETH
              </span>
            </div>
          </div>
        </div>
        <Icon
          type={IconType.RIGHT}
          className="w-10 h-10 fill-[#ffffff80] min-w-10 rotate-90 sm:rotate-0 px-1"
        />
        <div className="h-32 w-full rounded-[8px] bg-[#a3a7bf]/[.03] flex flex-col justify-between px-3 py-3 shadow-[0_0_50px_0_#00000010] border-[#ffa2001f] border">
          <div className="font-inter text-sm text-[white] flex flex-row items-center justify-between">
            <span className="font-bold">To</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span
              className="w-full h-10 outline-none px-2 font-inter font-bold text-[white] text-xl bg-transparent"
            >
              {Math.round(ethBalance / PRICE_PER_TOKEN)}
            </span>
            <div className="w-44 h-10 px-2 pr-3 py-1 flex flex-row items-center justify-between rounded-lg bg-[#c1cfd7]">
              <img alt="eth" src="/images/mazze.png" className="h-[25px]" />
              <span className="font-inter font-bold text-[black] text-sm">
                MAZZE
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center font-inter font-normal text-[white] text-xs sm:text-sm">
        <span className="text-center">
          Payable amount of your wallet is {Math.round((BUYER_HARDCAP - buyAmount)*10**18)/10**18} ETH.
        </span>
      </div>
      <div className="flex flex-row justify-center">
        <button
          className={
            buyable && presaleStatus == 1 && !transactionPending
            ? `px-5 py-3 w-80 bg-[#ffa200] rounded-md text-[black] font-inter sm:text-sm text-xs font-bold hover:text-[#ffa200] hover:bg-[#44361f] border-[#ffa200] border`
            : "flex gap-[10px] justify-center items-center px-5 py-3 w-80 bg-[#ffa200] rounded-md text-[gray] font-inter sm:text-sm text-xs font-bold border-[#ffa200] border"
          }
          onClick={onBuyToken}
          disabled={!(buyable && presaleStatus == 1 && !transactionPending)}
        >
          BUY MAZZE
          {transactionPending && trxType == 2 && (
          <Icon type={IconType.LOADING} className="w-14 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
