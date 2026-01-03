import { useEffect, useState } from "react";

function App() {
  const [jobs, setJobs] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");

  // Fetch jobs
  useEffect(() => {
    fetch("http://localhost:8080/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  // Add job
  const addJob = async (e) => {
    e.preventDefault();

    const newJob = {
      companyName,
      role,
      status: "APPLIED",
      appliedDate: "2026-01-01"
    };

    const res = await fetch("http://localhost:8080/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newJob)
    });

    const savedJob = await res.json();
    setJobs([...jobs, savedJob]);

    setCompanyName("");
    setRole("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Application Tracker</h1>

      {/* ADD JOB FORM */}
      <form onSubmit={addJob}>
        <input
          placeholder="Company "
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          required
        />
        <input
          placeholder="Role"
          value={role}
          onChange={e => setRole(e.target.value)}
          required
        />
        <button type="submit">Add Job</button>
      </form>

      <hr />

      {/* JOB LIST */}
      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        <ul>
          {jobs.map(job => (
            <li key={job.id}>
              <b>{job.companyName}</b> – {job.role} <br />
              Status: <b>{job.status}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
