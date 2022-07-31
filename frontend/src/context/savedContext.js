import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import useAuthContext from "../hooks/useAuthContext";
export const SavedContext = createContext();

const savedReducer = (state, action) => {
	switch (action.type) {
		case "SET_ITEMS":
			return { savedItems: [...action.payload] };
		case "SAVE_ITEM":
			return { savedItems: [...state.savedItems, action.payload] };
		case "UNSAVE_ITEM":
			return {
				savedItems: state.savedItems.filter(
					(savedItem) => savedItem.id !== action.payload
				),
			};
		default:
			return state;
	}
};

export const SavedContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(savedReducer, { savedItems: [] });
	const { user } = useAuthContext();
	useEffect(() => {
		const getSavedItems = async () => {
			try {
				const response = await axios.get("/api/saved", {
					headers: {
						Authorization: `Bearer: ${user.token}`,
					},
				});
				dispatch({ type: "SET_ITEMS", payload: response.data.savedItems });
			} catch (error) {
				console.log(error);
			}
		};
		if (user) {
			getSavedItems();
		}
	}, [user]);
	return (
		<SavedContext.Provider value={{ ...state, dispatch }}>
			{children}
		</SavedContext.Provider>
	);
};
