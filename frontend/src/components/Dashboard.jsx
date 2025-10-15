import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { uploadCode, getReports, anonymousUploadCode } from '../services/api';
import '../Dashboard.css';

const Dashboard = ({ isLoggedIn, onLogout }) => {
  const [file, setFile] = useState(null);
  const [reports, setReports] = useState([]);
  const [review, setReview] = useState('');
  const [fileName, setFileName] = useState('No file chosen');

  useEffect(() => {
    if (isLoggedIn) {
      fetchReports();
    }
  }, [isLoggedIn]);

  const fetchReports = async () => {
    try {
      const { data } = await getReports();
      setReports(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name || 'No file chosen');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('codeFile', file);
    try {
      let response;
      if (isLoggedIn) {
        response = await uploadCode(formData);
        setReview(response.data.report.reviewContent);
        fetchReports();
      } else {
        response = await anonymousUploadCode(formData);
        setReview(response.data.reviewContent);
      }
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="container">
      <h1>Code Review Assistant</h1>
      <p>Upload your code file and get an instant review powered by Gemini.</p>
      <form onSubmit={handleUpload}>
        <div className="file-upload">
          <label htmlFor="file-input">
            <span className="choose-btn">Choose File</span>
            <span className="file-name">{fileName}</span>
          </label>
          <input id="file-input" type="file" onChange={handleFileChange} required />
        </div>
        <button className="review-btn" type="submit">Review My Code</button>
      </form>
      {review && (
        <div className="review-display">
          <h2>Review:</h2>
          <pre>{review}</pre>
        </div>
      )}
      {isLoggedIn ? (
        <>
          <div className="history-section">
            <h2>Previous Reports</h2>
            <ul>
              {reports.map((report) => (
                <li key={report.id}>
                  {report.fileName} - {new Date(report.createdAt).toLocaleString()}
                  <Link to={`/report/${report.id}`}>View</Link>
                </li>
              ))}
            </ul>
          </div>
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </>
      ) : (
        <div className="auth-links">
          <p>Want to save your reports? <Link to="/login">Login</Link> or <Link to="/register">Register</Link></p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;