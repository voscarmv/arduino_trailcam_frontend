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
    const notifications = useSelector(state => state.notificationStore);
    return (
        <Router>
            <b>Authkey: </b><i>{key.data}</i><br></br>
            <b>Notifications:</b><i>{notifications.data}</i>
            <ul>
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
            </ul>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/gallery" element={<GalleryMenu />} />
            </Routes>
        </Router>
    );
}

export default App;
