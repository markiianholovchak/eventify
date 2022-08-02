import { Link } from "react-router-dom";

/**
 *
 * @param {String} type - primary | secondary
 * @param {String} text - text to be displayed in the link
 * @param {String} url - destination of the link
 * @returns Link component styled accordingly to type provided
 */
export default function CustomLink({ type, text, url = "/" }) {
	const primaryLinkStyles = "text-light bg-primary";
	const secondaryLinkStyles =
		"text-primary  hover:text-light hover:bg-primary ";
	return (
		<Link
			to={url}
			className={`text-lg  font-semibold inline-block  px-8 py-1 rounded-md border-2 border-primary ${
				type === "primary" ? primaryLinkStyles : secondaryLinkStyles
			} transition-all duration-200 active:scale-95 h-max`}
		>
			{text}
		</Link>
	);
}
