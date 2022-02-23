import { useEffect, useState } from "react";
import axios from "axios";

import Logo from "./components/Logo";
import Button from "./components/Button";
import Searchbar from "./components/Searchbar";
import Footer from "./components/Footer";
import Card from "./components/Card";

import { APIKEY } from "./globals";
function App() {
	const [events, setEvents] = useState("");
	const [venues, setVenues] = useState("");
	const [attractions, setAttractions] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const randomPage = Math.floor(Math.random() * 25);
			const events = await axios.get(
				`https://app.ticketmaster.com/discovery/v2/events?apikey=${APIKEY}&locale=*&page=${randomPage}`
			);
			const venues = await axios.get(
				`https://app.ticketmaster.com/discovery/v2/venues?apikey=${APIKEY}&locale=*&page=${randomPage}`
			);
			const attractions = await axios.get(
				`https://app.ticketmaster.com/discovery/v2/attractions?apikey=${APIKEY}&locale=*&page=${randomPage}`
			);
			setEvents(events.data._embedded.events);
			setVenues(venues.data._embedded.venues);
			setAttractions(attractions.data._embedded.attractions);
			console.log(attractions.data._embedded.attractions);
		};
		fetchData();
	}, []);
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
					{events &&
						events.slice(0, 5).map((event) => {
							return (
								<Card
									key={event.id}
									type="event"
									name={event.name}
									location={`${event._embedded.venues[0].city.name}, ${
										event._embedded.venues[0].country.name.length > 10
											? event._embedded.venues[0].country.countryCode
											: event._embedded.venues[0].country.name
									}`}
									image={event.images?.[0]?.url}
									date={event.dates.start.localDate}
									segment={event.classifications[0].segment.name}
								/>
							);
						})}
				</div>
				<h2 className="sm:text-2xl text-xl font-semibold text-dark">
					Explore venues
				</h2>
				<div className="grid grid-cols-autofit justify-items-center justify-center sm:justify-start  gap-5 mt-2 mb-10">
					{venues &&
						venues.slice(0, 5).map((venue) => {
							return (
								<Card
									key={venue.id}
									type="venue"
									name={venue.name}
									location={`${venue.city.name}, ${
										venue.country.name.length > 10
											? venue.country.countryCode
											: venue.country.name
									}`}
									image={venue.images?.[0]?.url}
									upcoming={venue.upcomingEvents._total}
								/>
							);
						})}
				</div>

				<h2 className="sm:text-2xl text-xl font-semibold text-dark">
					Explore attractions
				</h2>
				<div className="grid grid-cols-autofit justify-items-center justify-center sm:justify-start  gap-5 mt-2 mb-10">
					{attractions &&
						attractions.slice(0, 5).map((attraction) => {
							return (
								<Card
									key={attraction.id}
									type="attraction"
									name={attraction.name}
									image={attraction.images?.[0]?.url}
									upcoming={attraction.upcomingEvents._total}
									segment={`${attraction.classifications[0].segment.name}, ${attraction.classifications[0].genre?.name}`}
								/>
							);
						})}
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default App;
