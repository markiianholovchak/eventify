/**
 *
 * @param {String} type - primary | secondary
 * @param {String} text - Text to be displayed
 * @param {boolean} isDisabled - true | false - disables button while pending request
 * @param {function} onClick - function to be executed on button click
 * @returns <button> element styled accordingly to type provided
 */
export default function CustomButton({ type, text, isDisabled, onClick }) {
	const primaryButtonStyles = "text-light bg-primary";
	const secondaryButtonStyles =
		"text-primary  hover:text-light hover:bg-primary ";
	return (
		<button
			disabled={isDisabled}
			onClick={onClick}
			className={`text-lg  font-semibold inline-block  px-8 py-1 rounded-md border-2 border-primary ${
				type === "primary" ? primaryButtonStyles : secondaryButtonStyles
			} transition-all duration-200 active:scale-95 h-max`}
		>
			{text}
		</button>
	);
}
