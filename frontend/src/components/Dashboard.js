import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ user }) => {
    return (
        <div>
            <h2>Welcome to the Micro-Certification Portal</h2>
            <p className="small">
                Take short quizzes, view results, and download certificates.
            </p>

            <div className="card">
                <h3>Available Quizzes</h3>
                <div>
                    <h4>JS Basics</h4>
                    <p className="small">Quick 3-question MCQ quiz.</p>
                    {user ? (
                        <Link to="/quiz/js-basics">
                            <button>Start Quiz</button>
                        </Link>
                    ) : (
                        <p className="small">Please login to start the quiz.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;