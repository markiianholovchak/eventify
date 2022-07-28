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
		const response = await axios.post("/api/user/login", { email, password });
		if (response.status !== 200) {
			setIsLoading(false);
		}
		if (response.status === 200) {
			// Save user to local storage
			localStorage.setItem("user", JSON.stringify(response.data));

			dispatch({ type: "LOGIN", payload: response.data });

			setIsLoading(false);
		}
	};
	return { login, isLoading, error };
}
