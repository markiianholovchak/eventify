import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { APIKEY } from "../globals";
import Loader from "../components/Loader";
import Error from "../components/Error";
import uniqid from "uniqid";

export default function Details() {
	const params = useParams();
	const [data, isDataLoading, dataErr] = useFetch(
		`https://app.ticketmaster.com/discovery/v2/${params.type + "s"}/${
			params.id
		}?apikey=${APIKEY}&locale=*`
	);
	return (
		<div className=" my-5 ">
			{isDataLoading && <Loader />}
			{dataErr && (
				<Error errorMessage={`Oops... something went wrong: ${dataErr}`} />
			)}
			{params.type === "attraction" && data && <Attraction data={data} />}
			{params.type === "venue" && data && <Venue data={data} />}
		</div>
	);
}

const Attraction = ({ data }) => {
	// 1. Extract classifications from data object
	const classifications = [];

	for (let key of Object.keys(data.classifications[0])) {
		if (
			typeof data.classifications[0][key] === "object" &&
			data.classifications[0][key].name !== "Undefined"
		) {
			classifications.push(data.classifications[0][key]);
		}
	}
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="h-[15rem] w-[15rem] rounded-full ">
				{data.images[0] ? (
					<img
						className="w-full h-full object-cover object-center rounded-full "
						src={data.images[data.images.length - 1].url}
						alt={`${data.name} ${data.type}`}
					/>
				) : (
					<span className="text-primary text-lg font-semibold">
						No photo for this {data.type}...
					</span>
				)}
			</div>
			<h2 className="sm:text-2xl text-xl font-bold text-dark mt-5">
				{data.name}
			</h2>
			<ul className="flex justify-center mt-2 flex-wrap">
				{classifications.map((classificaton) => {
					return (
						<li
							key={classificaton.id}
							className="bg-primary text-lg text-white py-1 px-4 rounded-md mx-2 my-1"
						>
							{classificaton.name}
						</li>
					);
				})}
			</ul>
			<p className="text-dark text-xl font-regular mt-2">
				Upcoming events:{" "}
				<span className="text-primary font-semibold">
					{data.upcomingEvents._total}
				</span>
			</p>
			<ul className="flex justify-center flex-wrap mt-2">
				{Object.keys(data.externalLinks).map((key) => {
					return (
						<li key={uniqid()} className="mx-2 my-1">
							<a
								href={data.externalLinks[key][0].url}
								target="_blank"
								rel="noreferrer"
							>
								<svg className="fill-tertiary w-10 h-10">
									<use xlinkHref={`/img/sprite.svg#icon-${key}`} />
								</svg>
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

const Venue = ({ data }) => {
	console.log(data);
	return (
		<div>
			<h2 className="sm:text-2xl text-xl font-bold text-primary mt-5">
				<a href={data.url} target="_blank" rel="noreferrer">
					{data.name}
				</a>
			</h2>
			<span className="flex items-center sm:text-xl text-lg text-grey-200">
				<svg className="fill-grey-200 w-6 h-6 mr-1">
					<use xlinkHref="/img/sprite.svg#icon-marker"></use>
				</svg>
				{`${data.address.line1}, ${data.city.name}, ${data.country.name}`}
			</span>

			{data.generalInfo && (
				<>
					<h3 className="text-xl font-semibold text-dark mt-4">
						General information
					</h3>
					<p className="text-md text-dark font-light">
						{data.generalInfo.generalRule} <br />
						{data.generalInfo.childRule}
					</p>
				</>
			)}
			{data.boxOfficeInfo && (
				<>
					<h3 className="text-xl font-semibold text-dark mt-4">Box Office</h3>
					<p className="text-md text-dark font-light">
						{data.boxOfficeInfo.openHoursDetail} <br />
						{data.boxOfficeInfo.willCallDetail}
					</p>
					<h3 className="text-xl font-semibold text-dark mt-4">We accept:</h3>
					<p className="text-md text-dark font-light">
						{data.boxOfficeInfo.acceptedPaymentDetail}
					</p>
				</>
			)}

			{data.parkingDetail && (
				<>
					<h3 className="text-xl font-semibold text-dark mt-4">Parking</h3>
					<p className="text-md text-dark font-light">{data.parkingDetail}</p>
				</>
			)}
			{data.images && (
				<div className="flex justify-center mt-5 flex-wrap">
					{data.images.map((img) => {
						return (
							<img
								key={uniqid()}
								className="w-[25rem] rounded-xl m-2 "
								src={img.url}
								alt={data.name}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};
