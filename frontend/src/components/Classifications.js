import React from "react";

export default function Classifications({ classificationsObj }) {
	const classifications = [];

	for (let key of Object.keys(classificationsObj[0])) {
		if (
			typeof classificationsObj[0][key] === "object" &&
			classificationsObj[0][key].name !== "Undefined"
		) {
			classifications.push(classificationsObj[0][key]);
		}
	}
	return (
		<ul className="flex gap-4 mt-1 flex-wrap">
			{classifications.map((classificaton) => {
				return (
					<li
						key={classificaton.id}
						className="bg-primary text-lg text-white py-1 px-4 rounded-md gap-4 my-1"
					>
						{classificaton.name}
					</li>
				);
			})}
		</ul>
	);
}
