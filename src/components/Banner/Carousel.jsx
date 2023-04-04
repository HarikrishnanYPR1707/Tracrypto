import axios from "axios";
import React, { useState } from "react";
import { TrendingCoins } from "../../config/api";

const Carousel = () => {
  // State for managing trending coins
  const [trending, setTrending] = useState([]);

  // Taking the context of the the currency
  const { currency, setCurrency } = CryptoState();

  // function for fetching trending coins
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
