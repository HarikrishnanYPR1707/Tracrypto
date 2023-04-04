import axios from "axios";
import React from "react";
import { TrendingCoins } from "../../config/api";

const Carousel = () => {
  const { currency, setCurrency } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
  };

  return (
    <div
      style={{
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      Carousel Here
    </div>
  );
};

export default Carousel;
