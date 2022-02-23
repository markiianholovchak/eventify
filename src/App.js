import Logo from "./components/Logo";
import Button from "./components/Button";
import Searchbar from "./components/Searchbar";
import Footer from "./components/Footer";
import Card from "./components/Card";
import DatePicker from "./components/DatePicker";
function App() {
	return (
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
				<h2 className="sm:text-2xl text-xl font-semibold text-dark">
					Explore events
				</h2>
				<div className="grid grid-cols-autofit justify-items-center justify-center sm:justify-start  gap-5 mt-2 mb-10">
					{/* <Card type="event" />
					<Card type="event" />
					<Card type="event" /> */}
				</div>
				<h2 className="sm:text-2xl text-xl font-semibold text-dark">
					Explore venues
				</h2>
				<div className="grid grid-cols-autofit justify-items-center justify-center sm:justify-start  gap-5 mt-2 mb-10">
					{/* <Card type="venue" />
					<Card type="venue" />
					<Card type="venue" /> */}
				</div>

				<h2 className="sm:text-2xl text-xl font-semibold text-dark">
					Explore attractions
				</h2>
				<div className="grid grid-cols-autofit justify-items-center justify-center sm:justify-start  gap-5 mt-2 mb-10">
					{/* <Card type="attraction" />
					<Card type="attraction" />
					<Card type="attraction" /> */}
				</div>
				<DatePicker />
			</main>
			<Footer />
		</div>
	);
}

export default App;
