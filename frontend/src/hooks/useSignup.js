import { useState } from "react";
import axios from "axios";
export default function useSignup() {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const signup = async (email, password) => {
		setError(null);
		setIsLoading(true);
		const response = await axios.post("/api/user/signup", { email, password });
		if (response.status !== 200) {
			setIsLoading(false);
		}
		if (response.status === 200) {
			// Save user to local storage
			localStorage.setItem("user", JSON.stringify(response.data));

			setIsLoading(false);
		}
	};
	return { signup, isLoading, error };
}
