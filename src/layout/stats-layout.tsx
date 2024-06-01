import React from "react";
import { usePresaleInfoStore } from "@/store/presaleInfo";

export default function StatsLayout() {
  const totalBuyAmount = usePresaleInfoStore((state) => state.totalBuyAmount);
  const buyAmount = usePresaleInfoStore((state) => state.buyAmount);

  const TOKEN_PRESALE_HARDCAP = usePresaleInfoStore((state) => state.TOKEN_PRESALE_HARDCAP);
  const BUYER_HARDCAP = usePresaleInfoStore((state) => state.BUYER_HARDCAP);
  const PRICE_PER_TOKEN = usePresaleInfoStore((state) => state.PRICE_PER_TOKEN);

  const buyerTokenHardcap = BUYER_HARDCAP;

  return (
    <div className="flex flex-col items-center gap-8">
      <span className="text-center font-bold font-inter text-base sm:text-lg text-[orange]">
        With A Presale Price Of{" "}
        {PRICE_PER_TOKEN.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 9,
        })}{" "}
        ETH. Our Maximum Limit Will Be {BUYER_HARDCAP} ETH. See Our Whitepaper For Further Details.
      </span>
      <div className="flex flex-col items-center justify-between w-full gap-5 sm:flex-row sm:gap-12">
        <div />
        <ProcessBar
          label="Presale Amount processed"
          value={Math.floor(((totalBuyAmount) * 100) / TOKEN_PRESALE_HARDCAP) > 100 ? 100 : Math.floor(((totalBuyAmount) * 100) / TOKEN_PRESALE_HARDCAP)}
        />
        <ProcessBar
          label="Your Hard Cap Amount"
          value={Math.floor(((buyAmount) * 100) / buyerTokenHardcap) > 100 ? 100 : Math.floor(((buyAmount) * 100) / buyerTokenHardcap)}
        />
        <div />
      </div>
      <div className="flex flex-col items-center justify-between w-full gap-5 sm:flex-row font-inter">
        <div />
        <div className="flex flex-col items-center sm:items-start">
          <span className="font-normal text-sm text-[white]">
            Presale Amount Received:
          </span>
          <span className="font-normal text-base text-[white]">
            {(totalBuyAmount).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}{" "}
            MAZZE
          </span>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <span className="font-normal text-sm text-[white]">
            Maximum Presale Amount Allocated:
          </span>
          <span className="font-normal text-base text-[white]">
            {TOKEN_PRESALE_HARDCAP.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}{" "}
            MAZZE
          </span>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <span className="font-normal text-sm text-[white]">
          MAZZE Price:
          </span>
          <span className="font-normal text-base text-[white]">
            {PRICE_PER_TOKEN.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 9,
            })}{" "}
            ETH
          </span>
        </div>
        <div />
      </div>
    </div>
  );
}

interface ProcessBarProps {
  label: string;
  value: number;
}

const ProcessBar: React.FC<ProcessBarProps> = ({ label, value }) => {
  return (
    <div className="relative flex flex-col items-center w-full font-inter">
      <div className="w-full flex flex-row items-end justify-between font-bold text-base text-[gray]">
        <div />
        <div className="flex flex-col items-center w-1">
          <span>25%</span>
          <div className="w-1 h-4 bg-[#000000]" />
        </div>
        <div className="flex flex-col items-center w-1">
          <span>50%</span>
          <div className="w-1 h-4 bg-[#000000]" />
        </div>
        <div className="flex flex-col items-center w-1">
          <span>75%</span>
          <div className="w-1 h-4 bg-[#000000]" />
        </div>
        <div />
      </div>
      <div className="w-full h-5 sm:h-7 rounded-full bg-[#cccccc] overflow-hidden">
        <div
          className="h-full bg-[#d00711]"
          style={{
            width: `${value}%`,
          }}
        ></div>
      </div>
      <div
        className="absolute w-0.5 h-0.5 flex flex-row items-center justify-center top-8"
        style={{
          left: `${value}%`,
        }}
      >
        <div className="min-w-11 min-h-11 rounded-full bg-[#e97000] flex flex-row items-center justify-center">
          <span className="font-bold text-base text-[#ffffff]">{value}%</span>
        </div>
      </div>
      <span className="mt-4 font-bold text-base sm:text-xl text-[white] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
};
