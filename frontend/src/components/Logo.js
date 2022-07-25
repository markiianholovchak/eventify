import { Link } from "react-router-dom";
/**
 *
 * @param {string} color - dark | light
 * @returns Logo component in dark or light color
 */
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
