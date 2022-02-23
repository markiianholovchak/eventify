import React from "react";

export default function Loader() {
	return (
		<div>
			<svg className="h-8 w-8 animate-spin fill-primary">
				<use xlinkHref="/img/sprite.svg#icon-loading " />
			</svg>
		</div>
	);
}
