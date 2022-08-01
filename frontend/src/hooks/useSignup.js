import { useState } from "react";
import useAuthContext from "./useAuthContext";

import axios from "axios";
export default function useSignup() {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { dispatch } = useAuthContext();

	const signup = async (email, password) => {
		setError(null);
		setIsLoading(true);
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const data = {
			email,
			password,
		};
		const response = await axios.post("/api/user/signup", data, config);
		if (response.status !== 200) {
			setIsLoading(false);
		}
		if (response.status === 200) {
			// Save user to local storage
			localStorage.setItem("user", JSON.stringify(response.data));

			setIsLoading(false);
			dispatch({ type: "LOGIN", payload: response.data });
		}
	};
	return { signup, isLoading, error };
}
