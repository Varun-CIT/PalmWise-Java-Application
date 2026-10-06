package com.example.palmwise_advanced.rules;

import com.example.palmwise_advanced.model.Farmer;
import com.example.palmwise_advanced.model.Scheme;
import org.springframework.stereotype.Component;

@Component
public class LandAreaEligibilityRule implements EligibilityRule {

    @Override
    public boolean isEligible(Farmer farmer, Scheme scheme) {

        double landArea = farmer.getLandArea();

        return landArea >= scheme.getMinLandArea()
                && landArea <= scheme.getMaxLandArea();
    }

    @Override
    public String getReason(Farmer farmer, Scheme scheme) {

        return "Farmer's land area (" +
                farmer.getLandArea() +
                " acres) is within the scheme's eligible range (" +
                scheme.getMinLandArea() +
                " - " +
                scheme.getMaxLandArea() +
                " acres).";
    }
}