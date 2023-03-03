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
				<h1>NoteMax</h1>
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
