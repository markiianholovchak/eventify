import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context) {
		throw Error("useAuthContext must be used inside the AuthContextProvider");
	}
	return context;
}
