package com.ats.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ats.backend.model.Job;
import com.ats.backend.model.JobStatus;
import com.ats.backend.repository.JobRepository;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin
public class JobController {

    private final JobRepository jobRepository;

    public JobController(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // ---------------- CREATE ----------------
    @PostMapping
    public Job addJob(@RequestBody Job job) {
        return jobRepository.save(job);
    }

    // ---------------- READ ALL ----------------
    @GetMapping
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // ---------------- UPDATE STATUS ----------------
@PutMapping("/{id}/status")
public Job updateJobStatus(
        @PathVariable String id,
        @RequestBody UpdateStatusRequest request
) {
    Job job = jobRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Job not found"));

    try {
        JobStatus status = JobStatus.valueOf(
                request.getStatus().trim().toUpperCase()
        );
        job.setStatus(status);
    } catch (IllegalArgumentException e) {
        throw new RuntimeException("Invalid job status: " + request.getStatus());
    }

    return jobRepository.save(job);
}



    // ---------------- DELETE ----------------
    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable String id) {
        jobRepository.deleteById(id);
    }
}
