import React from "react";

/**
 *
 * @param {string} type - "event" | "venue" | "attraction"
 * Card component, based on type param relevant additinal information is rendered
 * @returns card component
 */
export default function Card({ type }) {
	return (
		<div className="bg-white shadow-lg w-full rounded-xl overflow-hidden">
			<div className=" h-[10rem]">
				<img
					className="w-full h-full object-cover object-center "
					src="/img/carnaval.jpeg"
					alt="Nashville event"
				/>
			</div>
			<div className="px-3 py-3">
				<div className="flex items-center">
					<h3 className="text-xl font-bold text-dark mr-2">
						Nashville carnival
					</h3>
					{type === "event" && (
						<ul className="text-sm text-primary grid grid-cols-[repeat(3,max-content)] gap-2 ">
							<li>Music</li>
							<li>Dancing</li>
						</ul>
					)}
				</div>
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

							{(type === "event" || type === "venue") &&
								"Nashville, North Carolina"}
							{type === "attraction" && "Film, Music"}
						</div>
						<div className="text-sm text-grey-200 flex mt-1 ">
							<svg className="h-4 w-4 mr-1">
								<use xlinkHref="/img/sprite.svg#icon-calendar-light" />
							</svg>
							{type === "event" && "Wed, 12.07.2922"}
							{type === "venue" && "Upcoming events: 57"}
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
