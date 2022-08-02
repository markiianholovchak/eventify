import { useState } from "react";
import useAuthContext from "./useAuthContext";
import useSavedContext from "./useSavedContext";

import axios from "axios";

/**
 * Custom hook to delete item fron saved items in db
 * @returns function del that accepts item's id as a parameter, sends request to delete item to db, updates saved items context
 *  isLoading boolean and error if one occurs
 */
export default function useDelete() {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuthContext();
	const { dispatch } = useSavedContext();

	const del = async (id) => {
		setError(null);
		setIsLoading(true);
		const response = await axios.delete(
			`/api/saved/${id}`,

			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				validateStatus: null,
			}
		);
		if (response.status !== 200) {
			setIsLoading(false);
		}
		if (response.status === 200) {
			// save item to context
			dispatch({ type: "UNSAVE_ITEM", payload: id });

			setIsLoading(false);
		}
	};
	return { del, isLoading, error };
}
