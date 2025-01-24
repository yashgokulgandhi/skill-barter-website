package com.example.skillbarter.controllers;

import com.example.skillbarter.models.User;
import com.example.skillbarter.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/signup")
@CrossOrigin(origins = "http://localhost:5173") // Allowing requests from the React app
public class SignupController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        if (userService.isEmailTaken(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already registered.");
        }


        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }
}
