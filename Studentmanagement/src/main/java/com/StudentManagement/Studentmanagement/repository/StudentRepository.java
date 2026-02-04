package com.StudentManagement.Studentmanagement.repository;

import com.StudentManagement.Studentmanagement.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // Search by name
    List<Student> findByNameContainingIgnoreCase(String name);
}
