import { mainnet, goerli} from "wagmi/chains";

export const IS_PRODUCT_MODE = false // TODO

export const mainnetChains = [mainnet]

export const testnetChains = [goerli]

export const global = {
    chain: IS_PRODUCT_MODE ? mainnetChains : testnetChains,
    PROJECT_ID: 'c278a3db8eed101935395863b318fff7',
    PROJECT: 'Launchpad',
    Decimals: 18
}