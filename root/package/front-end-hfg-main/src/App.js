// Asset and Component imports
import "./styles/App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Dash from "./pages/Dash";
import NewUserForm from "./pages/NewUserForm";
import FileViewer from "./components/FileViewer";
import LoginForm from "./pages/LoginForm";
import YourNotes from "./pages/YourNotes";
import YourCategories from "./pages/YourCategories";

// React Tools
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	let doc = document.getElementsByClassName("App");
	console.log(doc);
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="dash" element={<Dash />} />
						<Route path="dash/view" element={<FileViewer />} />
						<Route path="user-notes" element={<YourNotes />} />
						<Route path="user-categories" element={<YourCategories />} />
						<Route path="login" element={<LoginForm />} />
						<Route path="signup" element={<NewUserForm />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
