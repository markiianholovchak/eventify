import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCustomSearchParams from "../hooks/useCustomSearchParams";
import useFetch from "../hooks/useFetch";

import Card from "../components/Card";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Error from "../components/Error";

export default function ExploreMore() {
	const [pages, setPages] = useState([0]);
	const [totalPages, setTotalPages] = useState(1);
	const [searchParams] = useCustomSearchParams();
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

	return (
		<div className="">
			<h2 className="sm:text-2xl text-xl font-semibold text-dark flex items-center">
				{searchParams && searchParams.keyword
					? `Results for: ${searchParams.keyword}`
					: `Explore ${params.type}`}
			</h2>
			<div className="grid grid-cols-autofit justify-items-center justify-center sm:justify-start  gap-5 mt-2 mb-10">
				{pages.map((page, index) => (
					<DataPage
						pageToLoad={page}
						cardType={cardType}
						key={index}
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
		`/api/external/${cardType + "s"}/${pageToLoad}/?q=${searchParams}`
	);
	useEffect(() => {
		if (data && data.page.totalPages !== 1 && totalPages === 1) {
			setTotalPages(data.page.totalPages);
		}
	}, [data]);

	return (
		<>
			{isDataLoading && <Loader />}
			{dataErr && (
				<Error errorMessage={`Oops... something went wrong: ${dataErr}`} />
			)}
			{data && !data._embedded && (
				<Error errorMessage={`Sorry, could not find anything`} />
			)}
			{data &&
				data._embedded &&
				Object.values(data._embedded)[0].map((obj) => {
					if (cardType === "event") {
						return (
							<Card
								key={obj.id}
								id={obj.id}
								type={cardType}
								name={obj.name}
								location={`${obj._embedded?.venues[0].city.name}, ${
									obj._embedded?.venues[0].country.name.length > 10
										? obj._embedded?.venues[0].country.countryCode
										: obj._embedded?.venues[0].country.name
								}`}
								image={obj.images?.[0]?.url}
								date={obj.dates?.start.localDate}
								segment={obj.classifications?.[0].segment.name}
								upcoming={obj.upcomingEvents?._total}
							/>
						);
					} else if (cardType === "venue") {
						return (
							<Card
								key={obj.id}
								id={obj.id}
								type={cardType}
								name={obj.name}
								location={`${obj.city.name}, ${
									obj.country.name.length > 10
										? obj.country.countryCode
										: obj.country.name
								}`}
								image={obj.images?.[0]?.url}
								upcoming={obj.upcomingEvents?._total}
							/>
						);
					} else {
						return (
							<Card
								key={obj.id}
								id={obj.id}
								type={cardType}
								name={obj.name}
								image={obj.images?.[0]?.url}
								upcoming={obj.upcomingEvents?._total}
								segment={`${obj.classifications?.[0].segment.name}, ${obj.classifications?.[0].genre?.name}`}
							/>
						);
					}
				})}
		</>
	);
};
