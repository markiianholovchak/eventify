import { useParams } from "react-router-dom";

import uniqid from "uniqid";
import Classifications from "../components/Classifications";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import Error from "../components/Error";
import SaveButton from "../components/SaveButton";

export default function Attraction() {
	const params = useParams();
	const [data, isDataLoading, dataErr] = useFetch(
		`/api/external/attraction/${params.id}`
	);
	return (
		<div className="flex flex-col items-center justify-center mb-4">
			{isDataLoading && <Loader />}
			{dataErr && (
				<Error errorMessage={`Oops... something went wrong: ${dataErr}`} />
			)}
			{data && (
				<>
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
					<Classifications classificationsObj={data.classifications} />
					<p className="text-dark text-xl font-regular mt-2">
						Upcoming events:{" "}
						<span className="text-primary font-semibold">
							{data.upcomingEvents._total}
						</span>
					</p>
					<ul className="flex justify-center flex-wrap mt-2">
						{Object.keys(data.externalLinks)
							.filter((key) => key !== "musicbrainz")
							.map((key) => {
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
					<div className="my-4">
						<SaveButton
							item={{
								id: data.id,
								type: "attraction",
								name: data.name,
								image: data.images?.[0]?.url,
								upcoming: data.upcomingEvents._total,
								segment: `${data.classifications[0].segment.name}, ${data.classifications[0].genre?.name}`,
							}}
						/>
					</div>
				</>
			)}
		</div>
	);
}
