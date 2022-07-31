import { useParams } from "react-router-dom";

import uniqid from "uniqid";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import Error from "../components/Error";
import SaveButton from "../components/SaveButton";

export default function Venue({ id }) {
	const params = useParams();
	const [data, isDataLoading, dataErr] = useFetch(
		`/api/external/venue/${params.id}`
	);
	return (
		<div>
			{isDataLoading && <Loader />}
			{dataErr && (
				<Error errorMessage={`Oops... something went wrong: ${dataErr}`} />
			)}
			{data && (
				<>
					<div className="flex sm:items-center items-start sm:flex-row flex-col mt-5">
						<div>
							<h2 className="sm:text-2xl text-xl font-bold text-primary  hover:text-dark transition-all duration-200">
								<a href={data.url} target="_blank" rel="noreferrer">
									{data.name}
								</a>
							</h2>
							<span className="flex items-center sm:text-xl text-md text-grey-200">
								<svg className="fill-grey-200 w-6 h-6 mr-1">
									<use xlinkHref="/img/sprite.svg#icon-marker"></use>
								</svg>
								{`${data.address?.line1}, ${data.city.name}, ${data.country.name}`}
							</span>
						</div>
						<div className=" sm: my-4 sm:ml-10 ">
							<SaveButton
								item={{
									id: data.id,
									type: "venue",
									name: data.name,
									location: `${data.city.name}, ${
										data.country.name.length > 10
											? data.country.countryCode
											: data.country.name
									}`,
									image: data.images?.[0]?.url,
									upcoming: data.upcomingEvents._total,
								}}
							/>
						</div>
					</div>

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
							<h3 className="text-xl font-semibold text-dark mt-4">
								Box Office
							</h3>
							<p className="text-md text-dark font-light">
								{data.boxOfficeInfo.openHoursDetail} <br />
								{data.boxOfficeInfo.willCallDetail}
							</p>
							<h3 className="text-xl font-semibold text-dark mt-4">
								We accept:
							</h3>
							<p className="text-md text-dark font-light">
								{data.boxOfficeInfo.acceptedPaymentDetail}
							</p>
						</>
					)}

					{data.parkingDetail && (
						<>
							<h3 className="text-xl font-semibold text-dark mt-4">Parking</h3>
							<p className="text-md text-dark font-light">
								{data.parkingDetail}
							</p>
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
				</>
			)}
		</div>
	);
}
