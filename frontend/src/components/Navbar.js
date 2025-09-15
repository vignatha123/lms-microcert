import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
    return (
        <nav>
            <div>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                    LMS Micro-Cert
                </Link>
            </div>
            <div>
                {user ? (
                    <>
                        <span style={{ marginRight: 12 }}>{user.name}</span>
                        <button onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" style={{ marginLeft: 10 }}>
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;