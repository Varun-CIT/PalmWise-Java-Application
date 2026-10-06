package com.example.palmwise_advanced.controller;

import com.example.palmwise_advanced.model.RegisterRequest;
import com.example.palmwise_advanced.model.User;
import com.example.palmwise_advanced.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ==============================
    // LOGIN
    // ==============================

    @PostMapping("/login")
    public User login(
            @RequestParam String username,
            @RequestParam String password) {

        User user =
                authService.login(username, password);

        if (user == null) {
            throw new RuntimeException(
                    "Invalid username or password"
            );
        }

        return user;
    }

    // ==============================
    // FARMER REGISTRATION
    // ==============================

    @PostMapping("/register")
    public User register(
            @RequestBody RegisterRequest request) {

        return authService.register(request);
    }
}