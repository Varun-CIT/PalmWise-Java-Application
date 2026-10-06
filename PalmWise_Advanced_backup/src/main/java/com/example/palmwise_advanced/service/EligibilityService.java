package com.example.palmwise_advanced.service;

import com.example.palmwise_advanced.model.Farmer;
import com.example.palmwise_advanced.model.OutreachTask;
import com.example.palmwise_advanced.model.Scheme;
import com.example.palmwise_advanced.rules.EligibilityRule;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EligibilityService {

    private final List<EligibilityRule> rules;
    private final OutreachTaskService outreachTaskService;

    public EligibilityService(
            List<EligibilityRule> rules,
            OutreachTaskService outreachTaskService) {

        this.rules = rules;
        this.outreachTaskService = outreachTaskService;
    }

    public boolean isEligible(Farmer farmer, Scheme scheme) {

        for (EligibilityRule rule : rules) {

            if (!rule.isEligible(farmer, scheme)) {
                return false;
            }
        }

        return true;
    }

    public List<String> getEligibilityReasons(
            Farmer farmer,
            Scheme scheme) {

        List<String> reasons = new ArrayList<>();

        for (EligibilityRule rule : rules) {

            if (rule.isEligible(farmer, scheme)) {

                reasons.add(
                        "✅ " + rule.getReason(farmer, scheme)
                );

            } else {

                reasons.add(
                        "❌ " + rule.getReason(farmer, scheme)
                );
            }
        }

        return reasons;
    }

    public OutreachTask createOutreachTaskIfEligible(
            Farmer farmer,
            Scheme scheme) {

        if (!isEligible(farmer, scheme)) {
            return null;
        }

        if (outreachTaskService.taskAlreadyExists(
                farmer.getId(),
                scheme.getId())) {

            return null;
        }

        OutreachTask task = new OutreachTask();

        task.setFarmerId(farmer.getId());
        task.setSchemeId(scheme.getId());
        task.setStatus("PENDING");
        task.setPriority("HIGH");

        task.setNotes(
                "Farmer is eligible for " +
                        scheme.getName() +
                        ". Officer should contact the farmer."
        );

        return outreachTaskService.createTask(task);
    }
}