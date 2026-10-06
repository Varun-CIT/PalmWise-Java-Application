package com.example.palmwise_advanced.model;

public class OfficerTaskView {

    private Long taskId;

    private Long farmerId;
    private String farmerName;
    private String phone;
    private String preferredLanguage;
    private String location;

    private Long schemeId;
    private String schemeName;
    private String benefit;

    private String status;
    private String priority;
    private String notes;

    public OfficerTaskView() {
    }

    public OfficerTaskView(
            Long taskId,
            Long farmerId,
            String farmerName,
            String phone,
            String preferredLanguage,
            String location,
            Long schemeId,
            String schemeName,
            String benefit,
            String status,
            String priority,
            String notes) {

        this.taskId = taskId;
        this.farmerId = farmerId;
        this.farmerName = farmerName;
        this.phone = phone;
        this.preferredLanguage = preferredLanguage;
        this.location = location;
        this.schemeId = schemeId;
        this.schemeName = schemeName;
        this.benefit = benefit;
        this.status = status;
        this.priority = priority;
        this.notes = notes;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public String getFarmerName() {
        return farmerName;
    }

    public void setFarmerName(String farmerName) {
        this.farmerName = farmerName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPreferredLanguage() {
        return preferredLanguage;
    }

    public void setPreferredLanguage(String preferredLanguage) {
        this.preferredLanguage = preferredLanguage;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getSchemeId() {
        return schemeId;
    }

    public void setSchemeId(Long schemeId) {
        this.schemeId = schemeId;
    }

    public String getSchemeName() {
        return schemeName;
    }

    public void setSchemeName(String schemeName) {
        this.schemeName = schemeName;
    }

    public String getBenefit() {
        return benefit;
    }

    public void setBenefit(String benefit) {
        this.benefit = benefit;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}