import Logo from "./components/Logo";
import Button from "./components/Button";
function App() {
	return (
		<div className="font-main">
			<header className="h-96 px-10 py-4 flex justify-between bg-concert bg-cover bg-center ">
				<Logo color="white" />
				<Button type="primary" text="Log In" />
			</header>
			<main className="">Hello</main>
		</div>
	);
}

export default App;
