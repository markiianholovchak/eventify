import { Link } from "react-router-dom";

export default function CustomLink({ type, text, url = "/" }) {
	const primaryButtonStyles = "text-light bg-primary";
	const secondaryButtonStyles =
		"text-primary  hover:text-light hover:bg-primary ";
	return (
		<Link
			to={url}
			className={`text-lg  font-semibold inline-block  px-8 py-1 rounded-md border-2 border-primary ${
				type === "primary" ? primaryButtonStyles : secondaryButtonStyles
			} transition-all duration-200 active:scale-95 h-max`}
		>
			{text}
		</Link>
	);
}
