import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import useAuthContext from "../hooks/useAuthContext";
import useSavedContext from "../hooks/useSavedContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import CustomLink from "../components/CustomLink";

export default function Saved() {
	const { user } = useAuthContext();
	const { dispatch } = useSavedContext();
	const [data, isLoading, error] = useFetch("/api/saved", {
		headers: {
			Authorization: `Bearer: ${user.token}`,
		},
	});
	useEffect(() => {
		if (data) {
			dispatch({ type: "SET_ITEMS", payload: data.savedItems });
		}
	}, [data]);

	return (
		<div className="min-h-[100vh] flex flex-col ">
			<header className="sm:px-10 px-4 py-4">
				<Navbar color="dark" />
			</header>
			<main className="my-10 sm:px-10 px-5 grow">
				{isLoading && <Loader />}
				{error && (
					<Error errorMessage={`Oops... something went wrong: ${error}`} />
				)}
				{data && data.savedItems.length < 1 && (
					<div className="flex flex-col items-center">
						<h1 className="mb-4 sm:text-2xl text-xl font-semibold text-grey-200 flex items-center">
							Seems like you havent saved anything yet...
						</h1>
						<CustomLink type="secondary" text="Explore" url="/" />
					</div>
				)}
				{data && data.savedItems.length > 1 && (
					<>
						{console.log(data)}
						<h2 className="sm:text-2xl text-xl font-semibold text-dark flex items-center">
							Saved events
						</h2>
						<div className="grid grid-cols-autofit my-4 gap-4 sm:justify-start justify-center">
							{data.savedItems
								.filter((item) => item.type === "event")
								.map((event) => {
									return (
										<Card
											key={event.id}
											id={event.id}
											type="event"
											name={event.name}
											location={event.location}
											image={event.image}
											date={event.date}
										/>
									);
								})}
						</div>
						<h2 className="sm:text-2xl text-xl font-semibold text-dark flex items-center ">
							Saved venues
						</h2>
						<div className="grid grid-cols-autofit my-4 gap-4 sm:justify-start justify-center">
							{data.savedItems
								.filter((item) => item.type === "venue")
								.map((venue) => {
									return (
										<Card
											key={venue.id}
											id={venue.id}
											type="venue"
											name={venue.name}
											location={venue.location}
											image={venue.image}
											upcoming={venue.upcoming}
										/>
									);
								})}
						</div>
						<h2 className="sm:text-2xl text-xl font-semibold text-dark flex items-center">
							Saved attractions
						</h2>
						<div className="grid grid-cols-autofit my-4 gap-4 sm:justify-start justify-center">
							{data.savedItems
								.filter((item) => item.type === "attraction")
								.map((attraction) => {
									return (
										<Card
											key={attraction.id}
											id={attraction.id}
											type="attraction"
											name={attraction.name}
											image={attraction.image}
											upcoming={attraction.upcoming}
											segment={attraction.segment}
										/>
									);
								})}
						</div>
					</>
				)}
			</main>
			<Footer />
		</div>
	);
}
