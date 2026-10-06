package com.example.palmwise_advanced;

import com.example.palmwise_advanced.model.Scheme;
import com.example.palmwise_advanced.repository.SchemeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PalmWiseDemoSchemeInitializer {

    @Bean
    CommandLineRunner seedAdditionalSchemes(SchemeRepository schemeRepository) {
        return args -> {

            addIfMissing(
                    schemeRepository,
                    "Coconut Cultivation Support Scheme",
                    "Support for coconut cultivation, orchard maintenance and productivity improvement.",
                    "All", 0.5, 25, "Tamil Nadu",
                    "Support for coconut cultivation and farm inputs"
            );

            addIfMissing(
                    schemeRepository,
                    "Oil Palm Development Assistance",
                    "Assistance for oil-palm establishment, maintenance and productivity improvement.",
                    "All", 0.5, 50, "Tamil Nadu",
                    "Support for oil-palm cultivation"
            );

            addIfMissing(
                    schemeRepository,
                    "Cash Crop Cultivation Support",
                    "Support programme for farmers cultivating commercially important cash crops.",
                    "All", 0.5, 50, "Tamil Nadu",
                    "Support for cash-crop cultivation"
            );

            addIfMissing(
                    schemeRepository,
                    "Cereal Productivity Support",
                    "Support for cereal cultivation, productivity improvement and farm inputs.",
                    "All", 0.5, 50, "Tamil Nadu",
                    "Support for cereal cultivation"
            );

            addIfMissing(
                    schemeRepository,
                    "Cashew & Nut Crop Development Support",
                    "Support for cashew, badam and other nut-bearing crops through orchard development and farm inputs.",
                    "All", 0.5, 40, "Tamil Nadu",
                    "Support for cashew, badam and nut crop cultivation"
            );

            addIfMissing(
                    schemeRepository,
                    "Cereals & Pulses Cultivation Assistance",
                    "Support for cereals and pulses such as toor dal, bengal gram and other food-grain crops.",
                    "All", 0.5, 50, "Tamil Nadu",
                    "Support for cereal and pulse cultivation"
            );

            addIfMissing(
                    schemeRepository,
                    "Tree Plantation & Agroforestry Support",
                    "Support for growing neem, teak, coconut and other useful trees through plantation and maintenance assistance.",
                    "All", 0.5, 60, "Tamil Nadu",
                    "Support for tree plantation and agroforestry"
            );

            addIfMissing(
                    schemeRepository,
                    "Cotton & Turmeric Crop Support",
                    "Support for cotton, turmeric and other commercial field crops through cultivation and farm-input assistance.",
                    "All", 0.5, 50, "Tamil Nadu",
                    "Support for cotton and turmeric cultivation"
            );
        };
    }

    private void addIfMissing(
            SchemeRepository repository,
            String name,
            String description,
            String targetCrop,
            double minLandArea,
            double maxLandArea,
            String state,
            String benefit) {

        boolean exists = false;

        for (Scheme scheme : repository.findAll()) {
            if (scheme.getName().equalsIgnoreCase(name)) {
                exists = true;
                break;
            }
        }

        if (!exists) {
            Scheme scheme = new Scheme();

            scheme.setName(name);
            scheme.setDescription(description);
            scheme.setTargetCrop(targetCrop);
            scheme.setMinLandArea(minLandArea);
            scheme.setMaxLandArea(maxLandArea);
            scheme.setState(state);
            scheme.setBenefit(benefit);

            repository.save(scheme);
        }
    }
}