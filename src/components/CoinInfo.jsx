import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

const CoinInfo = ({ coin }) => {
	const [historicData, setHistoricData] = useState();

	const [days, setDays] = useState(1);

	const { currency } = CryptoState();

	const [flag, setflag] = useState(false);

	const fetchHistoricData = async () => {
		const { data } = await axios.get(
			HistoricalChart(coin.id, days, currency)
		);
		setflag(true);
		setHistoricData(data.prices);
	};

	console.log(coin);

	useEffect(() => {
		fetchHistoricData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [days]);

	const darkTheme = createTheme({
		palette: {
			mode: "dark",
		},
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<div
				style={{
					width: "75%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					marginTop: 25,
					padding: 40,
				}}
			>
				{!historicData | (flag === false) ? (
					<CircularProgress
						style={{ color: "gold" }}
						size={250}
						thickness={1}
					/>
				) : (
					<>
						<Line
							data={{
								labels: historicData.map((coin) => {
									let date = new Date(coin[0]);
									let time =
										date.getHours() > 12
											? `${
													date.getHours() - 12
											  }:${date.getMinutes()} PM`
											: `${date.getHours()}:${date.getMinutes()} AM`;
									return days === 1
										? time
										: date.toLocaleDateString();
								}),

								datasets: [
									{
										data: historicData.map(
											(coin) => coin[1]
										),
										label: `Price ( Past ${days} Days ) in ${currency}`,
										borderColor: "#EEBC1D",
									},
								],
							}}
							options={{
								elements: {
									point: {
										radius: 1,
									},
								},
							}}
						/>
						<div
							style={{
								display: "flex",
								marginTop: 20,
								justifyContent: "space-around",
								width: "100%",
							}}
						>
							{chartDays.map((day) => (
								<SelectButton
									key={day.value}
									onClick={() => setDays(day.value)}
									selected={day.value === days}
								>
									{day.label}
								</SelectButton>
							))}
						</div>
					</>
				)}
			</div>
		</ThemeProvider>
	);
};

export default CoinInfo;
