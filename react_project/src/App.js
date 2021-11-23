import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import Create from './components/Create';
import About from './components/About';
import Error from './components/Error';
import Note from './components/Note';

function App() {

	return (
		<>
			<div className="main">
				<Router>
					<Header></Header>
					<div className="container">
						<Routes>
							<Route exact path="/" element={<Main />} />
							<Route path="/about" element={<About />} />
							<Route path="/create" element={<Create />} />
							<Route exact path="/note/" element={<Note />} />
							<Route path="/note/:noteURL" element={<Note />} />
							<Route path="*" element={<Error />} />
						</Routes>
					</div>
				</Router>
			</div>
			<Footer />
		</>
	);
}

export default App;
