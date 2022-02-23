import { useState, useEffect } from "react";
import axios from "axios";

/**
 *
 * @param {string} url - url from which data should be fetched
 * @returns data: object with retrieved data if request was successful
 *          isLoading = true if request is being processed, false if request has ended
 *          error: null if no error, otherwise error message
 */

export default function useFetch(url) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const resp = await axios.get(url);

				setData(Object.values(resp.data._embedded)[0]);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);
	return [data, isLoading, error];
}
