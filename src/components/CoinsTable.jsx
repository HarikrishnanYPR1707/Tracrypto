import axios from "axios";
import React, { useState } from "react";
import CoinList from "../config/api";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList);
  };

  return <div>Coins Table</div>;
};

export default CoinsTable;
