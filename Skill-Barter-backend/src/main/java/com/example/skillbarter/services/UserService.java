package com.example.skillbarter.services;


import com.example.skillbarter.models.User;
import com.example.skillbarter.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;


@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // Set the current LocalDateTime (without formatting)
        user.setCreatedAt(LocalDateTime.now(ZoneId.of("Asia/Kolkata")));

        return userRepository.save(user);
    }


    public boolean isEmailTaken(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public User getCurrentUser(String email) {
        // This logic will depend on how you're managing user authentication (e.g., JWT, session)
        return userRepository.findByEmail(email).orElse(null); // Assuming user with ID 1 is logged in
    }

    // Update the user profile
    public User updateUserProfile(User user,String email) {
        User existingUser = userRepository.findByEmail(email).orElse(null);
        System.out.println(user.toString());
        existingUser.setName(user.getName());
        existingUser.setBio(user.getBio());
        // Add more fields as needed
        return userRepository.save(existingUser);
    }

    public User updateProfilePicture(String email, String imageUrl) {
        User user = userRepository.findByEmail(email).orElse(null); // or however you find the user by email
        if (user != null) {
            user.setProfilePicture(imageUrl);
            userRepository.save(user);
        }
        return user;
    }

}
