import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

export default function SaveButton({ item }) {
	const { user } = useAuthContext();
	const handleSave = async (e) => {
		e.preventDefault();
		const response = await axios.post("/api/saved", item, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
			validateStatus: null,
		});
	};
	return (
		<button
			onClick={handleSave}
			className="flex items-center justify-center bg-primary w-max rounded-full p-4 cursor-pointer hover:scale-110 transition-all duration-150 "
		>
			<svg className="w-6 h-6 fill-white">
				<use xlinkHref="/img/sprite.svg#icon-bookmark" />
			</svg>
		</button>
	);
}
