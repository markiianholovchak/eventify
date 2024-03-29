import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Saved from "./pages/Saved";
import Signup from "./pages/Signup";

function App() {
	const { user } = useAuthContext();
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Navigate to="/explore" />} />
				<Route path="/explore/*" element={<Home />} />
				<Route
					path="/login"
					element={!user ? <Login /> : <Navigate to="/explore" />}
				/>
				<Route
					path="/signup"
					element={!user ? <Signup /> : <Navigate to="/explore" />}
				/>
				<Route
					path="/saved"
					element={user ? <Saved /> : <Navigate to="/login" />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
