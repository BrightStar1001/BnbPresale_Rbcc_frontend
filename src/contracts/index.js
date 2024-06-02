import BenkeiContract from "./benkei"
import ChefContract from "./chef"
import ProtectContract from "./protect"
import WethContract from "./weth"
import PresaleContract from "./presale"
import BenkeiEthLpContract from "./benkei_eth_lp"
import { Default_Chain_Id, supportChains } from "../Wagmi"
import EthPriceFeed from "./ethPriceFeed"

const getChainId = (chainId) => {
    let _chainId = Default_Chain_Id
    if(supportChains.map((item) => item.id).includes(chainId)) {
        _chainId = chainId
    }
    return _chainId
}

export const getBenkeiContract = (chainId) => {
    let _chainId = getChainId(chainId)
    return {
        address: BenkeiContract.address[_chainId],
        abi: BenkeiContract.abi,
        chainId: _chainId
    }
}

export const getChefContract = (chainId) => {
    let _chainId = getChainId(chainId)
    return {
        address: ChefContract.address[_chainId],
        abi: ChefContract.abi,
        chainId: _chainId
    }
}

export const getProtectContract = (chainId) => {
    let _chainId = getChainId(chainId)
    return {
        address: ProtectContract.address[_chainId],
        abi: ProtectContract.abi,
        chainId: _chainId
    }
}

export const getWethContract = (chainId) => {
    let _chainId = getChainId(chainId)
    return {
        address: WethContract.address[_chainId],
        abi: WethContract.abi,
        chainId: _chainId
    }
}

export const getBenkeiEthLpContract = (chainId) => {
    let _chainId = getChainId(chainId)
    return {
        address: BenkeiEthLpContract.address[_chainId],
        abi: BenkeiEthLpContract.abi,
        chainId: _chainId
    }
}

export const getPresaleContract = (chainId) => {
    let _chainId = getChainId(chainId)
    return {
        address: PresaleContract.address[_chainId],
        abi: PresaleContract.abi,
        chainId: _chainId
    }
}

export const getEthPriceFeedContract = (chainId) => {
    let _chainId = getChainId(chainId)
    return {
        address: EthPriceFeed.address[_chainId],
        abi: EthPriceFeed.abi,
        chainId: _chainId
    }
}
