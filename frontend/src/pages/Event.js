import { useParams } from "react-router-dom";

import Classifications from "../components/Classifications";
import Card from "../components/Card";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import Error from "../components/Error";
import SaveButton from "../components/SaveButton";

export default function Event({ id }) {
	const params = useParams();
	const [data, isDataLoading, dataErr] = useFetch(
		`/api/external/event/${[params.id]}`
	);
	return (
		<div className="sm:block flex flex-col items-center">
			{isDataLoading && <Loader />}
			{dataErr && (
				<Error errorMessage={`Oops... something went wrong: ${dataErr}`} />
			)}
			{data && (
				<>
					<div className="flex items-center sm:flex-row flex-col">
						<div className="flex flex-col sm:items-start items-center">
							<div className="flex items-center sm:flex-row flex-col">
								<h2 className="sm:text-2xl text-xl font-bold text-dark ">
									<a
										className="hover:text-primary transition-all duration-200"
										href={data.url}
										target="_blank"
										rel="noreferrer"
									>
										{data.name}
									</a>
								</h2>
								<span
									className={`text-md  ${
										data.dates.status.code === "onsale"
											? "bg-tertiary text-white"
											: "bg-gray-200 text-dark"
									} px-2 py-1 sm:my-0 my-2 rounded-md sm:ml-4 inline-block`}
								>
									{data.dates.status.code}
								</span>
							</div>
							<Classifications classificationsObj={data.classifications} />
						</div>
						<div className=" sm: my-4 sm:ml-10 ">
							<SaveButton
								item={{
									id: data.id,
									name: data.name,
									type: "event",
									location: `${data._embedded.venues[0].city.name}, ${
										data._embedded.venues[0].country.name.length > 10
											? data._embedded.venues[0].country.countryCode
											: data._embedded.venues[0].country.name
									}`,
									date: data.dates.start.localDate,
									image: data.images?.[0]?.url,
								}}
							/>
						</div>
					</div>
					<ul className="text-xl text-dark font-semibold mt-2 flex flex-col sm:items-start items-center">
						<li>
							Date:
							<span className="text-primary ml-2">
								{data.dates.start.localDate}
							</span>
						</li>
						<li>
							Sales:
							<span className="text-primary ml-2">
								{data.sales.public.startDateTime.slice(0, 10)} -{" "}
								{data.sales.public.endDateTime.slice(0, 10)}
							</span>
						</li>
						<li>
							Promoter:
							<span className="text-primary ml-2">{data.promoter.name}</span>
						</li>
					</ul>
					<h2 className="sm:text-2xl text-xl font-semibold text-dark my-4 ">
						Attractions
					</h2>
					<div className="grid gap-5 grid-cols-autofit">
						{data._embedded.attractions.map((attraction) => {
							return (
								<Card
									key={attraction.id}
									id={attraction.id}
									type="attraction"
									name={attraction.name}
									image={attraction.images?.[0]?.url}
									upcoming={attraction.upcomingEvents?._total}
									segment={`${attraction.classifications?.[0].segment.name}, ${attraction.classifications?.[0].genre?.name}`}
								/>
							);
						})}
					</div>
					<h2 className="sm:text-2xl text-xl font-semibold text-dark mt-4 ">
						Venue
					</h2>
					<div className="grid gap-5 grid-cols-autofit mb-10">
						{data._embedded.venues.map((venue) => {
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
									upcoming={venue.upcomingEvents?._total}
								/>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}
