import React from "react";

export default function DatePicker() {
	return (
		<div className="shadow-lg w-[15rem] p-2">
			<div className="flex justify-between">
				<svg className="stroke-primary -rotate-90 h-4 w-4">
					<use xlinkHref="/img/sprite.svg#icon-up" />
				</svg>
				<span className="inline-block flex-1 text-center text-primary border-b-2 ">
					January
				</span>
				<svg className="stroke-primary rotate-90 h-4 w-4">
					<use xlinkHref="/img/sprite.svg#icon-up" />
				</svg>
			</div>
		</div>
	);
}
