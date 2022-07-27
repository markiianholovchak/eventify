export default function Button({
	type,
	text,
	onClick = (e) => e.preventDefault(),
}) {
	const primaryButtonStyles = "text-light bg-primary";
	const secondaryButtonStyles =
		"text-primary  hover:text-light hover:bg-primary ";
	return (
		<button
			onClick={onClick}
			className={`text-lg  font-semibold inline-block  px-8 py-1 rounded-md border-2 border-primary ${
				type === "primary" ? primaryButtonStyles : secondaryButtonStyles
			} transition-all duration-200 active:scale-95 h-max`}
		>
			{text}
		</button>
	);
}
