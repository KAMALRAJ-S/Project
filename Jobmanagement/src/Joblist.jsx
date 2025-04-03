import React, { useEffect, useState } from "react";

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/jobs/")
            .then(response => response.json())
            .then(data => setJobs(data))
            .catch(error => console.error("Error fetching jobs:", error));
    }, []);

    return (
        <div className="job-list">
            {jobs.map(job => (
                <div className="job-card" key={job.id}>
                    <h3>{job.job_title}</h3>
                    <p><b>Company:</b> {job.company_name}</p>
                    <p><b>Location:</b> {job.location}</p>
                    <p><b>Salary:</b> ₹{job.salary_min} - ₹{job.salary_max}</p>
                    <button>Apply Now »</button>
                </div>
            ))}
        </div>
    );
};

export default JobList;
