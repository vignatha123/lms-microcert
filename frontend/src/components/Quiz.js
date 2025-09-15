import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

const Quiz = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await API.get(`/quiz/${quizId}`);
                setQuestions(res.data.questions);
                setAnswers(new Array(res.data.questions.length).fill(null));
            } catch (err) {
                setError("Unable to load questions. Make sure you are logged in.");
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [quizId]);

    const selectOption = (optIndex) => {
        const copy = [...answers];
        copy[index] = optIndex;
        setAnswers(copy);
    };

    const next = () => index < questions.length - 1 && setIndex(index + 1);
    const prev = () => index > 0 && setIndex(index - 1);

    const submit = async () => {
        try {
            const res = await API.post("/result/submit", { quizId, answers });
            navigate(`/result/${res.data.result.id}`);
        } catch (err) {
            setError(err.response?.data?.message || "Submit failed");
        }
    };

    if (loading) return <div className="card">Loading...</div>;
    if (error) return <div className="card small" style={{ color: "red" }}>{error}</div>;
    if (!questions.length) return <div className="card">No questions found.</div>;

    const q = questions[index];

    return (
        <div className="card">
            <h3>Quiz: {quizId}</h3>
            <div className="question">
                <strong>
                    Q{index + 1}. {q.questionText}
                </strong>
            </div>
            <div>
                {q.options.map((opt, i) => (
                    <label key={i} className="option">
                        <input
                            type="radio"
                            checked={answers[index] === i}
                            onChange={() => selectOption(i)}
                        />{" "}
                        {opt}
                    </label>
                ))}
            </div>

            <div style={{ marginTop: 12 }}>
                <button onClick={prev} disabled={index === 0} style={{ marginRight: 8 }}>
                    Prev
                </button>
                {index < questions.length - 1 ? (
                    <button onClick={next}>Next</button>
                ) : (
                    <button onClick={submit}>Submit</button>
                )}
                <div className="small" style={{ marginTop: 8 }}>
                    Question {index + 1} of {questions.length}
                </div>
            </div>
        </div>
    );
};

export default Quiz;