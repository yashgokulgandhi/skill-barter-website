package com.example.skillbarter.controllers;

import com.example.skillbarter.models.User;
import com.example.skillbarter.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // Fetch the user's profile
    @GetMapping(path="/{email}")
    public ResponseEntity<User> getUserProfile(@PathVariable String email) {
        User user = userService.getCurrentUser(email); // Assuming you have logic to get the logged-in user
        return ResponseEntity.ok(user);
    }

    // Update the user's profile
    @PutMapping(path="/{email}")
    public ResponseEntity<User> updateUserProfile(@RequestBody User user,@PathVariable String email) {
        User updatedUser = userService.updateUserProfile(user,email); // Assuming you have logic to update the user
        return ResponseEntity.ok(updatedUser);
    }
}
