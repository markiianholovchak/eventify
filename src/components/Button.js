export default function Button({ type, text }) {
	const primaryButtonStyles = "text-white bg-primary";
	const secondaryButtonStyles =
		"text-primary  hover:text-white hover:bg-primary ";
	return (
		<a
			href="/"
			className={`text-lg  font-semibold inline-block  px-8 py-1 rounded-md border-2 border-primary ${
				type === "primary" ? primaryButtonStyles : secondaryButtonStyles
			} transition-all duration-200 active:scale-95`}
			onClick={(e) => e.preventDefault()}
		>
			{text}
		</a>
	);
}
