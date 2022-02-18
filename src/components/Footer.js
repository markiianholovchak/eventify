import React from "react";
import Logo from "./Logo";

export default function Footer() {
	return (
		<footer className="sm:px-5 px-2 mb-4">
			<div className="flex justify-between items-center border-b-2 border-b-gray-200 pb-1 sm:px-5 px-2">
				<Logo color="dark" />
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
			</div>
			<div className="text-dark font-extralight text-sm flex justify-center mt-2">
				Copyright 2021 by Eventify | All rights reserved
			</div>
		</footer>
	);
}
