package com.example.palmwise_advanced.repository;

import com.example.palmwise_advanced.model.OutreachTask;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OutreachTaskRepository
        extends CrudRepository<OutreachTask, Long> {

    boolean existsByFarmerIdAndSchemeIdAndStatus(
            Long farmerId,
            Long schemeId,
            String status
    );

    List<OutreachTask> findByStatus(String status);
}