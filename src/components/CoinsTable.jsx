import axios from "axios";
import React, { useState } from "react";
import CoinList from "../config/api";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    setLoading(true);

    const { data } = await axios.get(CoinList);

    setCoins(data);
    setLoading(false);
  };

  return <div>Coins Table</div>;
};

export default CoinsTable;
