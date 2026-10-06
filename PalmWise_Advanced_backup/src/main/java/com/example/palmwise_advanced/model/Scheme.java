package com.example.palmwise_advanced.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("schemes")
public class Scheme {

    @Id
    private Long id;

    private String name;
    private String description;
    private String targetCrop;
    private double minLandArea;
    private double maxLandArea;
    private String state;
    private String benefit;

    public Scheme() {
    }

    public Scheme(Long id, String name, String description,
                  String targetCrop, double minLandArea,
                  double maxLandArea, String state, String benefit) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.targetCrop = targetCrop;
        this.minLandArea = minLandArea;
        this.maxLandArea = maxLandArea;
        this.state = state;
        this.benefit = benefit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTargetCrop() {
        return targetCrop;
    }

    public void setTargetCrop(String targetCrop) {
        this.targetCrop = targetCrop;
    }

    public double getMinLandArea() {
        return minLandArea;
    }

    public void setMinLandArea(double minLandArea) {
        this.minLandArea = minLandArea;
    }

    public double getMaxLandArea() {
        return maxLandArea;
    }

    public void setMaxLandArea(double maxLandArea) {
        this.maxLandArea = maxLandArea;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getBenefit() {
        return benefit;
    }

    public void setBenefit(String benefit) {
        this.benefit = benefit;
    }
}