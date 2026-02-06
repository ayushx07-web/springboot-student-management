package com.StudentManagement.Studentmanagement.model;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "students_table")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    @ElementCollection
    @CollectionTable(
            name = "student_courses",
            joinColumns = @JoinColumn(name = "student_id")
    )
    @Column(name = "course")
    private List<String> courses;

    // Constructors
    public Student() {}

    public Student(String name, String email, List<String> courses) {
        this.name = name;
        this.email = email;
        this.courses = courses;
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getCourses() {
        return courses;
    }

    public void setCourses(List<String> courses) {
        this.courses = courses;
    }
}
