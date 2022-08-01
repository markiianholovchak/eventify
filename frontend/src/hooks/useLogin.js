import { useState } from "react";
import useAuthContext from "./useAuthContext";

import axios from "axios";

export default function useLogin() {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		setError(null);
		setIsLoading(true);
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
			validateStatus: null,
		};
		const data = {
			email,
			password,
		};
		const response = await axios.post("/api/user/login", data, config);
		if (response.status !== 200) {
			setError(response.data.error);
			setIsLoading(false);
		}
		if (response.status === 200) {
			// Save user to local storage
			localStorage.setItem("user", JSON.stringify(response.data));
			setError(null);
			setIsLoading(false);

			dispatch({ type: "LOGIN", payload: response.data });
		}
	};
	return { login, isLoading, error };
}
