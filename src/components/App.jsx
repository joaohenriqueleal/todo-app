import {
    HashRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { useState } from 'react';

import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';

export default function App() {
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        authenticated ? <Home /> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/login"
                    element={
                        authenticated ? (
                            <Navigate to="/" />
                        ) : (
                            <Login setAuth={setAuthenticated} />
                        )
                    }
                />
                <Route
                    path="/registro"
                    element={
                        authenticated ? (
                            <Navigate to="/" />
                        ) : (
                            <Register setAuth={setAuthenticated} />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}
