package com.example.palmwise_advanced.controller;

import com.example.palmwise_advanced.model.Application;
import com.example.palmwise_advanced.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(
            ApplicationService applicationService) {

        this.applicationService = applicationService;
    }

    // Get all applications
    @GetMapping
    public List<Application> getAllApplications() {

        return applicationService.getAllApplications();
    }

    // Get application by ID
    @GetMapping("/{id}")
    public Application getApplicationById(
            @PathVariable Long id) {

        return applicationService.getApplicationById(id);
    }

    // Get applications of a farmer
    @GetMapping("/farmer/{farmerId}")
    public List<Application> getApplicationsByFarmer(
            @PathVariable Long farmerId) {

        return applicationService
                .getApplicationsByFarmer(farmerId);
    }

    // Submit an application
    @PostMapping
    public Application createApplication(
            @RequestParam Long farmerId,
            @RequestParam Long schemeId) {

        return applicationService
                .createApplication(farmerId, schemeId);
    }

    // Update application status
    @PutMapping("/{id}/status")
    public Application updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false, defaultValue = "") String comment) {

        return applicationService
                .updateStatus(id, status, comment);
    }
}