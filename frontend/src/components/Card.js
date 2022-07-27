import React from "react";
import { Link } from "react-router-dom";

/**
 *
 * @param {string} type - "event" | "venue" | "attraction"
 * @param {string} id - id of the event/venue/attractiion
 * @param {string} name - name of the event/venue/attractiion
 * @param {string} location - location of the event/venue/attractiion
 * @param {string} image - address of the image of the event/venue/attractiion
 * @param {string} date - date of the event/venue/attractiion
 * @param {string} segment - segment of the event/venue/attractiion
 * @param {int} upcoming - number of the upcoming events in the venue
 * @returns Card component, based on type param relevant additinal information is rendered
 */
export default function Card({
	id,
	type,
	name,
	location,
	image,
	date,
	segment,
	upcoming,
}) {
	return (
		<div className="bg-white shadow-lg w-full rounded-xl overflow-hidden">
			<div className=" h-[10rem] flex justify-center items-center">
				{image ? (
					<img
						className="w-full h-full object-cover object-center "
						src={image}
						alt={`${name} ${type}`}
					/>
				) : (
					<span className="text-primary text-lg font-semibold">
						No photo for this {type}...
					</span>
				)}
			</div>
			<div className="px-3 py-3">
				<h3 className="text-lg font-bold text-dark mr-2">
					{name.length > 30 ? name.slice(0, 26) + "..." : name}
				</h3>
				<div className="grid grid-cols-[_1fr_max-content] items-center ">
					<div>
						<div className="text-sm text-grey-200 flex items-center">
							<svg className="h-4 w-4 fill-grey-200 mr-1">
								<use
									xlinkHref={`/img/sprite.svg#icon-${
										type === "event" || type === "venue" ? "marker" : "segments"
									}`}
								/>
							</svg>

							{(type === "event" || type === "venue") && location}
							{type === "attraction" && segment}
						</div>
						<div className="text-sm text-grey-200 flex mt-1 ">
							<svg className="h-4 w-4 mr-1">
								<use xlinkHref="/img/sprite.svg#icon-calendar-light" />
							</svg>
							{type === "event" && date}
							{type === "venue" && `Upcoming events: ${upcoming}`}
							{type === "attraction" && "Upcoming events: 57"}
						</div>
					</div>

					<Link
						className="text-sm text-primary bg-grey-100 px-3 py-1 rounded-2xl self-end justify-self-end hover:scale-110 active:scale-95 transition-all duration-200"
						to={`/explore/${type}/${id}`}
					>
						Learn more
					</Link>
				</div>
			</div>
		</div>
	);
}
