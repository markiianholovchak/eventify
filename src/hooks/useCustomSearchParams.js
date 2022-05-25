import { useSearchParams } from "react-router-dom";

export default function useCustomSearchParams() {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchAsObject = Object.fromEntries(searchParams.entries());

	return [searchAsObject, setSearchParams];
}
