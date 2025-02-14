package com.example.skillbarter.controllers;

import com.example.skillbarter.models.User;
import com.example.skillbarter.repositories.UserRepository;
import com.example.skillbarter.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    UserRepository userRepository;

    // Fetch the user's profile
    @GetMapping(path="/api/user/{email}")
    public ResponseEntity<User> getUserProfile(@PathVariable String email) {
        User user = userService.getCurrentUser(email); // Assuming you have logic to get the logged-in user
        return ResponseEntity.ok(user);
    }

    @GetMapping(path="/api/userbyid/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null); // Assuming you have logic to get the logged-in user
        return ResponseEntity.ok(user);
    }


    // Update the user's profile
    @PutMapping(path="/api/user/{email}")
    public ResponseEntity<User> updateUserProfile(@RequestBody User user,@PathVariable String email) {
        User updatedUser = userService.updateUserProfile(user,email); // Assuming you have logic to update the user
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
}
