import {
  Container,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { CoinList } from "../config/api";

const CoinsTable = () => {
  // State for coins
  const [coins, setCoins] = useState([]);

  // State for loading
  const [loading, setLoading] = useState(false);

  // Destructuring the currency from CryptoContext
  const { currency } = CryptoState();

  // Creating a functoin for fetching the list of coins
  const fetchCoins = async () => {
    setLoading(true);

    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  console.log(coins);

  // Calling the function when this component is rendered
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  // DarkTheme using themeProvider
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    // using themeProvider for dark theme
    <ThemeProvider theme={darkTheme}>
      <Container
        style={{
          textAlign: "center",
        }}
      >
        {/* Header for coinsTable */}
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Price by Market Cap
        </Typography>
        {/* Adding serach field */}
        <TextField
          label="Search for a Crypto Currency.."
          variant="outlined"
          style={{
            marginBottom: 20,
            width: "100%",
          }}
        ></TextField>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
