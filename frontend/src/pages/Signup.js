import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import CustomButton from "../components/CusomButton";
import Footer from "../components/Footer";

export default function Login() {
	return (
		<div className="min-h-[100vh] flex flex-col justify-between">
			<header className="sm:px-10 px-4 py-4">
				<Logo color="dark" />
			</header>
			<main className="flex flex-col items-center sm:px-10 px-5 font-main">
				<form className="flex flex-col">
					<h1 className="lg:text-4xl sm:text-3xl text-2xl font-bold text-primary">
						Sign up
					</h1>
					<input
						type="text"
						placeholder="E-mail"
						className="border-2 border-dark rounded-sm px-2 py-2 w-[20rem] mt-2"
					/>
					<input
						type="text"
						placeholder="Password"
						className="border-2 border-dark rounded-sm px-2 py-2 w-[20rem] mt-4 mb-2"
					/>
					<CustomButton type="primary" text="Log in" />
				</form>
				<p className="text-dark text-lg mt-4 ">
					Already have an account?{" "}
					<Link to="/login" className="text-primary font-bold">
						Log in
					</Link>
				</p>
			</main>
			<Footer />
		</div>
	);
}
