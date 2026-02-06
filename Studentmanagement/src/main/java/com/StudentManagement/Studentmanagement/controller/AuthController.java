package com.StudentManagement.Studentmanagement.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final String USER = "admin";
    private final String PASS = "admin123";

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {

        String username = body.get("username");
        String password = body.get("password");

        System.out.println("LOGIN TRY: " + username + " " + password);

        if (USER.equals(username) && PASS.equals(password)) {

            return Map.of("token", "demo-token-123456");
        }

        throw new RuntimeException("Invalid login");
    }
}
