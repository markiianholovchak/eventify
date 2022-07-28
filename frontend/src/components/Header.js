import Navbar from "./Navbar";

export default function Header() {
	return (
		<header className="min-h-[70vh] sm:px-10 px-4 py-4 flex flex-col justify-between  bg-concert bg-cover bg-center font-main ">
			<Navbar />
			<h1 className="lg:text-5xl sm:text-4xl text-3xl text-center self-center lg:mb-20 mb-14  font-bold text-light">
				Discover thousands of <br />{" "}
				<span className="text-primary">events</span> all over the world!
			</h1>
		</header>
	);
}
