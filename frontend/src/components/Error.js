import React from "react";

export default function Error({ errorMessage }) {
	return <span className="text-lg text-tertiary">{errorMessage}</span>;
}
