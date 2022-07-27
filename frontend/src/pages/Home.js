import { Routes, Route } from "react-router-dom";

// Components
import Searchbar from "../components/Searchbar";
import Main from "./Main";
import Search from "./Search";
import Details from "./Details";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
	return (
		<>
			<Header />
			<main className="sm:px-10 px-5 -translate-y-8 font-main">
				<div className="flex justify-center">
					<Searchbar />
				</div>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/:type" element={<Search />} />
					<Route path="/:type/:id" element={<Details />} />
				</Routes>
				<Footer />
			</main>
		</>
	);
}
