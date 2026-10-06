package com.example.palmwise_advanced.service;

import com.example.palmwise_advanced.model.Scheme;
import com.example.palmwise_advanced.repository.SchemeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SchemeService {

    private final SchemeRepository schemeRepository;

    public SchemeService(SchemeRepository schemeRepository) {
        this.schemeRepository = schemeRepository;
    }

    public List<Scheme> getAllSchemes() {
        List<Scheme> schemes = new ArrayList<>();
        schemeRepository.findAll().forEach(schemes::add);
        return schemes;
    }

    public Scheme getSchemeById(Long id) {
        return schemeRepository.findById(id).orElse(null);
    }

    public Scheme addScheme(Scheme scheme) {
        return schemeRepository.save(scheme);
    }

    public void deleteScheme(Long id) {
        schemeRepository.deleteById(id);
    }
}