import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

import { useAccount, useNetwork, useSwitchNetwork, useDisconnect, useBalance } from "wagmi";

import { Divider } from "@mui/material";
import { CheckCircle, Logout } from "@mui/icons-material";

import { useAuthState } from "../context/AuthContext";
import { useResponsiveView } from "../utils/customHooks"

import logo from "../assets/logo/logo.png"
import ArrowDown from "../assets/icons/ArrowDown";
import MenuMore from "../assets/icons/MenuMore";
import TwitterIcon from "../assets/icons/twitter.png"
import TelegramIcon from "../assets/icons/telegram.png"

import SwitchTheme from "./SwitchTheme";
import MobileMenu from "./Mobilemenu";
import WalletConnect from "./modal/WalletConnect";
import { getFormattedDisplayAddress, getFormattedDisplayNumber } from "../utils/constants";

function Header(props) {
  const { authState } = useAuthState();
  const navigate = useNavigate();

  const isMobileView_900 = useResponsiveView(900);
  const isMobileView_1024 = useResponsiveView(1024);

  const MAIN_MENU = [
    {path: "/", name: "Presale"},   
    // {path: "/dashboard", name: "Dashboard"},
    // {path: "/protect", name: "Protect"},
    // {path: "/presale", name: "Presale"},
    // {path: "https://docs.Robocopcoin.tech", name: "Read the Docs"},
    // {path: "/big-protect", name: "Market"},
    // {path: "/earn", name: "Earn"},
  ]

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
    const info = chains.find((x) => { return x.id === chain.id })
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

  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenuOpen = () => setMenuOpen(true);
  const handleMenuClose = () => setMenuOpen(false);

  const [walletOpen, setWalletOpen] = useState(false);
  const handleWalletOpen = () => setWalletOpen(true);
  const handleWalletClose = () => setWalletOpen(false);

  const handleBackdrop = () => {
    setNetOpen(false)
    setAccountOpen(false)
  }

  return (
    <header className={`header ${authState.preferDark ? "dark-theme" : ""} text-white bg-[#212121] flex items-center py-2 px-4 md:px-20  mx-auto gap-2`}>
      <div className="logo flex-grow" onClick={() => { navigate('/') }}>
        <Link to="/home" className="flex items-center gap-2 text-[#add8e6]">
          <img src={logo} alt="logo" width="60px" />
          <span>Robocopcoin</span>
          {/* {!isMobileView_1024 && <h2 className="">Robocopcoin</h2>} */}
        </Link>
      </div>

      {/* <div className="flex flex-grow">
        <SwitchTheme />
      </div> */}

      {/* {!isMobileView_900 && (
        <div className="main-menu flex gap-6 items-center">
          {MAIN_MENU.map((menu, key) => (
            <Link className={(menu.path === location.pathname ? 'active' : '')} to={menu.path} key={key}>{menu.name}</Link>
          ))}
        </div>
      )} */}

      {/* <div className="flex gap-2 mx-5">
        <div>
          <a href="https://x.com/Benkei_ETH" target="_blank">
            <img src={TwitterIcon} alt="twitter icon" width={20}></img>
          </a>
        </div>
        <div>
          <a href="https://t.me/benkei_eth" target="_blank">
            <img src={TelegramIcon} alt="telegram icon" width={20}></img>
          </a>
        </div>
      </div> */}

      {!isMobileView_900 && (
        <div className="buttons flex gap-2 items-center ml-3">
          {/* <button className="btn-mainnet flex items-center" onClick={handleNetClick} disabled={!address}>
            {activeNet ? (
              <span>{activeNet.name}</span>
            ) : (
              <span>Wrong Network</span>
            )}
            <ArrowDown />
          </button> */}
          {address ? (
            <button className="primary-btn flex items-center" onClick={handleAccountClick}>
              <span className="text-center">{getFormattedDisplayAddress(address)}</span>
              <ArrowDown color="white"/>
            </button>
          ) : (
            <button className="primary-btn text-center" onClick={handleWalletOpen}>Connect</button>
          )}
        </div>
      )}

      {isMobileView_900 && (
        <button className="flex gap-6 items-center" onClick={handleMenuOpen}>
          <MenuMore color={authState.preferDark ? "#FFFFFF" : "#2D2D2D"} />
        </button>
      )}

      <div className="relative" hidden={!menuOpen}>
        <MobileMenu
          menus={MAIN_MENU}
          handleWalletOpen={handleWalletOpen}
          handleMenuClose={handleMenuClose} />
      </div>

      <div className="main-network-menu" hidden={!netOpen}>
        {chains.map((x, key) => (
          <div key={key}>
            <button onClick={() => { handleChangeNet(x.id) }}>
              <span className="flex-grow">{x.name}</span>
              {chain && chain.id === x.id && <CheckCircle />}
            </button>
            <Divider />
          </div>
        ))}
      </div>

      <div className="main-account-menu" hidden={!accountOpen}>
        <button className="flex justify-between items-center" onClick={handleAccountClick}>
          <div className="space-y-1">
            <div className="flex-grow">{getFormattedDisplayAddress(address)}</div>
            <div className="flex-grow">{getFormattedDisplayNumber(data? data.formatted : 0)} ETH</div>
          </div>
          <CheckCircle />
        </button>
        <Divider />
        <button onClick={handleDisconnect}>
          <Logout />
          <span className="ml-3">Disconnect</span>
        </button>
      </div>

      {/* <div className="backdrop fixed top-0 left-0 w-full h-full" hidden={!netOpen && !accountOpen} onClick={handleBackdrop}></div> */}

      {walletOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center" onClick={handleWalletClose}>
          <WalletConnect
            handleWalletClose={handleWalletClose} />
        </div>
      )}

      {/* <div className="wallet-connect fixed w-full top-0 left-0" hidden={!walletOpen}>
          <WalletConnect 
            handleWalletClose={handleWalletClose}/>
      </div> */}

    </header>
  )
}

export default Header;