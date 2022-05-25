import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import Card from "../components/Card";
import Loader from "../components/Loader";
import Button from "../components/Button";

import { APIKEY } from "../globals";

export default function ExploreMore() {
	const params = useParams();
	const cardType = params.type.slice(0, -1);
	const location = useLocation();
	const searchParams = location.pathname.split("/")[2] || "";
	const [pages, setPages] = useState([1]);
	const [totalPages, setTotalPages] = useState(null);
	const handleLoadPage = (e) => {
		e.preventDefault();
		setPages([...pages, pages[pages.length - 1] + 1]);
	};
	return (
		<div className="">
			<h2 className="sm:text-2xl text-xl font-semibold text-dark flex items-center">
				{params.query
					? `Results for: ${params.query}`
					: `Explore ${params.type}`}
			</h2>
			<div className="grid grid-cols-autofit justify-items-center justify-center sm:justify-start  gap-5 mt-2 mb-10">
				{pages.map((page, index) => (
					<DataPage
						pageToLoad={page}
						cardType={cardType}
						key={index}
						searchParams={searchParams}
					/>
				))}
			</div>
			<div className="flex justify-center">
				<Button
					type="secondary"
					text="Load more"
					onClick={(e) => {
						handleLoadPage(e);
					}}
					totalPages={totalPages}
					setTotalPages={setTotalPages}
				/>
			</div>
		</div>
	);
}

const DataPage = ({ pageToLoad, cardType, searchParams }) => {
	const [data, isDataLoading, dataErr] = useFetch(
		`https://app.ticketmaster.com/discovery/v2/events?apikey=${APIKEY}&${searchParams}&locale=*&page=${pageToLoad}`
	);
	console.log(
		`https://app.ticketmaster.com/discovery/v2/events?apikey=${APIKEY}&${searchParams}&locale=*&page=${pageToLoad}`
	);
	return (
		<>
			{isDataLoading && <Loader />}
			{dataErr && <span>Oops... something went wrong: {dataErr}</span>}
			{data &&
				Object.values(data._embedded)[0].map((obj) => {
					return (
						<Card
							key={obj.id}
							type={cardType}
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
		</>
	);
};
