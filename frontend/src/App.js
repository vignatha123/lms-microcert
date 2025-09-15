import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import API, { setAuthToken } from "./api";

function App() {
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setAuthToken(token);
    }, []);

    const onLogin = (authResp) => {
        localStorage.setItem("token", authResp.token);
        localStorage.setItem("user", JSON.stringify(authResp.user));
        setAuthToken(authResp.token);
        setUser(authResp.user);
        navigate("/");
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuthToken(null);
        setUser(null);
        navigate("/login");
    };

    return (
        <div>
            <Navbar user={user} onLogout={logout} />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Dashboard user={user} />} />
                    <Route path="/register" element={<Register onLogin={onLogin} />} />
                    <Route path="/login" element={<Login onLogin={onLogin} />} />
                    <Route path="/quiz/:quizId" element={<Quiz />} />
                    <Route path="/result/:id" element={<Result />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;