import React from "react";

export default function Searchbar() {
	return (
		<form className="flex items-center shadow-xl rounded-xl xl:w-[50%] sm:w-[65%] w-[75%] -translate-y-8">
			<input
				className="flex-1 py-4 px-5 rounded-tl-xl rounded-bl-xl outline-primary text-dark text-md"
				type="text"
				placeholder="An artist, event or venue"
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
		</form>
	);
}
