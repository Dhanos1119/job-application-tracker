import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ---------------- FETCH JOBS ----------------
  const fetchJobs = async () => {
    const res = await fetch("http://localhost:8080/api/jobs");
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ---------------- ADD / UPDATE JOB ----------------
  const handleSubmit = async () => {
    if (!companyName || !role) {
      alert("Company name and role are required");
      return;
    }

    const jobData = {
      companyName,
      role,
      status: "APPLIED",
      appliedDate: "2026-01-01",
    };

    if (editingId) {
      await fetch(`http://localhost:8080/api/jobs/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
      setEditingId(null);
    } else {
      await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
    }

    setCompanyName("");
    setRole("");
    fetchJobs();
  };

  // ---------------- DELETE JOB ----------------
  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    await fetch(`http://localhost:8080/api/jobs/${id}`, {
      method: "DELETE",
    });

    fetchJobs();
  };

  // ---------------- UPDATE STATUS ----------------
  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:8080/api/jobs/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    fetchJobs();
  };

  // ---------------- EDIT JOB ----------------
  const editJob = (job) => {
    setEditingId(job.id);
    setCompanyName(job.companyName);
    setRole(job.role);
  };

  return (
    <div className="app-container">
      <h1>Job Application Tracker</h1>

      {/* FORM */}
      <div className="form">
        <input
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={handleSubmit}>
          {editingId ? "Update Job" : "Add Job"}
        </button>
      </div>

      {/* JOB LIST */}
      <ul className="job-list">
        {jobs.map((job) => (
          <li key={job.id} className="job-card">
            <div className="job-title">
              {job.companyName} – {job.role}
            </div>

            Status:{" "}
            <span className={`status ${job.status}`}>
              {job.status}
            </span>

            <br />

            <select
              value={job.status}
              onChange={(e) => updateStatus(job.id, e.target.value)}
            >
              <option value="APPLIED">APPLIED</option>
              <option value="INTERVIEW">INTERVIEW</option>
              <option value="OFFER">OFFER</option>
              <option value="REJECTED">REJECTED</option>
            </select>

            <div className="actions">
              <button className="edit" onClick={() => editJob(job)}>
                Edit
              </button>
              <button className="delete" onClick={() => deleteJob(job.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
