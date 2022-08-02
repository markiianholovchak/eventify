import { useState } from "react";
import useAuthContext from "./useAuthContext";

import axios from "axios";

/**
 * Custom hook to sign up user
 * @returns function signup that accepts email and password as parameters, sends request to sign up to backend, updates auth context
 * isLoading boolean and error if one occurs
 */
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
			validateStatus: null,
		};
		const data = {
			email,
			password,
		};
		const response = await axios.post("/api/user/signup", data, config);
		if (response.status !== 200) {
			setIsLoading(false);
			setError(response.data.error);
		}
		if (response.status === 200) {
			// Save user to local storage
			localStorage.setItem("user", JSON.stringify(response.data));

			setIsLoading(false);
			setError(null);
			dispatch({ type: "LOGIN", payload: response.data });
		}
	};
	return { signup, isLoading, error };
}
