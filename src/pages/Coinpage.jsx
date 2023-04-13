import { LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";

export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Coinpage = () => {
	// creating id variable for fetching the coin name from the url
	const { id } = useParams();

	// creating coin state for managing the coins
	const [coin, setCoin] = useState();

	// Destructuring for having ' currency ' and ' symbol ' from CryptoState context
	const { currency, symbol } = CryptoState();

	// Functoin for fetching the coin information
	const fetchCoin = async () => {
		const { data } = await axios.get(SingleCoin(id));

		setCoin(data);
	};

	console.log(id);

	console.log(coin);

	// calling the function while the component is rendered
	useEffect(() => {
		fetchCoin();
	}, []);

	// giving a linear progress if the coin is not loaded
	if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

	return (
		<div
			style={{
				display: "flex",
			}}
		>
			{/* sidebar */}
			<div
				style={{
					width: "30%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					marginTop: 25,
					borderRight: "2px solid grey",
				}}
			>
				<img
					src={coin?.image.large}
					alt={coin?.name}
					height="200"
					style={{ marginBottom: 20 }}
				/>
				<Typography
					variant="h3"
					style={{
						fontWeight: "bold",
						marginBottom: 20,
						fontFamily: "Montserrat",
					}}
				>
					{coin?.name}
				</Typography>
				<Typography
					variant="subtitle1"
					style={{
						width: "100%",
						fontFamily: "Montserrat",
						padding: 25,
						paddingBottom: 15,
						paddingTop: 0,
						textAlign: "justify",
					}}
				>
					{coin?.description.en.split(". ")[0]}.
				</Typography>
				<div style={{}}>
					{/* for rank of the crypto */}
					<span style={{ display: "flex" }}>
						<Typography
							variant="h5"
							style={{
								fontWeight: "bold",
								marginBottom: 20,
								fontFamily: "Montserrat",
							}}
						>
							Rank:
						</Typography>
						&nbsp; &nbsp;
						<Typography
							variant="h5"
							style={{
								fontFamily: "Montserrat",
							}}
						>
							{numberWithCommas(coin?.market_cap_rank)}
						</Typography>
					</span>
					{/* for current price of the crypto */}
					<span style={{ display: "flex" }}>
						<Typography
							variant="h5"
							style={{
								fontWeight: "bold",
								marginBottom: 20,
								fontFamily: "Montserrat",
							}}
						>
							Current Price:
						</Typography>
						&nbsp; &nbsp;
						<Typography
							variant="h5"
							style={{
								fontFamily: "Montserrat",
							}}
						>
							{symbol}{" "}
							{numberWithCommas(
								coin?.market_data.current_price[
									currency.toLowerCase()
								]
							)}
						</Typography>
					</span>
					{/* for market cap of the crypto */}
					<span style={{ display: "flex" }}>
						<Typography
							variant="h5"
							style={{
								fontWeight: "bold",
								marginBottom: 20,
								fontFamily: "Montserrat",
							}}
						>
							Market Cap:
						</Typography>
						&nbsp; &nbsp;
						<Typography
							variant="h5"
							style={{
								fontFamily: "Montserrat",
							}}
						>
							{symbol}{" "}
							{numberWithCommas(
								coin?.market_data.market_cap[
									currency.toLowerCase()
								]
									.toString()
									.slice(0, -6)
							)}
							M
						</Typography>
					</span>
				</div>
			</div>
			{/* chart */}
			<CoinInfo coin={coin} />
		</div>
	);
};

export default Coinpage;
