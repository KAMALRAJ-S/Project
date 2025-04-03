import React, { useState, useRef, useEffect } from "react";
import logo from "./assets/logo.png";
import search from "./assets/search.png";
import location from "./assets/location.png";
import jtype from "./assets/jtype.png";
import JobForm from "./Jobform"; // Import the JobForm component
import "./style.css";

const Navigation = () => {
  const minSalary = 20000;
  const maxSalary = 100000;
  const step = 5000;

  const [minValue, setMinValue] = useState(50000);
  const [maxValue, setMaxValue] = useState(80000);
  const [isFormOpen, setIsFormOpen] = useState(false); // Controls pop-up visibility

  const trackRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);

  useEffect(() => {
    updateThumbPositions();
  }, [minValue, maxValue]);

  const updateThumbPositions = () => {
    const minPercent = ((minValue - minSalary) / (maxSalary - minSalary)) * 100;
    const maxPercent = ((maxValue - minSalary) / (maxSalary - minSalary)) * 100;

    if (minThumbRef.current && maxThumbRef.current && trackRef.current) {
      minThumbRef.current.style.left = `${minPercent}%`;
      maxThumbRef.current.style.left = `${maxPercent}%`;
      trackRef.current.style.left = `${minPercent}%`;
      trackRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  };

  const handleMouseMove = (event, isMin) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.parentElement.getBoundingClientRect();
    let offsetX = event.clientX - rect.left;
    let percent = Math.max(0, Math.min((offsetX / rect.width) * 100, 100));
    let value = Math.round((minSalary + (percent / 100) * (maxSalary - minSalary)) / step) * step;

    if (isMin) {
      setMinValue(Math.max(minSalary, Math.min(value, maxValue - step)));
    } else {
      setMaxValue(Math.min(maxSalary, Math.max(value, minValue + step)));
    }
  };

  const handleMouseDown = (event, isMin) => {
    event.preventDefault();

    const moveHandler = (e) => handleMouseMove(e, isMin);
    const upHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  };

  return (
    <main id="main-container">
      <nav id="nav-container">
        <ul id="nav-itemcontainer">
          <li><img src={logo} alt="logo" /></li>
          <li><button className="nav-button">Home</button></li>
          <li><button className="nav-button">Find Jobs</button></li>
          <li><button className="nav-button">Find Talents</button></li>
          <li><button className="nav-button">About us</button></li>
          <li><button className="nav-button">Testimonials</button></li>
          <li className="nav-create-container">
            <div className="hover-trigger" onClick={() => setIsFormOpen(true)}></div>
            <button className="nav-createbtn"></button>
            <span id="span-container">
              <span id="crjobs" onClick={() => setIsFormOpen(true)}>Create Jobs</span>
              <span id="logn">Login</span>
            </span>
          </li>
        </ul>
      </nav>

      <section id="filter-area">
        <ul id="filter-container">
          <li id="f1">
            <img src={search} alt="search" />
            <input type="search" placeholder="Search By Job Title, Role" />
          </li>
          <li><div className="vertical-line"></div></li>
          <li id="f2">
            <img src={location} alt="search" />
            <select className="dropdown" defaultValue="">
              <option value="" disabled hidden>Preferred Location</option>
              <option value="chennai">Chennai</option>
              <option value="bangalore">Bangalore</option>
              <option value="hyderabad">Hyderabad</option>
            </select>
          </li>
          <li><div className="vertical-line"></div></li>
          <li id="f3">
            <img src={jtype} alt="job type" />
            <select className="dropdown" defaultValue="">
              <option value="" disabled hidden>Job type</option>
              <option value="internship">Internship</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </li>
          <li><div className="vertical-line"></div></li>
          <li id="f4">
            <div className="salary-container">
              <div className="salary-label">Salary Per Month</div>
              <div className="salary-value">
                <span>₹{(minValue / 1000).toFixed(0)}k - ₹</span>
                <span>{(maxValue / 1000).toFixed(0)}k</span>
              </div>
              <div className="range-slider-container">
                <div className="range-slider">
                  <div className="slider-bar" ref={trackRef}></div>
                  <div className="slider-thumb" ref={minThumbRef} onMouseDown={(e) => handleMouseDown(e, true)}></div>
                  <div className="slider-thumb" ref={maxThumbRef} onMouseDown={(e) => handleMouseDown(e, false)}></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>

      {/* Job Creation Form Pop-up */}
      {isFormOpen && <JobForm onClose={() => setIsFormOpen(false)} />}
    </main>
  );
};

export default Navigation;
