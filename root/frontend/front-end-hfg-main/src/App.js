import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Dash from "./pages/Dash";
import NewUserForm from "./pages/NewUserForm";
import LoginForm from "./pages/LoginForm";

function App() {
	return (
		<div className="App">
			<header>
				<div className="left-block">
					<h3>(Logo)</h3>
					<h3>Information</h3>
				</div>
				<div className="right-block">
					<h2>Log In</h2>
					<h2>Help</h2>
				</div>
			</header>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="dash" element={<Dash />} />
						<Route path="login" element={<LoginForm />} />
						<Route path="signup" element={<NewUserForm />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
