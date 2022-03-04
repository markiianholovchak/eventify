import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import Card from "../components/Card";
import Loader from "../components/Loader";
import Button from "../components/Button";

import { APIKEY } from "../globals";

export default function ExploreMore() {
	const params = useParams();
	const [data, isDataLoading, dataErr] = useFetch(
		`https://app.ticketmaster.com/discovery/v2/events?apikey=${APIKEY}&locale=*&page=${1}`
	);
	return (
		<div className="">
			<h2 className="sm:text-2xl text-xl font-semibold text-dark flex items-center">
				Explore {Object.values(params)[0]}
			</h2>
			<div className="grid grid-cols-autofit justify-items-center justify-center sm:justify-start  gap-5 mt-2 mb-10">
				{isDataLoading && <Loader />}
				{dataErr && <span>Oops... something went wrong: {dataErr}</span>}
				{data &&
					data.map((obj) => {
						return (
							<Card
								key={obj.id}
								type={Object.values(params)[0].slice(0, -1)}
								name={obj.name}
								location={`${obj._embedded.venues[0].city.name}, ${
									obj._embedded.venues[0].country.name.length > 10
										? obj._embedded.venues[0].country.countryCode
										: obj._embedded.venues[0].country.name
								}`}
								image={obj.images?.[0]?.url}
								date={obj.dates.start.localDate}
								segment={obj.classifications[0].segment.name}
							/>
						);
					})}
			</div>
			<div className="flex justify-center">
				<Button type="secondary" text="Load more" />
			</div>
		</div>
	);
}
