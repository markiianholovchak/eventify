import Logo from "./components/Logo";
import Button from "./components/Button";
function App() {
	return (
		<div className="px-10 font-main">
			<header className="py-4 flex justify-between">
				<Logo color="dark" />
				<Button type="primary" text="Log In" />
			</header>
		</div>
	);
}

export default App;
