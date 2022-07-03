import { useParams } from "react-router-dom";

import Attraction from "./DetailsPages/Attraction";
import Venue from "./DetailsPages/Venue";
import Event from "./DetailsPages/Event";

export default function Details() {
	const params = useParams();

	return (
		<div className=" my-5 ">
			{params.type === "attraction" && <Attraction id={params.id} />}
			{params.type === "venue" && <Venue id={params.id} />}
			{params.type === "event" && <Event id={params.id} />}
		</div>
	);
}
