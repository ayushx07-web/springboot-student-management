package com.StudentManagement.Studentmanagement.service;

import com.StudentManagement.Studentmanagement.model.Student;

import java.util.List;

public interface StudentService {

    Student saveStudent(Student student);

    List<Student> getAllStudents();

    Student getStudentById(Long id);

    Student updateStudent(Long id, Student student);

    void deleteStudent(Long id);

    List<Student> searchByName(String name);

}
