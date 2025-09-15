import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

const Result = () => {
    const { id } = useParams();
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await API.get(`/result/${id}`);
                setResult(res.data.result);
            } catch (err) {
                setError("Unable to fetch result.");
            }
        };
        fetch();
    }, [id]);

    const downloadCert = async () => {
        try {
            setDownloading(true);
            const resp = await API.get(`/cert/download / ${id}`, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(
                new Blob([resp.data], { type: "application/pdf" })
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `certificate_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setDownloading(false);
        } catch (err) {
            setDownloading(false);
            setError("Error downloading certificate.");
        }
    };

    if (error) return <div className="card small" style={{ color: "red" }}>{error}</div>;
    if (!result) return <div className="card">Loading result...</div>;

    return (
        <div className="card">
            <h3>Result</h3>
            <div>Score: {result.score} / {result.total}</div>
            <div>
                Status:{" "}
                {result.passed ? (
                    <span className="success">Passed</span>
                ) : (
                    <span className="fail">Failed</span>
                )}
            </div>
            <div style={{ marginTop: 12 }}>
                <button onClick={downloadCert} disabled={downloading}>
                    {downloading ? "Downloading..." : "Download Certificate"}
                </button>
            </div>
        </div>
    );
};

export default Result;