import { Link } from "react-router-dom";
import Logo from "./Logo";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

export default function Footer() {
	const { user } = useAuthContext();
	const { logout } = useLogout();

	const handleLogout = () => {
		logout();
	};
	return (
		<footer className="sm:px-10 px-5 mb-4 font-main">
			<div className="flex justify-between items-center border-b-2 border-b-gray-200 pb-1 sm:px-5 px-2">
				<Logo color="dark" />
				{!user && (
					<ul className="text-dark text-base font-semibold grid grid-cols-2 gap-4">
						<li>
							<Link
								to="/login"
								className="hover:text-primary cursor-pointer transitin-all duration-300"
							>
								Log in
							</Link>
						</li>
						<li>
							<Link
								to="/signup"
								className="hover:text-primary cursor-pointer transitin-all duration-300"
							>
								Sign up
							</Link>
						</li>
					</ul>
				)}
				{user && (
					<ul className="text-dark text-base font-semibold grid grid-cols-3 gap-4">
						<li>
							<Link
								to="/"
								className="hover:text-primary cursor-pointer transitin-all duration-300"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/saved"
								className="hover:text-primary cursor-pointer transitin-all duration-300"
							>
								Saved
							</Link>
						</li>
						<li
							className="hover:text-primary cursor-pointer transitin-all duration-300"
							onClick={handleLogout}
						>
							Logout
						</li>
					</ul>
				)}
			</div>
			<div className="text-dark font-extralight text-sm flex justify-center mt-2">
				&copy; {new Date().getFullYear()} by Eventify | All rights reserved
			</div>
		</footer>
	);
}
