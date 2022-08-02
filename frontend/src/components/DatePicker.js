import { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";

/**
 *
 * @param {function} setIsVisible - function to update isVisible state
 * @param {function} handleSelect - function to select the date
 * @param {String} selectedOption - string containing selected date
 * @returns custom datepicker
 */
export default function DatePicker({
	setIsVisible,
	handleSelect,
	selectedOption,
}) {
	const [year, setYear] = useState(
		selectedOption
			? parseInt(selectedOption.slice(0, 4))
			: new Date().getFullYear()
	);
	const [date, setDate] = useState(
		selectedOption ? +selectedOption.slice(8) : new Date().getDate()
	);
	const [month, setMonth] = useState(
		selectedOption
			? parseInt(selectedOption.slice(5, 7)) - 1
			: new Date().getMonth()
	);
	const [firstDay, setFirstDay] = useState(new Date(year, month, 1).getDay());
	const months = {
		January: 31,
		February: 28,
		March: 31,
		April: 30,
		May: 31,
		June: 30,
		July: 31,
		August: 31,
		September: 30,
		October: 31,
		November: 30,
		December: 31,
	};
	const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	const createDaysArray = () => {
		let daysArray = [];
		for (let i = 1; i <= months[Object.keys(months)[month]]; i++) {
			daysArray.push(i);
		}

		return daysArray;
	};

	const handleChangeMonth = (step) => {
		let newYear = year;
		let newMonth = month;
		if (month === 0 && step === -1) {
			newMonth = 11;
			setMonth(newMonth);
		} else if (month === 11 && step === 1) {
			newMonth = 0;
			newYear = year + 1;
			setMonth(newMonth);
			setYear(newYear);
		} else {
			newMonth = month + step;
			setMonth(newMonth);
		}
		setFirstDay(new Date(newYear, newMonth, 1).getDay());
	};
	const handleChangeDate = (newDate) => {
		setDate(newDate);
		handleSelect(
			`${year}-${month < 10 ? `0${month + 1}` : month + 1}-${newDate}`
		);
		setIsVisible(false);
	};

	const ref = useRef(null);
	useClickOutside(ref, () => {
		setIsVisible(false);
	});
	return (
		<div
			className="bg-white shadow-lg w-[15rem] p-2 flex flex-col absolute top-0 left-0 z-20"
			ref={ref}
		>
			<div className="flex justify-between">
				<svg
					className="stroke-primary -rotate-90 h-4 w-4 cursor-pointer"
					onClick={() => {
						handleChangeMonth(-1);
					}}
				>
					<use xlinkHref="/img/sprite.svg#icon-up" />
				</svg>
				<div className="inline-block flex-1 text-center text-primary border-b-2 ">
					<span className="mr-2">{Object.keys(months)[month]}</span>
					<span>{year}</span>
				</div>
				<svg
					className="stroke-primary rotate-90 h-4 w-4 cursor-pointer"
					onClick={() => {
						handleChangeMonth(1);
					}}
				>
					<use xlinkHref="/img/sprite.svg#icon-up" />
				</svg>
			</div>
			<div className="grid grid-cols-7 gap-1 px-2 pt-1 text-xs">
				{days.map((val, index) => {
					return (
						<span key={index} className="text-center text-grey-200">
							{val}
						</span>
					);
				})}
			</div>
			<div className="grid grid-cols-7 gap-1 p-2 ">
				{createDaysArray().map((val, index) => {
					return (
						<span
							className={`inline-block text-center text-sm p-1 ${
								val === date ? "bg-primary text-white" : "text-dark"
							} ${
								val === 1 ? `col-start-${firstDay === 0 ? "7" : firstDay} ` : ""
							} cursor-pointer hover:bg-primary hover:text-white rounded-full transition-all duration-100`}
							key={index}
							onClick={() => {
								handleChangeDate(val);
							}}
						>
							{val}
						</span>
					);
				})}
			</div>
		</div>
	);
}
