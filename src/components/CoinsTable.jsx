import {
	Container,
	LinearProgress,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	ThemeProvider,
	Typography,
	createTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { CoinList } from "../config/api";

export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
	// Creating a variable for navigation
	const history = useNavigate();

	// State for coins
	const [coins, setCoins] = useState([]);

	// State for loading
	const [loading, setLoading] = useState(false);

	// State for searching
	const [search, setSearch] = useState();

	// Destructuring the currency from CryptoContext
	const { currency, symbol } = CryptoState();

	// Creating state for pagination
	const [page, setPage] = useState(1);

	// Creating a functoin for fetching the list of coins
	const fetchCoins = async () => {
		setLoading(true);

		const { data } = await axios.get(CoinList(currency));

		setCoins(data);
		setLoading(false);
	};

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

	// Adding a function for handling search
	const handleSearch = () => {
		return coins.filter(
			(coin) =>
				coin.name.toLowerCase().includes(search) ||
				coin.symbol.toLowerCase().includes(search)
		);
	};

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
					onChange={(e) => setSearch(e.target.value)}
				/>
				{/* Adding table section */}
				<TableContainer>
					{loading ? (
						<LinearProgress style={{ backgroundColor: "gold" }} />
					) : (
						// Adding a table
						<Table>
							{/* Adding a table head */}
							<TableHead style={{ backgroundColor: "#EEBC1D" }}>
								{/* Adding a header row */}
								<TableRow>
									{[
										"Coin",
										"Price",
										"24h Change",
										"Market Cap",
									].map((head) => (
										<TableCell
											style={{
												color: "Black",
												fontWeight: "700",
												fontFamily: "Montserrat",
											}}
											key={head}
											align={
												head === "Coin"
													? "left"
													: "right"
											}
										>
											{head}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							{/* Adding table body */}
							<TableBody>
								{handleSearch()
									.slice(
										(page - 1) * 10,
										(page - 1) * 10 + 10
									)
									.map((row) => {
										const profit =
											row.price_change_percentage_24h > 0;

										return (
											<TableRow
												onClick={() =>
													history(`/coins/${row.id}`)
												}
												style={{
													backgroundColor: "#16171a",
													cursor: "pointer",
													"&:hover": {
														backgroundColor:
															"#131111",
													},
													fontFamily: "Montserrat",
												}}
												key={row.name}
											>
												<TableCell
													component="th"
													scope="row"
													style={{
														display: "flex",
														gap: 15,
													}}
												>
													{/* Image of the crypto which is in that row/cell */}
													<img
														src={row?.image}
														alt={row.name}
														height="50"
														style={{
															marginBottom: 10,
														}}
													/>
													{/* Adding symbol and name of the crypto */}
													<div
														style={{
															display: "flex",
															flexDirection:
																"column",
														}}
													>
														{/* Adding symbol of the crypto of the a particular cell */}
														<span
															style={{
																textTransform:
																	"uppercase",
																fontSize: 22,
															}}
														>
															{row.symbol}
														</span>
														{/* Adding name of the crypto of the a particular cell */}
														<span
															style={{
																color: "darkgray",
															}}
														>
															{row.name}
														</span>
													</div>
												</TableCell>
												{/* Adding a table cell for price of the crypto */}
												<TableCell align="right">
													{symbol}{" "}
													{numberWithCommas(
														row.current_price.toFixed(
															2
														)
													)}
												</TableCell>
												<TableCell
													align="right"
													style={{
														color:
															profit > 0
																? "rgb(14, 203, 129)"
																: "red",
														fontWeight: 500,
													}}
												>
													{profit && "+"}
													{row.price_change_percentage_24h.toFixed(
														2
													)}
													%
												</TableCell>
												<TableCell align="right">
													{symbol}{" "}
													{numberWithCommas(
														row.market_cap
															.toString()
															.slice(0, -6)
													)}
													M
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					)}
				</TableContainer>
				<Pagination
					count={(handleSearch()?.length / 10).toFixed(0)}
					style={{
						padding: 20,
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
					onChange={(_, value) => {
						setPage(value);
						window.scroll(0, 450);
					}}
				/>
			</Container>
		</ThemeProvider>
	);
};

export default CoinsTable;
