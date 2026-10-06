package com.example.palmwise_advanced.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("farmers")
public class Farmer {

    @Id
    private Long id;

    private String name;
    private String phone;
    private String preferredLanguage;
    private String location;
    private String state;
    private double landArea;
    private String cropType;

    // Default constructor
    public Farmer() {
    }

    // Parameterized constructor
    public Farmer(Long id, String name, String phone,
                  String preferredLanguage, String location,
                  double landArea, String cropType) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.preferredLanguage = preferredLanguage;
        this.location = location;
        this.state = state;
        this.landArea = landArea;
        this.cropType = cropType;
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
    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public double getLandArea() {
        return landArea;
    }

    public void setLandArea(double landArea) {
        this.landArea = landArea;
    }

    public String getCropType() {
        return cropType;
    }

    public void setCropType(String cropType) {
        this.cropType = cropType;
    }
}