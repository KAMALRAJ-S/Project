import React, { useState } from "react";
import "./Jobform.css";

const JobForm = ({ onClose, fetchJobs }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "FullTime",
    salaryMin: "",
    salaryMax: "",
    applicationDeadline: "",
    jobDescription: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/detials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Job submitted successfully:", formData);
        fetchJobs(); // Refresh job list
      } else {
        console.error("Failed to submit job");
      }
    } catch (error) {
      console.error("Error submitting job:", error);
    }

    onClose();
  };

  return (
    <div className="job-form-overlay" onClick={onClose}>
      <div className="job-form-container" onClick={(e) => e.stopPropagation()}>
        <h2>Create Job Opening</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-group-group">
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Enter job title"
                required
              />
            </div>
            <div className="form-group-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Amazon, Microsoft, Swiggy"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-group">
              <label>Location</label>
              <select name="location" value={formData.location} onChange={handleChange} required>
                <option value="">Choose Preferred Location</option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>

            <div className="form-group-group">
              <label>Job Type</label>
              <select name="jobType" value={formData.jobType} onChange={handleChange}>
                <option value="FullTime">FullTime</option>
                <option value="PartTime">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-group">
              <label>Salary Range</label>
              <div className="salary-inputs">
                <input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  placeholder="₹ 0"
                  required
                />
                <input
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  placeholder="₹ 12,00,000"
                  required
                />
              </div>
            </div>

            <div className="form-group-group">
              <label>Application Deadline</label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-group">
              <label>Job Description</label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                placeholder="Job role details"
                required
              ></textarea>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="publish">Publish »</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
