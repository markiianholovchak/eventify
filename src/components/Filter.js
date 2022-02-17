import { useState } from "react";
import Select from "./Select";

export default function Filter({
	icon,
	title,
	selectedOption,
	setSelectedOption,
}) {
	const [isVisible, setIsVisible] = useState(false);
	const handleSelect = (e) => {
		setSelectedOption(e.target.textContent);
		setIsVisible(false);
	};
	return (
		<div className="relative ">
			<div
				className="flex items-center cursor-pointer z-0"
				onClick={() => setIsVisible(true)}
			>
				<div className="p-2 bg-grey-100 rounded-full mr-2">
					<svg className="h-4 w-4">
						<use xlinkHref={`/img/sprite.svg#icon-${icon}`} />
					</svg>
				</div>

				<div className="flex flex-col w-[6rem]">
					<span
						className={`text-base translate-x-0font-medium text-dark inline-block transition-all duration-300 ${
							selectedOption ? "" : "translate-y-[.6rem]"
						}`}
					>
						{title}
					</span>
					<span
						className={`text-grey-200 inline-block text-sm ${
							selectedOption ? "" : "opacity-0"
						} `}
					>
						{selectedOption ? selectedOption : "None"}
					</span>
				</div>
			</div>

			{isVisible && (
				<Select
					options={["US", "Canada", "Mexico", "Spain", "Rome", "England"]}
					handleSelect={handleSelect}
					setIsVisible={setIsVisible}
				/>
			)}
		</div>
	);
}
