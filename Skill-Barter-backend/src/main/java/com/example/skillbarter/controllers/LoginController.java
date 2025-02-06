package com.example.skillbarter.controllers;

import com.example.skillbarter.dtos.LoginUser;
import com.example.skillbarter.models.User;
import com.example.skillbarter.repositories.UserRepository;
import com.example.skillbarter.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from React frontend
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody LoginUser loginRequest) {
        // Check if email exists in database
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);
        if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        // Return success message
        return ResponseEntity.ok("Login successful");
    }
}
