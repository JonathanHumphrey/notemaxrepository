// Asset and Component imports
import "./styles/App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Dash from "./pages/Dash";
import NewUserForm from "./pages/NewUserForm";
import FileViewer from "./components/FileViewer";
import LoginForm from "./pages/LoginForm";
import Header from "./pages/Header";


// React Tools
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="dash" element={<Dash />} />
						<Route path="dash/view" element={<FileViewer/>}/>
						<Route path="login" element={<LoginForm />} />
						<Route path="signup" element={<NewUserForm />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
