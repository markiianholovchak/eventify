import { useState } from "react";

export default function Searchbar() {
	const [query, setQuery] = useState("");
	const [filtersVisible, setFiltersVisible] = useState(false);
	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};
	const handleFormSubmit = (e) => {
		e.preventDefault();
		// Go to search page
	};
	const handleShowFilters = () => {
		setFiltersVisible(!filtersVisible);
	};
	return (
		<form
			className="-translate-y-8 w-full flex flex-col items-center"
			onSubmit={(e) => handleFormSubmit(e)}
		>
			<div className="flex items-center shadow-xl rounded-xl xl:w-[50%] sm:w-[65%] w-[75%] ">
				<input
					className="flex-1 py-4 px-5 rounded-tl-xl rounded-bl-xl outline-primary text-dark text-md"
					type="text"
					placeholder="An artist, event or venue"
					value={query}
					onChange={(e) => handleInputChange(e)}
				></input>
				<button
					type="submit"
					className="flex items-center text-white bg-primary h-full px-5 text-lg rounded-tr-xl rounded-br-xl"
				>
					Search
					<svg className="w-5 h-5 ml-2 fill-white">
						<use xlinkHref="/img/sprite.svg#icon-search"></use>
					</svg>
				</button>
			</div>
			<div className="mt-9">
				<div
					className={`text-grey-200 font-light text-md flex items-center transition-all duration-200 cursor-pointer hover:scale-105 ${
						filtersVisible ? "translate-y-8" : ""
					}`}
					onClick={handleShowFilters}
				>
					{filtersVisible ? "Hide" : "Show"} filters
					<svg className={`h-4 w-4 ml-1 ${filtersVisible ? "" : "rotate-180"}`}>
						<use xlinkHref="/img/sprite.svg#icon-up" />
					</svg>
				</div>
			</div>
		</form>
	);
}
