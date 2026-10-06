package com.example.palmwise_advanced.rules;

import com.example.palmwise_advanced.model.Farmer;
import com.example.palmwise_advanced.model.Scheme;
import org.springframework.stereotype.Component;

@Component
public class CropEligibilityRule implements EligibilityRule {

    @Override
    public boolean isEligible(Farmer farmer, Scheme scheme) {

        String targetCrop = scheme.getTargetCrop();

        if (targetCrop == null || targetCrop.equalsIgnoreCase("All")) {
            return true;
        }

        return targetCrop.equalsIgnoreCase(farmer.getCropType());
    }

    @Override
    public String getReason(Farmer farmer, Scheme scheme) {

        String targetCrop = scheme.getTargetCrop();

        if (targetCrop == null || targetCrop.equalsIgnoreCase("All")) {
            return "This scheme is applicable to all crops.";
        }

        if (targetCrop.equalsIgnoreCase(farmer.getCropType())) {
            return "Farmer's crop (" +
                    farmer.getCropType() +
                    ") matches the scheme's target crop (" +
                    targetCrop +
                    ").";
        }

        return "Farmer's crop (" +
                farmer.getCropType() +
                ") does not match the scheme's target crop (" +
                targetCrop +
                ").";
    }
}