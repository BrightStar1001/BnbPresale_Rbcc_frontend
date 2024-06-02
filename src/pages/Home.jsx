import React from "react";
import { Link } from "react-router-dom";
import CaelumPaper from "../components/common/CaelumPaper";

function Home() {
  return (
    <>
      <div className="home__container flex flex-col mx-auto items-center">
        <section className="introduction flex flex-col items-center top-padding">
          {/* <div className="title-36 caelum-text1 text-center">Protect your Robocopcoin</div> */}
          <div className="title-64 caelum-text1 text-center my-3">Protect your Robocopcoin</div>
          <div className="title-20 caelum-text1 text-center">The notorious Robocopcoin Cartel are running wild globally and causing a unprecedented Robocopcoin shortage! The Robocopcoin supply decreases rapidly with 0.0001% per block... The only way to protec your Robocopcoin is to put them in the vault.</div>
        </section>

        <section className="mobile-wrap tutorial-items flex w-full gap-10 mt-20">
          <CaelumPaper className="flex flex-col grow">
            <div className="title">Full Protect</div>
            <div className="divider"></div>
            <div className="content">Full protect vault will protect your precious Robocopcoin FULLY and won't be affected by debase. Full protect vault has a locking period of 7 days. The rewards are 0.25 Robocopcoin per block.</div>
            {/* <div className="icons">
              <img src={ethLogo}/>
              <img src={stEthLogo}/>
            </div>
            <div className="bottom-tag">You Give</div> */}
          </CaelumPaper>
          <CaelumPaper className="flex flex-col grow">
            <div className="title">Big Protect</div>
            <div className="divider"></div>
            <div className="content">Big protect vault only protect your Robocopcoin partially in the form of rewards. Big protect vault earns you 9/10 of the rewards by staking Robocopcoin/ETH LP on Uniswap V2. Big protect vault has a locking period of 24 hours. </div>
            {/* <div className="icons">
              <AccessTimeIcon/>
            </div>
            <div className="bottom-tag">Vested over</div> */}
          </CaelumPaper>
          <CaelumPaper className="flex flex-col grow">
            <div className="title">Smol Protect</div>
            <div className="divider"></div>
            <div className="content">Smol protect vault only protect your Robocopcoin partially in the form of rewards. Smol protect vault earns you 1/10 of the rewards by staking Robocopcoin. Smol protect vault has a locking period of 24 hours. </div>
            {/* <div className="icons">
              <img src={calLogo}/>
            </div>
            <div className="bottom-tag">You Get</div> */}
          </CaelumPaper>
        </section>

        <div className="flex justify-center my-20">
          <Link to="/presale" className="mx-2">
            <button className="primary-btn"> Buy $Robocopcoin </button>
          </Link>
          {/* <Link to="/protect">
            <button className="primary-btn"> Protect Your Robocopcoin </button>
          </Link> */}
          <a href="https://docs.Robocopcoin.tech" target="_blank" className="mx-2">
            <button className="primary-btn"> Read the Docs </button>
          </a>
        </div>
        
{/*         
        <section className="w-full  gap-10 justify-center flex-wrap mt-5">
          {HOME_ITEMS.map((x, index) => (
            <HomeItem
              image={x.image}
              title={x.title}
              content={x.content}
              key={index}/>
          ))}
        </section> */}

        {/* <div className="title-64 caelum-text1 mb-10">FAQs</div>
        <section className="flex flex-col gap-2">
          {FAQS.map((x, index) => (
            <FaqItem
              question={x.question}
              answer={x.answer}
              key={index}/>
          ))}
        </section> */}
        
      </div>
    </>
  );
}

export default Home;
