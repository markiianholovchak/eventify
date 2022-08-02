import useAuthContext from "./useAuthContext";

/**
 * Custom hook to logout user
 * @returns logout function that updates local storage and removes user from auth context
 */
export default function useLogout() {
	const { dispatch } = useAuthContext();

	const logout = () => {
		localStorage.removeItem("user");
		dispatch({ type: "LOGOUT" });
	};
	return { logout };
}
