import { useState, useEffect, useRef } from "react";

const useVisible = (initialVisible) => {
	const [isVisible, setIsVisible] = useState(initialVisible);
	const ref = useRef(null);
	const handleClick = (e) => {
		console.log("event triggered");
		if (ref.current && !ref.current.contains(e.target)) {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClick, true);

		return () => {
			document.removeEventListener("click", handleClick, true);
		};
	});
	return { ref, isVisible, setIsVisible };
};

export default useVisible;
