import React, { useState } from "react";
import Navigation from "./Navigation";
import JobForm from "./Jobform";
import JobList from "./Joblist";
import "./App.css";

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [fetchJobsTrigger, setFetchJobsTrigger] = useState(0);

  const fetchJobs = () => {
    setFetchJobsTrigger(prev => prev + 1); // Trigger JobList update
  };

  return (
    <main id="main-container">
      <section id="nav-bar">
        <Navigation openForm={() => setIsFormOpen(true)} />
      </section>
      <section id="job-content">
        {isFormOpen && (
          <JobForm 
            onClose={() => setIsFormOpen(false)} 
            fetchJobs={fetchJobs} 
          />
        )}
        <JobList fetchJobsTrigger={fetchJobsTrigger} />
      </section>
    </main>
  );
};

export default App;
