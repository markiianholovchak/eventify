function Logo({ color }) {
	return (
		<div
			className={`text-3xl font-bold text-${
				color === "dark" ? "dark" : "white"
			}`}
		>
			Event<span className="text-primary">ify</span>
		</div>
	);
}

export default Logo;
