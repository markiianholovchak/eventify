import { useContext } from "react";
import { SavedContext } from "../context/savedContext";

export default function useSavedContext() {
	const context = useContext(SavedContext);
	if (!context) {
		throw Error("useSavedContext must be used inside the SavedContextProvider");
	}
	return context;
}
