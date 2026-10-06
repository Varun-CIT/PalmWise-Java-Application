package com.example.palmwise_advanced.controller;

import com.example.palmwise_advanced.model.Scheme;
import com.example.palmwise_advanced.service.SchemeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/schemes")
public class SchemeController {

    private final SchemeService schemeService;

    public SchemeController(SchemeService schemeService) {
        this.schemeService = schemeService;
    }

    @GetMapping
    public List<Scheme> getAllSchemes() {
        return schemeService.getAllSchemes();
    }

    @GetMapping("/{id}")
    public Scheme getSchemeById(@PathVariable Long id) {
        return schemeService.getSchemeById(id);
    }

    @PostMapping
    public Scheme addScheme(@RequestBody Scheme scheme) {
        return schemeService.addScheme(scheme);
    }

    @DeleteMapping("/{id}")
    public String deleteScheme(@PathVariable Long id) {
        schemeService.deleteScheme(id);
        return "Scheme deleted successfully";
    }
}