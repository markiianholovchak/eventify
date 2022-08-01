import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

import Button from "./CustomLink";
import Logo from "./Logo";

export default function Navbar({ color = "light" }) {
	const [isVisible, setIsVisible] = useState(false);
	const { user } = useAuthContext();
	const { logout } = useLogout();

	const handleLogout = () => {
		logout();
	};
	return (
		<nav className="px-4 mt-4 sm:flex sm:justify-between  ">
			<div className="flex justify-between ">
				<Logo color={color === "light" ? "light" : "dark"} />
				<svg
					className={`h-8 w-8 ${
						color === "light" ? "fill-white" : "fill-dark"
					} cursor-pointer sm:hidden `}
					onClick={() => {
						console.log("Clicked");
						setIsVisible(!isVisible);
					}}
				>
					<use
						xlinkHref={`/img/sprite.svg#icon-${isVisible ? "close" : "menu"}`}
					></use>
				</svg>
			</div>

			{!user && <Button type="primary" text="Log In" url="/login" />}
			{user && (
				<>
					<ul
						className={` ${
							color === "light" ? "text-white" : "text-dark"
						} items-center text-sm right-0 sm:my-0 my-4  ${
							isVisible ? "flex" : "sm:flex hidden"
						} sm:flex-row flex-col sm:justify-end justify-center  `}
					>
						<li className="sm:mr-8 sm:mb-0 mb-2">
							<Link
								to={"/explore"}
								className="flex flex-col items-center hover:text-primary transition-all duration-100 cursor-pointer"
							>
								<svg className={`h-6 w-6 fill-current`}>
									<use xlinkHref="/img/sprite.svg#icon-home"></use>
								</svg>
								Home
							</Link>
						</li>
						{/* <li className="sm:mr-8 flex flex-col items-center hover:text-primary transition-all duration-100 cursor-pointer sm:mb-0 mb-2">
							<svg className={`h-6 w-6 fill-current`}>
								<use xlinkHref="/img/sprite.svg#icon-profile"></use>
							</svg>
							Profile
						</li> */}
						<li className="sm:mr-8 sm:mb-0 mb-2">
							<Link
								to={"/saved"}
								className="flex flex-col items-center hover:text-primary transition-all duration-100 cursor-pointer"
							>
								<svg className={`h-6 w-6 fill-current`}>
									<use xlinkHref="/img/sprite.svg#icon-bookmark"></use>
								</svg>
								Saved
							</Link>
						</li>
						<li
							className="  flex flex-col items-center hover:text-primary transition-all duration-100 cursor-pointer"
							onClick={handleLogout}
						>
							<svg className={`h-6 w-6 fill-current`}>
								<use xlinkHref="/img/sprite.svg#icon-logout"></use>
							</svg>
							Logout
						</li>
					</ul>
				</>
			)}
		</nav>
	);
}
