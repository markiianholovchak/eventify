import { useEffect } from "react";

const useClickOutside = (ref, callback) => {
	const handleClick = (e) => {
		console.log("event captured");
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
