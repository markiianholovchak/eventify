import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

// components
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import Error from "../components/Error";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signup, isLoading, error } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(email, password);
	};
	return (
		<div className="min-h-[100vh] flex flex-col justify-between">
			<header className="sm:px-10 px-4 py-4">
				<Logo color="dark" />
			</header>
			<main className="flex flex-col items-center sm:px-10 px-5 font-main">
				<form className="flex flex-col" onSubmit={handleSubmit}>
					<h1 className="lg:text-4xl sm:text-3xl text-2xl font-bold text-primary">
						Sign up
					</h1>
					<input
						type="text"
						placeholder="E-mail"
						className="border-2 border-dark rounded-sm px-2 py-2 w-[20rem] mt-2"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<input
						type="text"
						placeholder="Password"
						className="border-2 border-dark rounded-sm px-2 py-2 w-[20rem] mt-4 mb-2"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<CustomButton type="primary" text="Sign up" isDisabled={isLoading} />
					{error && <Error errorMessage={error} />}
				</form>
				<p className="text-dark text-lg mt-4 ">
					Already have an account?
					<Link to="/login" className="ml-2 text-primary font-bold">
						Log in
					</Link>
				</p>
			</main>
			<Footer />
		</div>
	);
}
