import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReportById } from '../services/api';

const ReportView = ({ isLoggedIn }) => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        console.log('Fetching report with ID:', id);
        const { data } = await getReportById(id);
        console.log('Report data received:', data);
        setReport(data);
      } catch (err) {
        console.error('Error fetching report:', err);
      }
    }
    if (isLoggedIn && id) {
      fetchReport();
    } else {
      console.log('Not fetching report - isLoggedIn:', isLoggedIn, 'id:', id);
    }
  }, [id, isLoggedIn]);

  if (!report) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Report for {report.fileName}</h1>
      <pre>{report.reviewContent}</pre>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
};

export default ReportView;