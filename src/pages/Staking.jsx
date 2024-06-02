import React, { useState, useEffect } from "react";

import { useAccount, useChainId, useContractReads, useContractWrite, useWaitForTransaction } from "wagmi";

import { getContractResult, getFormattedDisplayNumber, getFormattedDisplayAddress, getErrorMessage } from "../utils/constants";
import { calEthLpLogo, causdUsdtLpLogo } from "../assets/data";
import StakingModal from "../components/modal/StakingModal";
import { parseEther } from "viem";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import FullProtect from "../components/FullProtect";
import BigProtect from "../components/BigProtect";
import SmolProtect from "../components/SmolProtect";

function Staking() {
  const MODAL_DATA = [
    {type: 1,token: "CAL/ETH LP", title: "Stake CAL/ETH LP", action: "Stake", actionTitle: "Stake CAL/ETH LP"},
    {type: 2,token: "CAL/ETH LP", title: "Unstake CAL/ETH LP", action: "Unstake", actionTitle: "Unstake CAL/ETH LP"},
    {type: 3,token: "caUSD/USDC LP", title: "Stake caUSD/USDC LP", action: "Stake", actionTitle: "Stake caUSD/USDC LP"},
    {type: 4,token: "caUSD/USDC LP", title: "Unstake caUSD/USDC LP", action: "Unstake", actionTitle: "Unstake caUSD/USDC LP"},
  ]

  const {address} = useAccount()
  const chainId = useChainId()
  const [totalStaked1, setTotalStaked1] = useState(0)
  const [staked1, setStaked1] = useState(0)
  const [rewards1, setRewards1] = useState(0)
  const [apr1, setApr1] = useState(0)
  const [totalStaked2, setTotalStaked2] = useState(0)
  const [staked2, setStaked2] = useState(0)
  const [rewards2, setRewards2] = useState(0)
  const [apr2, setApr2] = useState(0)
  const [lpBalance1, setLpBalance1] = useState(0)
  const [lpBalance2, setLpBalance2] = useState(0)

  const [txHash, setTxHash] = useState(null)
  const [pendingTx, setPendingTx] = useState(false)
  const [pendingClaimTx1, setPendingClaimTx1] = useState(false)
  const [pendingClaimTx2, setPendingClaimTx2] = useState(false)

  // const handleClick = (type) => {
  //   let data = MODAL_DATA[type-1]
  //   if(type == 1) {
  //     data.max = lpBalance1
  //   } else if(type == 2) {
  //     data.max = staked1
  //   } else if(type == 3) {
  //     data.max = lpBalance2
  //   } else {
  //     data.max = staked2
  //   }
  //   setModalData(data)
  //   setModalOpen(true)
  // }

  // const {data: contractResult, refetch: refetchContracts} = useContractReads({
  //   contracts: [
  //     {
  //       ...getStakingContract1(chainId),
  //       functionName: "totalSupply",
  //       args: [],
  //     },
  //     {
  //       ...getStakingContract1(chainId),
  //       functionName: "balanceOf",
  //       args: [address],
  //     },
  //     {
  //       ...getStakingContract1(chainId),
  //       functionName: "earned",
  //       args: [address],
  //     },
  //     {
  //       ...getStakingContract2(chainId),
  //       functionName: "totalSupply",
  //       args: [],
  //     },
  //     {
  //       ...getStakingContract2(chainId),
  //       functionName: "balanceOf",
  //       args: [address],
  //     },
  //     {
  //       ...getStakingContract2(chainId),
  //       functionName: "earned",
  //       args: [address],
  //     },
  //     {
  //       ...getCalEthLpContract(chainId),
  //       functionName: "balanceOf",
  //       args: [address],
  //     },
  //     {
  //       ...getCausdUsdtLpContract(chainId),
  //       functionName: "balanceOf",
  //       args: [address],
  //     },
  //     {
  //       ...getCaelumHelperContract(chainId),
  //       functionName: "getStakingPoolAPR",
  //       args: [getStakingContract1(chainId).address, getCalContract(chainId).address, getCalEthLpContract(chainId).address],
  //     },
  //     {
  //       ...getCaelumHelperContract(chainId),
  //       functionName: "getStakingPoolAPR",
  //       args: [getStakingContract2(chainId).address, getCalContract(chainId).address, getCalEthLpContract(chainId).address],
  //     },
  //   ]
  // })
  // const {writeAsync: stake1} = useContractWrite({
  //   ...getStakingContract1(chainId),
  //   functionName: 'stake',
  //   onSuccess: (data) => {
  //     toast.success("Transaction Submitted!")
  //     setTxHash(data.hash)
  //   },
  //   onError: (data) => {
  //     toast.error(getErrorMessage(data))
  //     setTxHash(null)
  //     setPendingTx(false)
  //   }
  // })
  // const {writeAsync: unstake1} = useContractWrite({
  //   ...getStakingContract1(chainId),
  //   functionName: 'withdraw',
  //   onSuccess: (data) => {
  //     toast.success("Transaction Submitted!")
  //     setTxHash(data.hash)
  //   },
  //   onError: (data) => {
  //     toast.error(getErrorMessage(data))
  //     setTxHash(null)
  //     setPendingTx(false)
  //   }
  // })
  // const {writeAsync: claimVeCAL1} = useContractWrite({
  //   ...getStakingContract1(chainId),
  //   functionName: 'getReward',
  //   onSuccess: (data) => {
  //     toast.success("Transaction Submitted!")
  //     setTxHash(data.hash)
  //   },
  //   onError: (data) => {
  //     toast.error(getErrorMessage(data))
  //     setTxHash(null)
  //     setPendingClaimTx1(false)
  //   }
  // })
  // const {writeAsync: stake2} = useContractWrite({
  //   ...getStakingContract2(chainId),
  //   functionName: 'stake',
  //   onSuccess: (data) => {
  //     toast.success("Transaction Submitted!")
  //     setTxHash(data.hash)
  //   },
  //   onError: (data) => {
  //     toast.error(getErrorMessage(data))
  //     setTxHash(null)
  //     setPendingTx(false)
  //   }
  // })
  // const {writeAsync: unstake2} = useContractWrite({
  //   ...getStakingContract2(chainId),
  //   functionName: 'withdraw',
  //   onSuccess: (data) => {
  //     toast.success("Transaction Submitted!")
  //     setTxHash(data.hash)
  //   },
  //   onError: (data) => {
  //     toast.error(getErrorMessage(data))
  //     setTxHash(null)
  //     setPendingTx(false)
  //   }
  // })
  // const {writeAsync: claimVeCAL2} = useContractWrite({
  //   ...getStakingContract2(chainId),
  //   functionName: 'getReward',
  //   onSuccess: (data) => {
  //     toast.success("Transaction Submitted!")
  //     setTxHash(data.hash)
  //   },
  //   onError: (data) => {
  //     toast.error(getErrorMessage(data))
  //     setTxHash(null)
  //     setPendingClaimTx2(false)
  //   }
  // })

  // useWaitForTransaction({
  //   hash: txHash,
  //   onSuccess: (data) => {
  //     toast.success("Transaction Success!")
  //     setTxHash(null)
  //     setPendingTx(false)
  //     setPendingClaimTx1(false)
  //     setPendingClaimTx2(false)
  //     setModalOpen(false)
  //     console.log("refetch contracts...")
  //     refetchContracts()
  //   }
  // })
  // useEffect(() => {
  //   if (!contractResult) return
  //   setTotalStaked1(getContractResult(contractResult[0]))      // balanceOf caUSD
  //   setStaked1(getContractResult(contractResult[1])) // total caUSD Circulation
  //   setRewards1(getContractResult(contractResult[2])) // total caUSD Circulation
  //   setTotalStaked2(getContractResult(contractResult[3]))      // balanceOf caUSD
  //   setStaked2(getContractResult(contractResult[4])) // total caUSD Circulation
  //   setRewards2(getContractResult(contractResult[5])) // total caUSD Circulation
  //   setLpBalance1(getContractResult(contractResult[6])) // total caUSD Circulation
  //   setLpBalance2(getContractResult(contractResult[7])) // total caUSD Circulation
  //   setApr1(getContractResult(contractResult[8], 4)) // total caUSD Circulation
  //   setApr2(getContractResult(contractResult[9], 4)) // total caUSD Circulation
  // }, [contractResult])

  const handleAction = async (type, value) => {
    // try {
    //   setPendingTx(true)
    //   if(type == 1) {
    //     const txHash = await stake1({
    //       args: [parseEther(value.toString())]
    //     })
    //   } else if(type == 2) {
    //     const txHash = await unstake1({
    //       args: [parseEther(value.toString())]
    //     })
    //   } else if(type == 3) {
    //     const txHash = await stake2({
    //       args: [parseEther(value.toString())]
    //     })
    //   } else if(type == 4) {
    //     const txHash = await unstake2({
    //       args: [parseEther(value.toString())]
    //     })
    //   }
    // } catch (error) {
    //   console.log(error)
    //   setPendingTx(false)
    // }
  }

  // const handleClaim = async (type) => {
  //   try {
  //     if(type == 1) {
  //       setPendingClaimTx1(true)
  //       const txHash = await claimVeCAL1({
  //         args: []
  //       })
  //     } else {
  //       setPendingClaimTx2(true)
  //       const txHash = await claimVeCAL2({
  //         args: []
  //       })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     setPendingClaimTx1(false)
  //     setPendingClaimTx2(false)
  //   }
  // }

  return (
    <>
      <div className="staking__container flex flex-col items-center">
        <section className="flex flex-col mx-auto top-padding">
          <div className="title-64 caelum-text1 text-center">Protect</div>
          <div className="title-20 caelum-text1 text-center">0.25 Robocopcoin per block</div>
        </section>

        <section className="w-full m-auto top-padding">
          <FullProtect />
          <BigProtect />
          <SmolProtect />
        </section>

      </div>
    </>
  );
}

export default Staking;
