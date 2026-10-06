package com.example.palmwise_advanced.controller;

import com.example.palmwise_advanced.model.EligibilityResult;
import com.example.palmwise_advanced.model.Farmer;
import com.example.palmwise_advanced.model.Scheme;
import com.example.palmwise_advanced.service.EligibilityService;
import com.example.palmwise_advanced.service.FarmerService;
import com.example.palmwise_advanced.service.SchemeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/farmers")
public class FarmerController {

    private final FarmerService farmerService;
    private final SchemeService schemeService;
    private final EligibilityService eligibilityService;

    public FarmerController(FarmerService farmerService,
                            SchemeService schemeService,
                            EligibilityService eligibilityService) {
        this.farmerService = farmerService;
        this.schemeService = schemeService;
        this.eligibilityService = eligibilityService;
    }

    @GetMapping
    public List<Farmer> getAllFarmers() {
        return farmerService.getAllFarmers();
    }

    @GetMapping("/{id}")
    public Farmer getFarmerById(@PathVariable Long id) {
        return farmerService.getFarmerById(id);
    }

    @PostMapping
    public Farmer addFarmer(@RequestBody Farmer farmer) {
        return farmerService.addFarmer(farmer);
    }

    @DeleteMapping("/{id}")
    public String deleteFarmer(@PathVariable Long id) {
        farmerService.deleteFarmer(id);
        return "Farmer deleted successfully";
    }

    @GetMapping("/{farmerId}/eligible-schemes")
    public List<Scheme> getEligibleSchemes(@PathVariable Long farmerId) {

        Farmer farmer = farmerService.getFarmerById(farmerId);

        if (farmer == null) {
            return List.of();
        }

        return schemeService.getAllSchemes()
                .stream()
                .filter(scheme -> {
                    boolean eligible =
                            eligibilityService.isEligible(farmer, scheme);

                    if (eligible) {
                        eligibilityService.createOutreachTaskIfEligible(
                                farmer, scheme);
                    }

                    return eligible;
                })
                .toList();}

    @GetMapping("/{farmerId}/scheme-analysis/{schemeId}")
    public EligibilityResult analyzeScheme(
            @PathVariable Long farmerId,
            @PathVariable Long schemeId) {

        Farmer farmer = farmerService.getFarmerById(farmerId);
        Scheme scheme = schemeService.getSchemeById(schemeId);

        if (farmer == null || scheme == null) {
            return new EligibilityResult(
                    "Unknown Scheme",
                    false,
                    List.of("Farmer or scheme not found.")
            );
        }

        boolean eligible =
                eligibilityService.isEligible(farmer, scheme);

        List<String> reasons =
                eligibilityService.getEligibilityReasons(farmer, scheme);

        return new EligibilityResult(
                scheme.getName(),
                eligible,
                reasons
        );
    }
}