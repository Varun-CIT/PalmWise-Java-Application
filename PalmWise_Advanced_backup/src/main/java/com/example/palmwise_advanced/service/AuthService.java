package com.example.palmwise_advanced.service;

import com.example.palmwise_advanced.model.Farmer;
import com.example.palmwise_advanced.model.RegisterRequest;
import com.example.palmwise_advanced.model.User;
import com.example.palmwise_advanced.repository.FarmerRepository;
import com.example.palmwise_advanced.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final FarmerRepository farmerRepository;

    public AuthService(
            UserRepository userRepository,
            FarmerRepository farmerRepository) {

        this.userRepository = userRepository;
        this.farmerRepository = farmerRepository;
    }

    // ==============================
    // LOGIN
    // ==============================

    public User login(String username, String password) {

        User user = userRepository.findByUsername(username);

        if (user == null) {
            return null;
        }

        if (!user.getPassword().equals(password)) {
            return null;
        }

        return user;
    }

    // ==============================
    // REGISTRATION
    // ==============================

    public User register(RegisterRequest request) {

        // Check whether username already exists
        User existingUser =
                userRepository.findByUsername(request.getUsername());

        if (existingUser != null) {
            throw new RuntimeException(
                    "Username already exists"
            );
        }

        // ==============================
        // CREATE FARMER
        // ==============================

        Farmer farmer = new Farmer();

        farmer.setName(request.getName());
        farmer.setPhone(request.getPhone());

        // Farmer model uses preferredLanguage
        farmer.setPreferredLanguage(
                request.getLanguage()
        );

        farmer.setLocation(request.getLocation());
        farmer.setState(request.getState());
        farmer.setLandArea(request.getLandArea());

        // Farmer model uses cropType
        farmer.setCropType(
                request.getCrop()
        );

        Farmer savedFarmer =
                farmerRepository.save(farmer);

        // ==============================
        // CREATE USER ACCOUNT
        // ==============================

        User user = new User();

        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());

        // Every registered account through
        // this endpoint is a farmer
        user.setRole("FARMER");

        // Link user account to farmer profile
        user.setFarmerId(
                savedFarmer.getId()
        );

        return userRepository.save(user);
    }
}