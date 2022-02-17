import { useState } from "react";

export default function Searchbar() {
	const [query, setQuery] = useState("");
	const [areFiltersVisible, setFiltersVisible] = useState(false);
	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};
	const handleFormSubmit = (e) => {
		e.preventDefault();
		// Go to search page
	};
	const handleShowFilters = () => {
		setFiltersVisible(!areFiltersVisible);
	};
	return (
		<form
			className="-translate-y-8 w-full flex flex-col items-center"
			onSubmit={(e) => handleFormSubmit(e)}
		>
			<div className="flex items-center shadow-xl rounded-xl xl:w-[50%] sm:w-[75%] w-[85%] ">
				<input
					className="flex-1 py-3 px-5 rounded-tl-xl rounded-bl-xl outline-primary text-dark text-md"
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
					<svg className="w-4 h-4 ml-2 fill-white">
						<use xlinkHref="/img/sprite.svg#icon-search"></use>
					</svg>
				</button>
			</div>
			<div className="mt-9 flex flex-col items-center">
				<div
					className={`grid sm:grid-cols-4 grid-cols-1 gap-2 transition-all duration-300 ${
						areFiltersVisible ? "" : "opacity-0"
					}`}
				>
					<Filter icon="map" title="Country" />
					<Filter icon="marker" title="City" />
					<Filter icon="segments" title="Segment" />
					<Filter icon="calendar" title="Date" />
				</div>
				<div
					className={`text-grey-200 font-light text-md flex items-center transition-all duration-300 cursor-pointer mt-4  ${
						areFiltersVisible ? "" : "-translate-y-12"
					}`}
					onClick={handleShowFilters}
				>
					{areFiltersVisible ? "Hide" : "Show"} filters
					<svg
						className={`h-4 w-4 ml-1 ${areFiltersVisible ? "" : "rotate-180"}`}
					>
						<use xlinkHref="/img/sprite.svg#icon-up" />
					</svg>
				</div>
			</div>
		</form>
	);
}

const Filter = ({ icon, title }) => {
	const [isSelected, setIsSelected] = useState(false);
	const handleSelect = () => {
		setIsSelected(!isSelected);
	};
	return (
		<div className="flex items-center cursor-pointer" onClick={handleSelect}>
			<div className="p-2 bg-grey-100 rounded-full mr-2">
				<svg className="h-4 w-4">
					<use xlinkHref={`/img/sprite.svg#icon-${icon}`} />
				</svg>
			</div>

			<div className="flex flex-col w-[6rem]">
				<span
					className={`text-base translate-x-0font-medium text-dark inline-block transition-all duration-300 ${
						isSelected ? "" : "translate-y-[.6rem]"
					}`}
				>
					{title}
				</span>
				<span
					className={`text-grey-200 inline-block text-sm ${
						isSelected ? "" : "opacity-0"
					} `}
				>
					{isSelected ? "United States" : "None"}
				</span>
			</div>
		</div>
	);
};
