import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddMoviePage from "./pages/AddMoviePage";


function App(){
	return (
		<BrowserRouter>
			<nav className="navbar navbar-expand-lg text-bg-secondary p-3 mb-4">
				<div className="container-fluid">
					<h1 className="navbar-brand">Video Streamer</h1>
					<ul className="navbar-nav me-auto ml-4">
						<li className="nav-item">
							<Link className="nav-link text-light" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-light" to="/add_movie">Add Movie</Link>
						</li>
					</ul>
				</div>
			</nav>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/add_movie" element={<AddMoviePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
