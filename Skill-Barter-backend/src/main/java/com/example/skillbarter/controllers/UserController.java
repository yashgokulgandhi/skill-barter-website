package com.example.skillbarter.controllers;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.skillbarter.models.User;
import com.example.skillbarter.repositories.UserRepository;
import com.example.skillbarter.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController

public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private Cloudinary cloudinary;

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

    // New endpoint for server-side paginated search
    @GetMapping("/api/users/search")
    public ResponseEntity<Page<User>> searchUsers(
            @RequestParam String query,
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam Long currentUserId) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> usersPage = userRepository.searchUsers(currentUserId, query, pageable);
        return ResponseEntity.ok(usersPage);
    }

    @PostMapping("/api/user/{email}/upload-image")
    public ResponseEntity<?> uploadProfileImage(@PathVariable String email, @RequestParam("file") MultipartFile file) {
        try {
            // Upload the image file to Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String imageUrl = (String) uploadResult.get("secure_url");

            // Update the user's profile with the new image URL
            User updatedUser = userService.updateProfilePicture(email, imageUrl);
            return ResponseEntity.ok(updatedUser);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading image: " + e.getMessage());
        }
    }
}
