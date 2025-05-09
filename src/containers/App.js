// import logo from './logo.svg';
// import './App.css';
import Login from './Login';
import { GalleryMenu } from './GalleryMenu';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {
    const key = useSelector(state => state.loginStore);
    return (
        <Router>
            <b>Authkey: </b><i>{key.data}</i>
            <ul>
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                {/* <li><Link to="/new">New Task</Link></li> */}
            </ul>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/gallery" element={<GalleryMenu />} />
                {/* <Route path="/table" element={<Table />} />
      <Route path="/form/:id" element={<Forms />} />  */}
            </Routes>
        </Router>
        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>
    );
}

export default App;
