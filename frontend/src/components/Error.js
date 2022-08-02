/**
 *
 * @param {String} errorMessage - error message
 * @returns styled span tag containing passed error message
 */
export default function Error({ errorMessage }) {
	return (
		<span className="mt-4 text-lg text-tertiary flex items-center">
			<svg className="w-6 h-6 fill-tertiary mr-2">
				<use xlinkHref="/img/sprite.svg#icon-error" />
			</svg>
			{errorMessage}
		</span>
	);
}
