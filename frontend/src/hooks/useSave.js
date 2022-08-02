import { useState } from "react";
import useAuthContext from "./useAuthContext";
import useSavedContext from "./useSavedContext";

import axios from "axios";

/**
 * Custom hook to save item to db
 * @returns function save that accepts item object to be saved in db, sends request to save item to db, updates saved items context
 *  isLoading boolean and error if one occurs
 */
export default function useSave() {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuthContext();
	const { dispatch } = useSavedContext();

	const save = async (item) => {
		setError(null);
		setIsLoading(true);
		const response = await axios.post("/api/saved", item, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
			validateStatus: null,
		});
		if (response.status !== 200) {
			setIsLoading(false);
			setError(response.data);
		}
		if (response.status === 200) {
			// save item to context
			dispatch({ type: "SAVE_ITEM", payload: response.data.savedItem });

			setError(null);
			setIsLoading(false);
		}
	};
	return { save, isLoading, error };
}
