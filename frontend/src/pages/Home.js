import { Link } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import Card from "../components/Card";
import Loader from "../components/Loader";
import Error from "../components/Error";

import { APIKEY } from "../globals";

function Home() {
	const randomPage = Math.floor(Math.random() * 15);
	const [events, areEventsLoading, eventsErr] = useFetch(
		`https://app.ticketmaster.com/discovery/v2/events?apikey=${APIKEY}&locale=*&page=${randomPage}`
	);
	const [venues, areVenuesLoading, venuesErr] = useFetch(
		`https://app.ticketmaster.com/discovery/v2/venues?apikey=${APIKEY}&locale=*&page=${randomPage}`
	);
	const [attractions, areAttractionsLoading, attractionsErr] = useFetch(
		`https://app.ticketmaster.com/discovery/v2/attractions?apikey=${APIKEY}&locale=*&page=${randomPage}`
	);

	return (
		<>
			<Link
				to="/events"
				className="sm:text-2xl text-xl font-semibold text-dark flex items-center"
			>
				Explore events
				<svg className="stroke-dark h-6 w-6 ml-2">
					<use xlinkHref="/img/sprite.svg#icon-rarrow" />
				</svg>
			</Link>
			<div className="grid grid-cols-autofit justify-items-center justify-center sm:justify-start  gap-5 mt-2 mb-10">
				{areEventsLoading && <Loader />}
				{eventsErr && (
					<Error errorMessage={`Oops... something went wrong: ${eventsErr}`} />
				)}
				{events &&
					Object.values(events._embedded)[0]
						.slice(0, 5)
						.map((event) => {
							return (
								<Card
									key={event.id}
									id={event.id}
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
			<Link
				to="/venues"
				className="sm:text-2xl text-xl font-semibold text-dark flex items-center"
			>
				Explore venues
				<svg className="stroke-dark h-6 w-6 ml-2">
					<use xlinkHref="/img/sprite.svg#icon-rarrow" />
				</svg>
			</Link>
			<div className="grid grid-cols-autofit justify-items-center justify-center sm:justify-start  gap-5 mt-2 mb-10">
				{areVenuesLoading && <Loader />}
				{venuesErr && (
					<Error errorMessage={`Oops... something went wrong: ${venuesErr}`} />
				)}
				{venues &&
					Object.values(venues._embedded)[0]
						.slice(0, 5)
						.map((venue) => {
							return (
								<Card
									key={venue.id}
									id={venue.id}
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

			<Link
				to="/attractions"
				className="sm:text-2xl text-xl font-semibold text-dark flex items-center"
			>
				Explore attractions
				<svg className="stroke-dark h-6 w-6 ml-2">
					<use xlinkHref="/img/sprite.svg#icon-rarrow" />
				</svg>
			</Link>
			<div className="grid grid-cols-autofit justify-items-center justify-center sm:justify-start  gap-5 mt-2 mb-10">
				{areAttractionsLoading && <Loader />}
				{attractionsErr && (
					<Error
						errorMessage={`Oops... something went wrong: ${attractionsErr}`}
					/>
				)}
				{attractions &&
					Object.values(attractions._embedded)[0]
						.slice(0, 5)
						.map((attraction) => {
							return (
								<Card
									key={attraction.id}
									id={attraction.id}
									type="attraction"
									name={attraction.name}
									image={attraction.images?.[0]?.url}
									upcoming={attraction.upcomingEvents._total}
									segment={`${attraction.classifications[0].segment.name}, ${attraction.classifications[0].genre?.name}`}
								/>
							);
						})}
			</div>
		</>
	);
}

export default Home;
