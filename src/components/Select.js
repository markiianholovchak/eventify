import { useState, useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";

export default function Select({ options, handleSelect, setIsVisible }) {
	const [query, setQuery] = useState("");

	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};
	const ref = useRef(null);
	useClickOutside(ref, () => {
		setIsVisible(false);
	});
	return (
		<div
			className={`bg-light shadow-lg rounded-lg p-3 absolute top-0 left-0 z-20`}
			ref={ref}
		>
			<div className="bg-grey-100 rounded-lg flex items-center px-3 py-1 ">
				<svg className="fill-grey-200 h-3 w-3 mr-2">
					<use xlinkHref="/img/sprite.svg#icon-search" />
				</svg>
				<input
					className="bg-grey-100 outline-0 text-xs font-light"
					placeholder="Search"
					type="text"
					onChange={(e) => handleInputChange(e)}
					value={query}
				/>
			</div>
			<ul className="text-sm mt-4 h-40 overflow-scroll">
				{options
					.filter((option) =>
						option.toLowerCase().includes(query.toLowerCase())
					)
					.map((option, index) => {
						return (
							<li
								key={index}
								className="text-dark border-b-2 border-b-grey-100 mt-2 cursor-pointer transition-all duration-200 hover:border-b-primary hover:text-primary"
								onClick={(e) => handleSelect(e)}
							>
								{option}
							</li>
						);
					})}
			</ul>
		</div>
	);
}
