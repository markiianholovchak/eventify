import { useState } from "react";
import useVisible from "../hooks/useVisible";
import Select from "./Select";

export default function Filter({ icon, title }) {
	const [isSelected, setIsSelected] = useState(false);
	const [selectedOption, setSelectedOption] = useState("");
	const { ref, isVisible, setIsVisible } = useVisible(true);
	const handleSelect = (e) => {
		setSelectedOption(e.target.textContent);
		setIsSelected(true);
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
						{isSelected ? selectedOption : "None"}
					</span>
				</div>
			</div>

			{isVisible && (
				<div className="absolute top-0 left-0 z-20" ref={ref}>
					<Select
						options={["US", "Canada", "Mexico", "Spain", "Rome", "England"]}
						handleSelect={handleSelect}
					/>
				</div>
			)}
		</div>
	);
}
