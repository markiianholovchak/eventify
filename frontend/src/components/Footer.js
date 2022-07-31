import Logo from "./Logo";
import useAuthContext from "../hooks/useAuthContext";

export default function Footer() {
	const { user } = useAuthContext();
	return (
		<footer className="sm:px-5 px-2 mb-4 font-main">
			<div className="flex justify-between items-center border-b-2 border-b-gray-200 pb-1 sm:px-5 px-2">
				<Logo color="dark" />
				{!user && (
					<ul className="text-dark text-base font-semibold grid grid-cols-3 gap-4">
						<li className="hover:text-primary cursor-pointer transitin-all duration-300">
							Log In
						</li>
						<li className="hover:text-primary cursor-pointer transitin-all duration-300">
							Sign Up
						</li>
						<li className="hover:text-primary cursor-pointer transitin-all duration-300">
							About
						</li>
					</ul>
				)}
				{user && (
					<ul className="text-dark text-base font-semibold grid grid-cols-3 gap-4">
						<li className="hover:text-primary cursor-pointer transitin-all duration-300">
							Account
						</li>
						<li className="hover:text-primary cursor-pointer transitin-all duration-300">
							Saved
						</li>
						<li className="hover:text-primary cursor-pointer transitin-all duration-300">
							About
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
