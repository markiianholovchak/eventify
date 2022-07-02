import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Logo from "./components/Logo";
import Button from "./components/Button";
import Searchbar from "./components/Searchbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Details from "./pages/Details";

function App() {
	return (
		<Router>
			<div className="font-main">
				<header className="h-[60vh] sm:px-10 px-4 py-4 flex flex-col justify-between   bg-concert bg-cover bg-center ">
					<div className="flex justify-between">
						<Logo color="light" />
						<Button type="primary" text="Log In" />
					</div>
					<h1 className="lg:text-5xl sm:text-4xl text-3xl text-center self-center lg:mb-20 mb-14 font-bold text-light">
						Discover thousands of <br />{" "}
						<span className="text-primary">events</span> all over the world!
					</h1>
				</header>
				<main className="sm:px-10 px-5 -translate-y-8 ">
					<div className="flex justify-center">
						<Searchbar />
					</div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/:type" element={<Search />} />
						<Route path="/:type/:id" element={<Details />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
