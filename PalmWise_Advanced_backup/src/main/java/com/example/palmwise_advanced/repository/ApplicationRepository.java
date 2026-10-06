package com.example.palmwise_advanced.repository;

import com.example.palmwise_advanced.model.Application;
import org.springframework.data.repository.CrudRepository;

public interface ApplicationRepository
        extends CrudRepository<Application, Long> {
}