import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

import CustomButton from "./CustomButton";
import Button from "./CustomLink";
import Logo from "./Logo";

export default function Navbar({ color = "light" }) {
	const { user } = useAuthContext();
	const { logout } = useLogout();
	const handleLogout = () => {
		logout();
	};
	return (
		<nav className="px-4 flex justify-between  ">
			<Logo color={color === "light" ? "light" : "dark"} />
			<div>
				{!user && <Button type="primary" text="Log In" url="/login" />}
				{user && (
					<ul
						className={`flex ${
							color === "light" ? "text-white" : "text-dark"
						} items-center text-lg `}
					>
						<li className="font-bold mr-4">Hello, {user.email}</li>
						<li className="font-light mr-4">Account</li>
						<li className="font-light mr-4">
							<Link to="/saved">Saved</Link>
						</li>
						<li>
							<CustomButton
								type="secondary"
								text="Log out"
								onClick={handleLogout}
							/>
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
}
