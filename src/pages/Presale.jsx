import React, { useEffect, useRef, useState } from "react";
import CountDown from "../components/chart/CountDown";
import { useAccount, useBalance, useChainId, useContractReads, useContractWrite, useWaitForTransaction } from "wagmi";
import { getContractResult, getErrorMessage, getFormattedDisplayNumber, getFormattedUnits } from "../utils/constants";
import { toast } from "react-toastify";
import { formatEther, parseEther } from "viem";
import { getBenkeiContract, getPresaleContract } from "../contracts";
import { Progress } from 'react-sweet-progress';
import { Web3 } from "web3"
import "react-sweet-progress/lib/style.css";
import BigNumber from "bignumber.js";
import USDTAbi from "../assets/abi/usdtTokenABI.json"
import PresaleContract from "../contracts/presale"

function Presale() {
  const [value, setValue] = useState("");
  const { address } = useAccount();
  const chainId = useChainId()
  const { data: accountBalance } = useBalance({ address, watch: true })
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [softCap, setSoftCap] = useState(0);
  const [hardCap, setHardCap] = useState(0);
  const [minAmount, setMinAmount] = useState(0)
  const [maxAmount, setMaxAmount] = useState(0)
  const [presaleRate, setPresaleRate] = useState(0)
  const [listingRate, setListingRate] = useState(0)
  const [totalDepositedEthAmount, setTotalDepositedEthAmount] = useState(0);
  const [totalSellingTokenAmount, setTotalSellingTokenAmount] = useState(0);
  const [userDepositEthAmount, setUserDepositEthAmount] = useState(0);
  const [counterDeadline, setCounterDeadline] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0)
  const refAmount = useRef(null)
  const token_price = 0.0004

  const web3 = new Web3(window.ethereum)
  const bnbConstant = "BNB";
  const usdtConstant = "USDT";
  const [remainingTime, setRemainingTime] = useState(0);
  const [currencyState, setCurrencyState] = useState(0)
  const [drop, setDrop] = useState(false);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [bnbBalance, setBnbBalance] = useState(0); // New state for BNB balance
  const currencies = ["BNB", "USDT"];
  const decimal = "1000000000000000000";
  const usdt_decimal = "1000000";
  const usdtToken = "0x55d398326f99059ff775485246999027b3197955";
  const usdtContract = new web3.eth.Contract(USDTAbi, usdtToken);
  const [cryptoChange, setCryptoChange] = useState(0);

  const stateText = ["Coming Soon", "Presale is alive", "Presale has ended", "Presale was failed"];
  const btnText = ["Buy", "Buy", "Claim", "Refund"];
  const stateVal = {
    NotOpened: 0,
    Open: 1,
    End: 2,
    Fail: 3
  }
  const [presaleState, setPresaleState] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [txHash, setTxHash] = useState(null)
  const [pendingTx, setPendingTx] = useState(false);

  const { data: contractResult, refetch: refetchContracts } = useContractReads({
    contracts: [
      {
        ...getPresaleContract(chainId),
        functionName: "getRemainingTime",
        args: [],
      },
    ]
  })

  const { data: TotalEthResult, isLoading: loadingT, isRefetching: isRefetchTTT, refetch: refetchTotalDepositedEther } = useContractReads({
    contracts: [
      {
        ...getPresaleContract(chainId),
        functionName: "totalDepositedEth",
        args: [],
      }
    ],
  })

  useEffect(() => {
    if (!contractResult) return
    if(contractResult[0].result != undefined) {
      setRemainingTime(getFormattedUnits(contractResult[0].result));
    }
    else {
      setRemainingTime(0);
    }

  }, [contractResult])

  useEffect(() => {
    if (!TotalEthResult) return
    const _totalDepositedEther = getContractResult(TotalEthResult[0])
    setTotalDepositedEthAmount(_totalDepositedEther)
    if (!contractResult) return
    const _endUnix = endTime * 1000;
    const currentTime = new Date().getTime();
  }, [TotalEthResult, contractResult, softCap, hardCap])

  useEffect(() => {
    if (contractResult) {
      console.log("remainingTime--",remainingTime)
      const timerId = setInterval(() => {
        if (parseInt(remainingTime) > 0) {
          const _remainingTIme = remainingTime * 1000;
          setCounterDeadline(_remainingTIme)
          setPresaleState(stateVal.Open)
        }
        else {
          setCounterDeadline(0)
          setPresaleState(stateVal.End)
        }
      }, 1000);
      return () => {
        clearInterval(timerId);
      }
    }
  }, [contractResult, startTime, endTime])

  const { writeAsync: buyWithBNB } = useContractWrite({
    ...getPresaleContract(chainId),
    functionName: "buyWithBNB",
    onSuccess: (data) => {
      toast.success("Transaction Submitted!")
      setTxHash(data.hash)
    },
    onError: (data) => {
      console.log("+++++::", getErrorMessage(data));
      toast.error(getErrorMessage(data))
      setTxHash(null)
      setPendingTx(false)
    }
  })

  const { writeAsync: buyTokensWithUSDT } = useContractWrite({
    ...getPresaleContract(chainId),
    functionName: "buyTokensWithUSDT",
    onSuccess: (data) => {
      toast.success("Transaction Submitted!")
      setTxHash(data.hash)
    },
    onError: (data) => {
      toast.error(getErrorMessage(data))
      setTxHash(null)
      setPendingTx(false)
    }
  })

  const fetchUsdtBalance = async () => {
    try {
      const balance = await usdtContract.methods.balanceOf(address).call();
      console.log("usdt balance--", balance)
      setUsdtBalance(web3.utils.fromWei(balance, 'mwei')/(10**12)); // USDT has 6 decimals (mwei)
    } catch (error) {
      console.error("Error fetching USDT balance:", error);
      setUsdtBalance(0);
    }
  };

  const fetchBnbBalance = async () => { // New function to fetch BNB balance
    try {
      const balance = await web3.eth.getBalance(address);
      setBnbBalance(web3.utils.fromWei(balance, 'ether'));
    } catch (error) {
      console.error("Error fetching BNB balance:", error);
      setBnbBalance(0);
    }
  };

  useEffect(() => {
    if (address) {
      fetchBnbBalance(); // Fetch BNB balance when address is available
    }
  }, [address]);

  const changeDropState = () => {
    setDrop(!drop);
  }

  const setCurrency = async (idx) => {
    setCurrencyState(idx);
    setDrop(false)
    if (currencies[idx] === usdtConstant) {
      await fetchUsdtBalance();
      setCryptoChange( usdtBalance)
    }
    if (currencies[idx] === bnbConstant) {
      await fetchBnbBalance();
      setCryptoChange(bnbBalance)
    }

    // cryptoChange = currencies[currencyState] == bnbConstant ? usdtBalance : bnbBalance;
   
  }

  const { writeAsync: Claim } = useContractWrite({
    ...getPresaleContract(chainId),
    functionName: "claimRbcc",
    onSuccess: (data) => {
      toast.success("Transaction Submitted!")
      setTxHash(data.hash)
    },
    onError: (data) => {
      toast.error(getErrorMessage(data))
      setTxHash(null)
      setPendingTx(false)
    }
  })

  const { writeAsync: Refund } = useContractWrite({
    ...getPresaleContract(chainId),
    functionName: "claimRefund",
    onSuccess: (data) => {
      toast.success("Transaction Submitted!")
      setTxHash(data.hash)
    },
    onError: (data) => {
      toast.error(getErrorMessage(data))
      setTxHash(null)
      setPendingTx(false)
    }
  })

  const { writeAsync: finishSale } = useContractWrite({
    ...getPresaleContract(chainId),
    functionName: "finishSale",
    onSuccess: (data) => {
      toast.success("Transaction Submitted!")
      setTxHash(data.hash)
    },
    onError: (data) => {
      toast.error(getErrorMessage(data))
      setTxHash(null)
      setPendingTx(false)
    }
  })

  useWaitForTransaction({
    hash: txHash,
    onSuccess: (data) => {
      toast.success("Transaction Success!")
      setTxHash(null)
      refetchTotalDepositedEther()
      setPendingTx(false)
    }
  })

  const handleAction = async () => {
    if (currencies[currencyState] == usdtConstant) {
      if (cryptoChange < 50) {
        toast.success("Minimum order amount is $50!");
        return;
      }
    }else  {
      if (cryptoChange < (50/600)) {
        toast.success("Minimum order amount is $50!")
        return;
      }
    }

    if (presaleState == stateVal.Open) {
      let transferVal = parseFloat(cryptoChange);
      if (!transferVal) return;
      setPendingTx(true)
      if (currencies[currencyState] == bnbConstant) {
        const val = BigNumber(cryptoChange).multipliedBy(decimal);
        buyWithBNB({
          args: [],
          from: address,
          value: val
        });
      }
      else {
        const val = BigNumber(cryptoChange).multipliedBy(usdt_decimal);
        const tx = await usdtContract.methods.approve(PresaleContract.address[chainId], val).send({
          from: address
        })
        buyTokensWithUSDT({
          args: [val],
          from: address
        });
      }
    } else if (presaleState == stateVal.End) {
      setPendingTx(true)
      Claim({
        args: [],
        from: address
      });
    } else if (presaleState == stateVal.Fail) {
      setPendingTx(true)
      Refund({
        args: [],
        from: address
      })
    }
  }

  const setInputMax = () => {
    // if (!accountBalance) {
    //   cryptoChange = 0
    //   return
    // }
    // cryptoChange = Number(accountBalance.formatted) > 0.01 ? accountBalance.formatted - 0.01 : 0
    // setInputValue(cryptoChange)
    // cryptoChange = currencies[currencyState] == bnbConstant ? bnbBalance : usdtBalance;
    setCryptoChange(currencies[currencyState] == bnbConstant ? bnbBalance : usdtBalance)
  }

  const changeValue = (e) => {
    const val = e.target.value;
    console.log(val);
    if (currencies[currencyState] == bnbConstant){
      if (parseFloat(val) > bnbBalance){
        toast.error("Balance is " + bnbBalance);
        return;
      }
      
    }else {
      if (parseFloat(val) > usdtBalance){
        toast.error("Balance is " + usdtBalance);
        return;
      }
    }
    setCryptoChange(parseFloat(val));
    // cryptoChange = parseFloat(val);
  }
  console.log("----render")
  return (
    <>
      <div className="flex flex-col items-center mint__container">
        <section className="flex flex-col gap-5 mx-auto top-padding">
          <div className="text-center title-64 caelum-text1">Welcome to Robocopcoin Presale</div>
          <div className="title-20 text-center text-[#add8e6]">Robocopcoin plays a crucial role in our project ecosystem. By participating in our Robocopcoin presale, you can secure a portion of Robocopcoin at a discounted price. These tokens will grant you access to various features and benefits within our platform.</div>
        </section>
        <section className="w-full top-padding md:flex items-center justify-center gap-[1vw] md:gap-[10vw] md:!mt-[60px] !mt-[60px] flex flex-wrap">
          <div className="caelum-paper py-[20px] px-[50px] mb-[30px] !border-[#fff] w-[530px]">
            <div className="flex items-center justify-between w-full mb-3">
              <div className="text-center title-20 caelum-text1">Presale Rate</div>
              <div className="title-20"> 0.0004 USDT / Rbcc</div>
            </div>
            <div className="flex items-center justify-between w-full mb-3">
              <div className="text-center title-20 caelum-text1">Listing Rate</div>
              <div className="title-20"> 0.0008 USDT / Rbcc</div>
            </div>
            <div className="flex items-center justify-between w-full mb-3">
              <div className="text-center title-20 caelum-text1">Min Contribution</div>
              <div className="title-20">50 USDT</div>
            </div>
            <div className="flex items-center justify-between w-full mb-3">
              <div className="text-center title-20 caelum-text1">Max Contribution</div>
              <div className="title-20">10000 USDT</div>
            </div>
            <div className="flex items-center justify-between w-full mb-3">
              <div className="text-center title-20 caelum-text1">Initial Supply</div>
              <div className="title-20">3,000,000,000 Rbcc</div>
            </div>
            <div className="flex items-center justify-between w-full mb-3">
              <div className="text-center title-20 caelum-text1">Tokens For Presale</div>
              <div className="title-20">1,000,000,000 Rbcc</div>
            </div>
          </div>
        </section>
        <section className="w-full top-padding md:flex items-center justify-center gap-[1vw] md:gap-[10vw] md:!mt-[60px] !mt-[60px] flex flex-wrap">
          <div className="caelum-paper py-[20px] px-[50px] mb-[30px] !border-[#fff] w-[530px]">
            <section className="w-full">
              <div className="mb-8 text-center title-36">{contractResult ? stateText[presaleState] : "Loading..."}</div>
              <CountDown end={counterDeadline} />
            </section>
            {/* <section className="w-full pt-[30px] md:pt-[50px]">
              <Progress
                className="max-w-[500px] m-auto my-3 text-[#add8e6]"
                strokeWidth={5}
                percent={softCap === 0 || hardCap === 0 ? 0 :
                  totalDepositedEthAmount <= softCap ? getFormattedDisplayNumber(totalDepositedEthAmount * 100 / softCap, 2) :
                    totalDepositedEthAmount > hardCap ? 100 : getFormattedDisplayNumber(totalDepositedEthAmount * 100 / hardCap, 2)}
                status="active"
              />
              <div className="text-right">Raised: {getFormattedDisplayNumber(totalDepositedEthAmount)} BNB</div>
            </section> */}
            {presaleState === stateVal.Open && <div className="md:!mt-[50px] !mt-[30px]">
              <section className="">
                <div className="border border-[#fff] rounded-[28px] text-[16px] md:text-[18px] p-[20px]">
                  <div className="flex items-center justify-between">
                    <div >Amount</div>
                    <div className="flex items-center justify-center gap-3">
                      <div >Balance: {currencyState === 1 ? usdtBalance : bnbBalance}</div>
                      <div className="font-bold text-[#d49c44] cursor-pointer" onClick={() => setInputMax()}>MAX</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between ">
                    <input
                      type="number"
                      inputMode="decimal"
                      placeholder="0.00"
                      className="h-full w-full mt-[25px] md:mt-[20px] text-[30px] md:text-[26px] pr-[20px] bg-transparent"
                      // ref={refAmount}
                      value={cryptoChange}
                      onChange={changeValue}
                      disabled={presaleState != stateVal.Open}
                    />
                    <div className="flex items-center justify-center gap-3 mt-[30px] relative">
                      <div className="font-bold cursor-pointer" onClick={changeDropState}>{currencies[currencyState]}</div>
                      {drop &&
                        <div className="flex flex-col right-[-1px] absolute top-[105%] w-[auto] z-5 block h-[auto] bg-[#212121] mt-2 border-[1px] rounded-b-xl overflow-hidden">
                          {currencies.map((currency, idx) => {
                            return (
                              <div className="flex cursor-pointer justify-end p-3 hover:bg-[#111111bb]" onClick={() => setCurrency(idx)}  >{currency}</div>
                            )
                          })}
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </section>
              {cryptoChange !== 0 && !isNaN(cryptoChange) && (
                <div className="flex items-center justify-center">
                  <span className="mt-5">
                    You will be able to claim {currencies[currencyState] !== "USDT" ? (cryptoChange * 600 / token_price) : (cryptoChange / token_price)} Robocopcoin
                  </span>
                </div>
              )}
            </div>}
            <section className="flex flex-col items-center justify-center w-full top-padding">
              {presaleState === stateVal.End && <div>
                <div className="pb-5">You can claim {getFormattedDisplayNumber(userDepositEthAmount * presaleRate)} Robocopcoin</div>
              </div>}
              <button
                className="!h-auto w-full max-w-[140px] primary-btn text-center !text-[18px] !py-[15px]"
                disabled={presaleState == stateVal.NotOpened || pendingTx}
                onClick={handleAction}
              >
                {pendingTx && <div className="presale-loader"></div>}
                {btnText[presaleState]}
              </button>
            </section>
          </div>
        </section>
      </div>
    </>
  );
}

export default Presale;
