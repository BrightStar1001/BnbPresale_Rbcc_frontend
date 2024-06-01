import React from "react";
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <div className="flex flex-row justify-center fixed w-full z-50">
      <div className="w-full max-w-[1440px] px-5 py-9 relative">
        <div className="backdrop-blur-[2.5px] w-full sm:h-20 rounded-lg bg-[#a3a7bf]/[.03] px-2 sm:px-12 py-8 flex flex-row gap-4 sm:gap-6 border-[#ffa2001f] border items-center md:justify-between justify-between">
          <div className="flex-row items-bottom sm:flex">
            <img alt="logo" src="/images/mazzeblockchain.svg" className="h-[40px] pr-3" />
            <span className="font-['inter'] text-[white] text-xl font-normal pt-3 pl-16 sm:pl-3">
              PRESALE
            </span>
          </div>
        </div>
        <div className="absolute top-0 flex flex-row items-center h-full right-5 sm:right-16" style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 12,
        }}>
          <ConnectButton chainStatus="none"/>
        </div>
      </div>
    </div>
  );
}
