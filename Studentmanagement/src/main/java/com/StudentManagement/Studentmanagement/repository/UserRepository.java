package com.StudentManagement.Studentmanagement.repository;

import com.StudentManagement.Studentmanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);
}
