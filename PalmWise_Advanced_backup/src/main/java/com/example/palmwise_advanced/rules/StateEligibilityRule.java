package com.example.palmwise_advanced.rules;

import com.example.palmwise_advanced.model.Farmer;
import com.example.palmwise_advanced.model.Scheme;
import org.springframework.stereotype.Component;

@Component
public class StateEligibilityRule implements EligibilityRule {

    @Override
    public boolean isEligible(Farmer farmer, Scheme scheme) {

        String schemeState = scheme.getState();

        if (schemeState == null || schemeState.equalsIgnoreCase("All")) {
            return true;
        }

        return schemeState.equalsIgnoreCase(farmer.getState());
    }

    @Override
    public String getReason(Farmer farmer, Scheme scheme) {

        String schemeState = scheme.getState();

        if (schemeState == null || schemeState.equalsIgnoreCase("All")) {
            return "This scheme is available in all states.";
        }

        return "Farmer's state (" +
                farmer.getState() +
                ") matches the scheme's eligible state (" +
                schemeState +
                ").";
    }
}