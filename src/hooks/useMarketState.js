import { useEffect, useState } from "react"
import { formatEther, formatUnits } from "viem"
import { useChainId, useContractReads } from "wagmi"
import { getContractResult } from "../utils/constants"
import { getBenkeiContract, getBenkeiEthLpContract, getChefContract, getEthPriceFeedContract, getProtectContract, getWethContract } from "../contracts"

const useMarketState = () => {
    const chainId = useChainId()
  
    const [lpTotalSupply, setLpTotalSupply] = useState(0)
    const [benkeiBalanceInChef, setBenkeiBalanceInChef] = useState(0)
    const [lpBalanceInChef, setLpBalanceInChef] = useState(0)
    const [ethBalanceInLp, setEthBalanceInLp] = useState(0)
    const [benkeiBalanceInLp, setBenkeiBalanceInLp] = useState(0)
    const [benkeiBalanceInProtect, setBenkeiBalanceInProtect] = useState(0)
    const [ethPrice, setEthPrice] = useState(0)
  
    const [totalSupply, setTotalSupply] = useState(0)
    const [supplyInVault, setSupplyInVault] = useState(0)
    const [totalLiquidity, setTotalLiquidity] = useState(0)
    const [marketcap, setMarketcap] = useState(0)
    const [totalTvl, setTotalTvl] = useState(0)

    const [fullProtectTvl, setFullProtectTvl] = useState(0)
    const [bigProtectTvl, setBigProtectTvl] = useState(0)
    const [smolProtectTvl, setSmolProtectTvl] = useState(0)
  
    // const ethPrice = useEthPrice()
  
    const {data: contractResult, refetch: refetchContracts} = useContractReads({
      contracts: [
        {
          ...getBenkeiContract(chainId),
          functionName: "totalSupply",
          args: [],
        },
        {
          ...getBenkeiContract(chainId),
          functionName: "balanceOf",
          args: [getChefContract(chainId).address],
        },
        {
          ...getBenkeiEthLpContract(chainId),
          functionName: "balanceOf",
          args: [getChefContract(chainId).address],
        },
        {
          ...getBenkeiContract(chainId),
          functionName: "balanceOf",
          args: [getBenkeiEthLpContract(chainId).address],
        },
        {
          ...getWethContract(chainId),
          functionName: "balanceOf",
          args: [getBenkeiEthLpContract(chainId).address],
        },
        {
          ...getBenkeiEthLpContract(chainId),
          functionName: "totalSupply",
          args: [],
        },
        {
          ...getProtectContract(chainId),
          functionName: "totalStaked",
          args: [],
        },
        {
          ...getEthPriceFeedContract(chainId),
          functionName: "latestAnswer",
          args: [],
        },
      ]
    })
    
    useEffect(() => {
      if(!contractResult) return
  
      const _totalSupply = formatEther(contractResult[0].result)
      const _benkeiBalanceInChef = getContractResult(contractResult[1])
      const _lpBalanceInChef = getContractResult(contractResult[2])
      const _benkeiBalanceInLp = getContractResult(contractResult[3])
      const _ethBalanceInLp = getContractResult(contractResult[4])
      const _lpTotalSupply = getContractResult(contractResult[5])
      const _benkeiBalanceInProtect = getContractResult(contractResult[6])
      const _ethPrice = getContractResult(contractResult[7], 8)
  
      setTotalSupply(_totalSupply)
      setBenkeiBalanceInChef(_benkeiBalanceInChef)
      setLpBalanceInChef(_lpBalanceInChef)
      setBenkeiBalanceInLp(_benkeiBalanceInLp)
      setEthBalanceInLp(_ethBalanceInLp)
      setLpTotalSupply(_lpTotalSupply)
      setBenkeiBalanceInProtect(_benkeiBalanceInProtect)
      setEthPrice(_ethPrice)
  
      if(_benkeiBalanceInLp === 0 || _lpTotalSupply === 0) return
  
      const _benkeiPrice = _ethBalanceInLp * _ethPrice / _benkeiBalanceInLp
      const _totalLiquidity = _ethBalanceInLp * 2 * _ethPrice
  
      setSupplyInVault(_benkeiBalanceInChef + _benkeiBalanceInProtect + _benkeiBalanceInLp * _lpBalanceInChef / _lpTotalSupply)
      setTotalLiquidity(_totalLiquidity)
      setMarketcap(_ethBalanceInLp * _ethPrice / _benkeiBalanceInLp * _totalSupply)
      setTotalTvl((_benkeiBalanceInChef+_benkeiBalanceInProtect) * _benkeiPrice + _totalLiquidity * _lpBalanceInChef / _lpTotalSupply)

      console.log("sniper: _benkeiBalanceInProtect: ", _benkeiBalanceInProtect, _benkeiPrice)
      setFullProtectTvl(_benkeiBalanceInProtect * _benkeiPrice)
      setBigProtectTvl(_totalLiquidity * _lpBalanceInChef / _lpTotalSupply)
      setSmolProtectTvl(_benkeiBalanceInChef * _benkeiPrice)
      // setLockEndedTimeStamp(formatUnits(contractResult[4].result[1], 0))
    }, [contractResult])
  

    return {totalSupply, supplyInVault, totalLiquidity, marketcap, totalTvl, fullProtectTvl, bigProtectTvl, smolProtectTvl,
      benkeiBalanceInChef, lpBalanceInChef, lpTotalSupply, benkeiBalanceInLp, ethBalanceInLp}
}

export default useMarketState