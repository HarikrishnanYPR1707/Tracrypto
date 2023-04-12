import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";

const CoinPage = () => {
	// Getting the id from the url
	const { id } = useParams;

	// creating state for coin
	const [coin, setCoin] = useState();

	// bringing ' currency ' and ' symbol ' from cryptoState context
	const { currency, symbol } = CryptoState();

	// fetching the particular coin
	const fetchCoin = async () => {
		const { data } = await axios.get(SingleCoin(id));

		setCoin(data);
	};

	// calling the fetchCoin function
	useEffect(() => {
		fetchCoin();
	}, []);

	return <div>Coin Page</div>;
};

export default CoinPage;
