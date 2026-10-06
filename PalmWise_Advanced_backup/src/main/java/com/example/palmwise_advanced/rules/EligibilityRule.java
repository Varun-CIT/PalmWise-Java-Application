package com.example.palmwise_advanced.rules;

import com.example.palmwise_advanced.model.Farmer;
import com.example.palmwise_advanced.model.Scheme;

public interface EligibilityRule {

    boolean isEligible(Farmer farmer, Scheme scheme);

    String getReason(Farmer farmer, Scheme scheme);
}