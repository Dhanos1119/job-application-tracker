import { useEffect, useState } from "react";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Job Application Tracker</h1>

      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id} style={{ marginBottom: "10px" }}>
              <strong>{job.companyName}</strong> – {job.role}  
              <br />
              Status: <b>{job.status}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
