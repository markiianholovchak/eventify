import uniqid from "uniqid";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

export default function Venue({ id }) {
	const [data, isDataLoading, dataErr] = useFetch(`/api/external/venue/${id}`);
	return (
		<div>
			{isDataLoading && <Loader />}
			{dataErr && (
				<Error errorMessage={`Oops... something went wrong: ${dataErr}`} />
			)}
			{data && (
				<>
					<h2 className="sm:text-2xl text-xl font-bold text-primary mt-5 hover:text-dark transition-all duration-200">
						<a href={data.url} target="_blank" rel="noreferrer">
							{data.name}
						</a>
					</h2>
					<span className="flex items-center sm:text-xl text-lg text-grey-200">
						<svg className="fill-grey-200 w-6 h-6 mr-1">
							<use xlinkHref="/img/sprite.svg#icon-marker"></use>
						</svg>
						{`${data.address?.line1}, ${data.city.name}, ${data.country.name}`}
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
