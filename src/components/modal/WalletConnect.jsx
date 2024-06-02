import { useAccount, useConnect } from "wagmi"

import Metamask from "../../assets/icons/wallet-metamask.png"
import Wallet from "../../assets/icons/wallet-walletconnect.png"
import Coinbase from "../../assets/icons/wallet-coinbase.png"

function WalletConnect(props) {
  const { connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      onSettled(data, error) {
        if (error) {
          console.log("Failed to connect: ", error)
        }
        props.handleWalletClose()
      }
    })

  const handleMetamask = () => {  
    if (isConnected) {
      return
    }
    connect({connector: connectors[0]})
  }

  const handleWallet = () => {  
    if (isConnected) {
      return
    }
    connect({connector: connectors[2]})
  }

  const handleCoinbase = () => {  
    if (isConnected) {
      return
    }
    connect({connector: connectors[1]})
  }

  return (
    <>
      <div className="absolute w-full h-full bg-[#1818188c] top-0" onClick={props.handleWalletClose}>
      </div>
      <div className="wallet-connect flex">
        <div className="item meta w-full" onClick={handleMetamask}>
          <div className="icon"><img src={Metamask}/></div>
          <div className="label">Metamask</div>
        </div>
        <div className="item wallet w-full" onClick={handleWallet}>
          <div className="icon"><img src={Wallet}/></div>
          <div className="label">Walletconenct</div>
        </div>
        <div className="item base w-full" onClick={handleCoinbase}>
          <div className="icon"><img src={Coinbase}/></div>
          <div className="label">Coinbase</div>
        </div>
      </div>
    </>
  )
}

export default WalletConnect;