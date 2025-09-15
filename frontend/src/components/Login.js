import React, { useState } from "react";
import API from "../api";

const Login = ({ onLogin }) => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", form);
            onLogin(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="card">
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div>
                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={change}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={change}
                        required
                    />
                </div>
                <div style={{ marginTop: 10 }}>
                    <button type="submit">Login</button>
                </div>
                {error && <div className="small" style={{ color: "red" }}>{error}</div>}
            </form>
        </div>
    );
};

export default Login;