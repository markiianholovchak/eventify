import { Link } from "react-router-dom";

function Logo({ color }) {
	return (
		<Link
			to="/"
			className={`text-3xl font-bold text-${
				color === "dark" ? "dark" : "light"
			} h-max`}
		>
			Event<span className="text-primary">ify</span>
		</Link>
	);
}

export default Logo;
