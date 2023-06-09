import React from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import CryptoContext from "./CryptoContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CryptoContext>
      <App />
    </CryptoContext>
  </React.StrictMode>
);
