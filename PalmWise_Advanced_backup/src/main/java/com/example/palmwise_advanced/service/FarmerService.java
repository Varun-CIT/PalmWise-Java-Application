package com.example.palmwise_advanced.service;

import com.example.palmwise_advanced.model.Farmer;
import com.example.palmwise_advanced.repository.FarmerRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FarmerService {

    private final FarmerRepository farmerRepository;

    public FarmerService(FarmerRepository farmerRepository) {
        this.farmerRepository = farmerRepository;
    }

    public List<Farmer> getAllFarmers() {
        List<Farmer> farmers = new ArrayList<>();
        farmerRepository.findAll().forEach(farmers::add);
        return farmers;
    }

    public Farmer getFarmerById(Long id) {
        return farmerRepository.findById(id).orElse(null);
    }

    public Farmer addFarmer(Farmer farmer) {
        return farmerRepository.save(farmer);
    }

    public void deleteFarmer(Long id) {
        farmerRepository.deleteById(id);
    }
}