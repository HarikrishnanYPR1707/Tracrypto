import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../config/api";

const Carousel = () => {
  // State for managing trending coins
  const [trending, setTrending] = useState([]);

  // Taking the context of the the currency
  const { currency, setCurrency } = CryptoState();

  // Function for fetching trending coins
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    // Setting the trending state to data
    setTrending(data);
  };

  console.log(trending);

  // Calling the function when this component is rendered
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

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
