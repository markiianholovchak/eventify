import { useEffect } from "react";
/**
 *  Executes callback function when clicked outside of container with ref refference
 */
const useClickOutside = (ref, callback) => {
	const handleClick = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClick, true);

		return () => {
			document.removeEventListener("click", handleClick, true);
		};
	});
};

export default useClickOutside;
