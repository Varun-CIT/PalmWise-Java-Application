package com.example.palmwise_advanced.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("applications")
public class Application {

    @Id
    private Long id;

    private Long farmerId;

    private Long schemeId;

    private String status;

    private String notes;

    private String officerComment;

    public Application() {
    }

    public Long getId() {
        return id;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public Long getSchemeId() {
        return schemeId;
    }

    public void setSchemeId(Long schemeId) {
        this.schemeId = schemeId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getOfficerComment() {
        return officerComment;
    }

    public void setOfficerComment(String officerComment) {
        this.officerComment = officerComment;
    }
}