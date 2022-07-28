import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

import CustomButton from "./CustomButton";
import Button from "./Button";
import Logo from "./Logo";

export default function Navbar() {
	const { user } = useAuthContext();
	const { logout } = useLogout();
	const handleLogout = () => {
		logout();
	};
	return (
		<nav className="px-4 flex justify-between  ">
			<Logo color="light" />
			<div>
				{!user && <Button type="primary" text="Log In" url="/login" />}
				{user && (
					<ul className="flex text-white items-center text-lg ">
						<li className="font-bold mr-4">Hello, {user.email}</li>
						<li className="font-light mr-4">Account</li>
						<li className="font-light mr-4">Saved</li>
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
