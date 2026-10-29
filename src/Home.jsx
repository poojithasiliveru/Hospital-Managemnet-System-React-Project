
import React, { useContext } from "react";
import { HospitalContext } from "./App";
import { Link } from "react-router-dom";

function Home() {
  const hospitalinfo = useContext(HospitalContext);

  return (
    <div className="home">
      <h1>Welcome to CG Hospitals</h1>

      <p>
        We provide quality healthcare services to our patients.
        Our goal is to keep everyone healthy and happy.
      </p>

      <div className="info">
        <h2>Hospital Name: {hospitalinfo.HospitalName}</h2>
        <h3>CEO: {hospitalinfo.CEO}</h3>
      </div>

      <h2>Our Services</h2>

      <div className="services">
        <div className="card">
          <h3>Patient Care</h3>
          <p>We take care of our patients.</p>
        </div>

        <div className="card">
          <h3>Doctors</h3>
          <p>Our doctors help patients stay healthy.</p>
        </div>

        <div className="card">
          <h3>Health Checkup</h3>
          <p>Regular health checkups for everyone.</p>
        </div>
      </div>

      <Link to="/patients">View Patients</Link>
      {" "}
      <Link to="/doctors">View Doctors</Link>
    </div>
  );
}

export default Home;
