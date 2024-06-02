import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAccount, useNetwork, useSwitchNetwork, useDisconnect, useBalance } from "wagmi";

import { useAuthState } from "../context/AuthContext";

import CloseIcon from '@mui/icons-material/Close';
import { Divider } from "@mui/material";
import { CheckCircle, Logout } from "@mui/icons-material";

import ArrowDown from "../assets/icons/ArrowDown";

function MobileMenu(props) {
  const { authState } = useAuthState()

  const { address } = useAccount()
  const { chain } = useNetwork()
  const { chains, switchNetwork } = useSwitchNetwork()
  const { disconnect } = useDisconnect({
    onSuccess(data) {
      console.log('Disconnected ', data)
    }
  })
  const { data, refetch } = useBalance({
    address,
    watch: true,
  })

  const [activeNet, setActiveNet] = useState(null)
  useEffect(() => {
    if (!chain) {
      setActiveNet(null)
      return
    }
    const info = chains.find((x) => {return x.id === chain.id})
    setActiveNet(info)
  }, [chain])

  const [netOpen, setNetOpen] = useState(false)
  const handleNetClick = (event) => {
    setAccountOpen(false)
    setNetOpen((previousOpen) => !previousOpen)
  }
  
  const [accountOpen, setAccountOpen] = useState(false)
  const handleAccountClick = (event) => {
    setNetOpen(false)
    setAccountOpen((previousOpen) => !previousOpen)
  }

  const handleClose = () => {
    setNetOpen(false)
    setAccountOpen(false)
    props.handleMenuClose()
  }

  const handleChangeNet = (id) => {
    if (chain.id !== id) {
      switchNetwork(id)
    }
    setNetOpen(false)
  }

  const handleDisconnect = () => {
    disconnect()
    setAccountOpen(false)
  }

  const showAddress = () => {
    if (!address || address.length < 42) return 'Invalid address.'
    let res = address.substr(0, 6) + '...' + address.substr(-4)
    if (data) {
      let val = parseInt(parseFloat(data.formatted)*100)/100
      res += `(${val} ${data.symbol})`
    }
    return res
  }

  return (
    <>
      <div className="w-full h-full fixed top-0 left-0" onClick={handleClose}>
      </div>
      <div className="mobile-menu">
        <div className="flex flex-col gap-2">
          {props.menus.map((menu, key) => (
            <div key={key}>
              <Link onClick={handleClose} className={(menu.path===location.pathname?'active':'')} to={menu.path}>{menu.name}</Link>
              <div className="divider h-0 m-0"></div>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {/* <button className="btn-mainnet flex items-center w-full mt-3" onClick={handleNetClick} disabled={!address}>
            {activeNet ? (
              <span>{activeNet.name}</span>
            ):(
              <span>Wrong Network</span>
            )}
            <ArrowDown />
          </button> */}
          {address?(
            <button className="primary-btn flex items-center w-full mt-3" onClick={handleAccountClick}>
              <span>{showAddress()}</span>
              <ArrowDown />
            </button>
          ):(
            <button className="primary-btn w-full mt-10" onClick={props.handleWalletOpen}>Connect</button>
          )}
        </div>

        <button className="fixed top-5 right-5" onClick={handleClose}>
          <CloseIcon className="btn-close"/>
        </button>

        <div className="network-menu" hidden={!netOpen}>
          {chains.map((x, key) => (
            <div key={key}>
              <button onClick={() => {handleChangeNet(x.id)}}>
                <span className="flex-grow">{x.name}</span>
                {chain && chain.id === x.id && <CheckCircle/>}
              </button>
              <Divider/>
            </div>
          ))}
        </div>

        <div className="account-menu" hidden={!accountOpen}>
          <button onClick={handleAccountClick}>
            <span className="flex-grow">{showAddress()}</span>
            <CheckCircle/>
          </button>
          <Divider/>
          <button onClick={handleDisconnect}>
            <Logout />
            <span className="ml-3">Disconnect</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default MobileMenu;