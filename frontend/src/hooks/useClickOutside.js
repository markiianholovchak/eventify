import { useEffect } from "react";
/**
 * @param {RefObject} ref - refference to the container
 * @param {function} callback - function to be executed when clicked outside of the container
 * Sets event listener that executes callback function when clicked outside of container with ref refference
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
