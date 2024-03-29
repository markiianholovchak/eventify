import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import { countryCodes, segments } from "../globals";

export default function Searchbar() {
	const [areFiltersVisible, setAreFiltersVisible] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [type, setType] = useState("Events");
	const [country, setCountry] = useState("");
	const [segment, setSegment] = useState("");
	const [genre, setGenre] = useState("");
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		setKeyword(e.target.value);
	};
	const handleFormSubmit = (e) => {
		e.preventDefault();
		// Create query string from selected filters
		const queryObj = {
			keyword: keyword.split(" ").join("%20"),
			countryCode: Object.keys(countryCodes).find(
				(countryCode) => countryCodes[countryCode] === country
			),
			segmentName: segment,
			genreId: segments[segment]?.genres[genre],
		};
		const queryStr = Object.keys(queryObj).reduce((acc, paramName) => {
			return (
				acc +
				(queryObj[paramName] ? `${paramName}=${queryObj[paramName]}&` : "")
			);
		}, "");
		// Redirect to search page with the query
		navigate(`/explore/${type.toLowerCase()}/?${queryStr}`);
	};
	const handleShowFilters = () => {
		setAreFiltersVisible(!areFiltersVisible);
	};
	return (
		<form
			className=" w-full flex flex-col items-center"
			onSubmit={(e) => handleFormSubmit(e)}
		>
			<div className="flex items-center shadow-xl rounded-xl xl:w-[50%] sm:w-[75%] w-[100%] ">
				<input
					className="flex-1 py-3 px-5 rounded-tl-xl rounded-bl-xl outline-primary text-dark text-md"
					type="text"
					placeholder="An artist, event or venue"
					value={keyword}
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
						areFiltersVisible ? "" : "opacity-0 h-0 overflow-hidden"
					}`}
				>
					<Filter
						required={true}
						icon="calendar"
						title="Type"
						selectedOption={type}
						selectOptions={["Events", "Venues", "Attractions"]}
						setSelectedOption={setType}
					/>
					<Filter
						icon="map"
						title="Country"
						selectOptions={Object.values(countryCodes)}
						selectedOption={country}
						setSelectedOption={setCountry}
					/>

					<Filter
						icon="segments"
						title="Segment"
						selectOptions={Object.keys(segments)}
						selectedOption={segment}
						setSelectedOption={setSegment}
					/>

					<Filter
						icon="segments"
						title="Genres"
						selectOptions={
							segment ? Object.keys(segments[segment].genres) : null
						}
						selectedOption={segment ? genre : null}
						setSelectedOption={setGenre}
					/>
				</div>
				<div
					className={`text-grey-200 font-light text-md flex items-center transition-all duration-300 cursor-pointer my-4 `}
					onClick={handleShowFilters}
				>
					{areFiltersVisible ? "Hide" : "Show"} filters
					<svg
						className={`h-4 w-4 ml-1 stroke-grey-200 ${
							areFiltersVisible ? "" : "rotate-180"
						}`}
					>
						<use xlinkHref="/img/sprite.svg#icon-up" />
					</svg>
				</div>
			</div>
		</form>
	);
}
