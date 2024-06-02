import React, { useState, useEffect } from "react";
import CaelumPaper from "../components/common/CaelumPaper";
import { Link } from "react-router-dom";
import { getFormattedDisplayNumber } from "../utils/constants";
import useMarketState from "../hooks/useMarketState";

function Market() {
  const {totalSupply, supplyInVault, totalLiquidity, marketcap, totalTvl} = useMarketState()
  return (
    <>
      <div className="market__container flex flex-col items-center">
        <section className="flex flex-col mx-auto top-padding">
          <div className="title-64 caelum-text1 text-center">Robocopcoin Stats</div>
          {/* <div className="title-64 caelum-text1 text-center">{getFormattedDisplayNumber(totalDepositedEther)}</div> */}
        </section>

        <section className="market-items flex flex-col w-full gap-20 justify-center mt-10">
          <CaelumPaper className="flex flex-col w-full gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <div className=" m-auto bg-[#00000030] rounded-xl text-center px-3 py-3 mx-10 my-3">
                <p className="title-20 caelum-text1 mb-3">Total TVL</p>
                <p>${getFormattedDisplayNumber(totalTvl)}</p>
              </div>
              <div className=" m-auto bg-[#00000030] rounded-xl text-center px-3 py-3 mx-10 my-3">
                <p className="title-20 caelum-text1 mb-3">Marketcap(Fully Diluted)</p>
                <p>${getFormattedDisplayNumber(marketcap, 0)}</p>
              </div>
              <div className=" m-auto bg-[#00000030] rounded-xl text-center px-3 py-3 mx-10 my-3">
                <p className="title-20 caelum-text1 mb-3">Total Liquidity</p>
                <p>${getFormattedDisplayNumber(totalLiquidity)}</p>
              </div>
              <div className=" m-auto bg-[#00000030] rounded-xl text-center px-3 py-3 mx-10 my-3">
                <p className="title-20 caelum-text1 mb-3">Total Supply</p>
                <p>{getFormattedDisplayNumber(totalSupply, 0)} Robocopcoin</p>
              </div>
              <div className=" m-auto bg-[#00000030] rounded-xl text-center px-3 py-3 mx-10 my-3">
                <p className="title-20 caelum-text1 mb-3">Supply in Vaults</p>
                <p>{getFormattedDisplayNumber(supplyInVault)} Robocopcoin</p>
              </div>
              <div className=" m-auto bg-[#00000030] rounded-xl text-center px-3 py-3 mx-10 my-3">
                <p className="title-20 caelum-text1 mb-3">Circulating supply</p>
                <p>{getFormattedDisplayNumber(totalSupply - supplyInVault, 0)} Robocopcoin</p>
              </div>
            </div>
          </CaelumPaper>
        </section>

        <section className="flex items-center my-20">
          <Link to="/protect">
            <button className="primary-btn" href="/protect">Protect your Robocopcoin</button>
          </Link>
        </section>
      </div>
    </>
  );
}

export default Market;
