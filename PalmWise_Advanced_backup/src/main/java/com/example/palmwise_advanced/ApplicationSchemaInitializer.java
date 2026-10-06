package com.example.palmwise_advanced;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * Adds the officer_comment column to existing installations without
 * requiring the user to manually alter the MySQL table.
 */
@Configuration
public class ApplicationSchemaInitializer {

    @Bean
    CommandLineRunner ensureApplicationCommentColumn(JdbcTemplate jdbcTemplate) {
        return args -> {
            try {
                jdbcTemplate.execute(
                    "ALTER TABLE applications ADD COLUMN officer_comment VARCHAR(1000)"
                );
            } catch (Exception ignored) {
                // Column already exists (or the database version already contains it).
            }
        };
    }
}
