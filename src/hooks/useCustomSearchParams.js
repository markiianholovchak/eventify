import { useSearchParams } from "react-router-dom";
/**
 *
 * @returns object containing all search params and a function to update them
 */
export default function useCustomSearchParams() {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchAsObject = Object.fromEntries(searchParams.entries());

	return [searchAsObject, setSearchParams];
}
