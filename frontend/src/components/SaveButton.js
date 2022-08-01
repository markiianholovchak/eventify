import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useSavedContext from "../hooks/useSavedContext";
import useSave from "../hooks/useSave";
import useDelete from "../hooks/useDelete";
import Error from "./Error";

export default function SaveButton({ item }) {
	const [userError, setUserError] = useState(null);
	const { user } = useAuthContext();
	const { savedItems } = useSavedContext();
	const { save, error: saveError } = useSave();
	const { del, error: deleteError } = useDelete();
	const handleSave = async (e) => {
		e.preventDefault();
		if (!user) {
			// Navigate to login and then back
			return;
		}
		// Delete item if already saved
		if (savedItems.find((savedItem) => savedItem.id === item.id)) {
			// Delete item from db
			del(item.id);
			return;
		}
		save(item);
	};

	return (
		<div className="flex flex-col items-center relative">
			<button
				onClick={handleSave}
				className="flex items-center justify-center bg-primary w-max rounded-full p-4 cursor-pointer hover:scale-110 transition-all duration-150 "
			>
				<svg className="w-6 h-6 fill-white">
					{savedItems.find((savedItem) => savedItem.id === item.id) ? (
						<use xlinkHref="/img/sprite.svg#icon-bookmark-filled" />
					) : (
						<use xlinkHref="/img/sprite.svg#icon-bookmark" />
					)}
				</svg>
			</button>
			{saveError && <Error errorMessage="Error: Could not save item" />}
			{deleteError && <Error errorMessage="Error: Could not unsave item" />}
		</div>
	);
}
