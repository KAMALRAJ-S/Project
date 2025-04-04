import React, { useEffect, useState } from "react";
import "./Joblist.css";

const JobList = ({ fetchJobsTrigger }) => {
  const [jobs, setJobs] = useState([]);

  // Function to fetch the jobs from the backend
  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/detials");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Re-fetch when fetchJobsTrigger changes
  useEffect(() => {
    fetchJobs();
  }, [fetchJobsTrigger]);

  return (
    <div className="job-list-container">
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        jobs.map((job) => (
          <div className="job-card" key={job.id}>
            <div className="job-header">
              <img src={job.companyLogo} alt={job.companyName} className="company-logo" />
              <span className="time-badge">24h Ago</span>
            </div>
            <h3 className="job-title">{job.jobTitle}</h3>
            <div className="job-details">
              <span>👥 {job.experience} Exp</span>
              <span>🏢 {job.location}</span>
              <span>💰 {job.salaryMax} LPA</span>
            </div>
            <p className="job-description">{job.jobDescription}</p>
            <button className="apply-btn">Apply Now</button>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
