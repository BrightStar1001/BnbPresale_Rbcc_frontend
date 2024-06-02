import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/main.scss";
import { AuthStateProvider } from "./context/AuthContext";

import { config } from './Wagmi';
import { WagmiConfig } from 'wagmi';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthStateProvider>
        <WagmiConfig config={config}>
          <App />
        </WagmiConfig>
      </AuthStateProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
