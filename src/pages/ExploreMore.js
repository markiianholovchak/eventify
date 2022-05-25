import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import Card from "../components/Card";
import Loader from "../components/Loader";
import Button from "../components/Button";

import { APIKEY } from "../globals";

export default function ExploreMore() {
	const params = useParams();
	const cardType = Object.values(params)[0].slice(0, -1);
	const [pages, setPages] = useState([30]);
	const [totalPages, setTotalPages] = useState(null);
	const handleLoadPage = (e) => {
		e.preventDefault();
		setPages([...pages, pages[pages.length - 1] + 1]);
	};
	return (
		<div className="">
			<h2 className="sm:text-2xl text-xl font-semibold text-dark flex items-center">
				Explore {cardType + "s"}
			</h2>
			<div className="grid grid-cols-autofit justify-items-center justify-center sm:justify-start  gap-5 mt-2 mb-10">
				{pages.map((page, index) => (
					<DataPage pageToLoad={page} cardType={cardType} key={index} />
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

const DataPage = ({ pageToLoad, cardType, totalPages, setTotalPages }) => {
	const [data, isDataLoading, dataErr] = useFetch(
		`https://app.ticketmaster.com/discovery/v2/events?apikey=${APIKEY}&locale=*&page=${pageToLoad}`
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
