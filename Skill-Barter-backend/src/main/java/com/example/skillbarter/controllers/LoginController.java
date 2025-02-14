package com.example.skillbarter.controllers;

import com.example.skillbarter.dtos.LoginUser;
import com.example.skillbarter.models.User;
import com.example.skillbarter.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
// Allow requests from React frontend
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody LoginUser loginRequest) {
        // Check if email exists in database
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);
        if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        // ✅ Return userId along with the success message
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("userId", user.getUserId()); // Send userId in response

        return ResponseEntity.ok(response);
    }
}

