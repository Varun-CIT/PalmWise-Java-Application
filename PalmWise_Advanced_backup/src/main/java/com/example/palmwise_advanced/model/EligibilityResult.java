package com.example.palmwise_advanced.model;

import java.util.List;

public class EligibilityResult {

    private String schemeName;
    private boolean eligible;
    private List<String> reasons;

    public EligibilityResult() {
    }

    public EligibilityResult(String schemeName,
                             boolean eligible,
                             List<String> reasons) {
        this.schemeName = schemeName;
        this.eligible = eligible;
        this.reasons = reasons;
    }

    public String getSchemeName() {
        return schemeName;
    }

    public void setSchemeName(String schemeName) {
        this.schemeName = schemeName;
    }

    public boolean isEligible() {
        return eligible;
    }

    public void setEligible(boolean eligible) {
        this.eligible = eligible;
    }

    public List<String> getReasons() {
        return reasons;
    }

    public void setReasons(List<String> reasons) {
        this.reasons = reasons;
    }
}