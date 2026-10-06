package com.example.palmwise_advanced.service;

import com.example.palmwise_advanced.model.Application;
import com.example.palmwise_advanced.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public List<Application> getAllApplications() {

        List<Application> applications = new ArrayList<>();

        applicationRepository.findAll()
                .forEach(applications::add);

        return applications;
    }

    public Application getApplicationById(Long id) {

        return applicationRepository
                .findById(id)
                .orElse(null);
    }

    public List<Application> getApplicationsByFarmer(Long farmerId) {

        List<Application> applications = new ArrayList<>();

        for (Application application : applicationRepository.findAll()) {

            if (application.getFarmerId().equals(farmerId)) {
                applications.add(application);
            }
        }

        return applications;
    }

    public Application createApplication(
            Long farmerId,
            Long schemeId) {

        // Prevent duplicate application
        for (Application application : applicationRepository.findAll()) {

            if (application.getFarmerId().equals(farmerId)
                    && application.getSchemeId().equals(schemeId)) {

                return application;
            }
        }

        Application application = new Application();

        application.setFarmerId(farmerId);
        application.setSchemeId(schemeId);
        application.setStatus("SUBMITTED");
        application.setNotes(
                "Application submitted successfully."
        );

        return applicationRepository.save(application);
    }

    public Application updateStatus(
            Long applicationId,
            String status,
            String comment) {

        Application application =
                applicationRepository
                        .findById(applicationId)
                        .orElse(null);

        if (application == null) {
            return null;
        }

        // A final decision is immutable: an approved/rejected application
        // must never re-enter the officer queue or be changed again.
        if ("APPROVED".equalsIgnoreCase(application.getStatus())
                || "REJECTED".equalsIgnoreCase(application.getStatus())) {
            return application;
        }

        application.setStatus(status);

        if (comment != null && !comment.trim().isEmpty()) {
            application.setOfficerComment(comment.trim());
        }

        if (status.equalsIgnoreCase("UNDER_REVIEW")) {

            application.setNotes(
                    "Application is currently under review."
            );

        } else if (status.equalsIgnoreCase("APPROVED")) {

            application.setNotes(
                    "Application has been approved."
            );

        } else if (status.equalsIgnoreCase("REJECTED")) {

            application.setNotes(
                    "Application has been rejected."
            );
        }

        return applicationRepository.save(application);
    }
}