import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAuthState } from "./context/AuthContext";
import { changeColor } from "./utils/constants";

import Header from "./components/Header";

import Home from "./pages/Home"
import Market from "./pages/Market"
import Staking from "./pages/Staking"

import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import Presale from "./pages/Presale";

function App() {
  const { authState } = useAuthState();

  useEffect(() => {

      changeColor("--toastify-color-light", "#212121");
      changeColor("--toastify-text-color-light", "#fff");
  }, [authState.preferDark]);
  
  return (
  <>
    <ToastContainer autoClose={3000} />

    <div className="main__header">
      <Header />
    </div>

    <div className="main__background">
      <div></div>
      <div></div>
    </div>

    <div className="main__content">
      <Presale></Presale>
      {/* <Routes> */}
        {/* <Route path="/" element={<Presale />}></Route> */}
        {/* <Route path="/" element={<Home />}></Route> */}
        {/* <Route path="/dashboard" element={<Market />}></Route> */}
        {/* <Route path="/protect" element={<Staking />}></Route> */}
        {/* <Route path="/presale" element={<Presale />}></Route>  */}
        {/* <Route path="/mint" element={<Mint />}></Route> */}
        {/* <Route path="/earn" element={<Earn />}></Route> */}
      {/* </Routes> */}
    </div>
  </>
  );
}

export default App;
