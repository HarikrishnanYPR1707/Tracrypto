import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../config/api";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  // State for managing trending coins
  const [trending, setTrending] = useState([]);

  // Taking the context of the the currency
  const { currency, symbol } = CryptoState();

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

  // Mapping trending data to items
  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      // Adding link to go to different page
      <Link
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        }}
        to={`/coins/${coin.id}`}
      >
        {/* adding image of the fetched coin */}
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{
            marginBottom: 10,
          }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    1012: {
      items: 5,
    },
  };

  return (
    <div
      style={{
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
