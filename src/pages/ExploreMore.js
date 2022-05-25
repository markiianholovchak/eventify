import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCustomSearchParams from "../hooks/useCustomSearchParams";
import useFetch from "../hooks/useFetch";

import uniqid from "uniqid";

import Card from "../components/Card";
import Loader from "../components/Loader";
import Button from "../components/Button";

import { APIKEY } from "../globals";

export default function ExploreMore() {
	const [pages, setPages] = useState([1]);
	const [totalPages, setTotalPages] = useState(1);
	const [searchParams, setSearchParams] = useCustomSearchParams();
	const params = useParams();

	const querySearchParams = Object.keys(searchParams).reduce(
		(acc, el) => (acc += `${el}=${searchParams[el]}&`),
		""
	);
	const cardType = params.type.slice(0, -1);
	const handleLoadPage = (e) => {
		e.preventDefault();
		setPages([...pages, pages[pages.length - 1] + 1]);
	};

	useEffect(() => {
		setPages([1]);
		console.log("fired");
	}, [querySearchParams]);
	return (
		<div className="">
			<h2 className="sm:text-2xl text-xl font-semibold text-dark flex items-center">
				{params.query
					? `Results for: ${params.query}`
					: `Explore ${params.type}`}
			</h2>
			<div className="grid grid-cols-autofit justify-items-center justify-center sm:justify-start  gap-5 mt-2 mb-10">
				{pages.map((page) => (
					<DataPage
						pageToLoad={page}
						cardType={cardType}
						key={uniqid()}
						searchParams={querySearchParams}
						totalPages={totalPages}
						setTotalPages={setTotalPages}
					/>
				))}
			</div>
			<div className="flex justify-center">
				{totalPages > pages[pages.length - 1] && (
					<Button
						type="secondary"
						text="Load more"
						onClick={(e) => {
							handleLoadPage(e);
						}}
						totalPages={totalPages}
						setTotalPages={setTotalPages}
					/>
				)}
			</div>
		</div>
	);
}

const DataPage = ({
	pageToLoad,
	cardType,
	searchParams,
	totalPages,
	setTotalPages,
}) => {
	const [data, isDataLoading, dataErr] = useFetch(
		`https://app.ticketmaster.com/discovery/v2/events?apikey=${APIKEY}&${searchParams}locale=*&page=${pageToLoad}`
	);
	useEffect(() => {
		if (data && totalPages < data.page.totalPages) {
			setTotalPages(data.page.totalPages);
		}
	}, [data]);
	return (
		<>
			{isDataLoading && <Loader />}
			{dataErr && <span>Oops... something went wrong: {dataErr}</span>}
			{data &&
				data._embedded &&
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
