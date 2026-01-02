package com.ats.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ats.backend.model.Job;

public interface JobRepository extends MongoRepository<Job, String> {
}
