import React from "react";

/**
 *
 * @param {string} type - "event" | "venue" | "attraction"
 * Card component, based on type param relevant additinal information is rendered
 * @returns card component
 */
export default function Card({
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
			<div className=" h-[10rem]">
				<img
					className="w-full h-full object-cover object-center "
					src={image}
					alt={`${name} ${type}`}
				/>
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

					<a
						className="text-sm text-primary bg-grey-100 px-3 py-1 rounded-2xl self-end justify-self-end active:scale-95"
						href="/"
						onClick={(e) => e.preventDefault()}
					>
						Learn more
					</a>
				</div>
			</div>
		</div>
	);
}
