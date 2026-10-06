package com.example.palmwise_advanced.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("outreach_tasks")
public class OutreachTask {

    @Id
    private Long id;

    private Long farmerId;
    private Long schemeId;
    private String status;
    private String priority;
    private String notes;
    private LocalDateTime createdAt;

    public OutreachTask() {
    }

    public OutreachTask(Long id, Long farmerId, Long schemeId,
                        String status, String priority,
                        String notes, LocalDateTime createdAt) {
        this.id = id;
        this.farmerId = farmerId;
        this.schemeId = schemeId;
        this.status = status;
        this.priority = priority;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}