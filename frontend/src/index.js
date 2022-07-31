import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { SavedContextProvider } from "./context/savedContext";

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<SavedContextProvider>
				<App />
			</SavedContextProvider>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
