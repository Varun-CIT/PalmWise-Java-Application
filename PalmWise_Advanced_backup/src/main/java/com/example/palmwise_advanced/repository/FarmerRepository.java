package com.example.palmwise_advanced.repository;

import com.example.palmwise_advanced.model.Farmer;
import org.springframework.data.repository.CrudRepository;

public interface FarmerRepository extends CrudRepository<Farmer, Long> {
}