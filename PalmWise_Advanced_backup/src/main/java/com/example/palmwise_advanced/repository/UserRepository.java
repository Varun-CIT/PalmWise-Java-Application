package com.example.palmwise_advanced.repository;

import com.example.palmwise_advanced.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
}