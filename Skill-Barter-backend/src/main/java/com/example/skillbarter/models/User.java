package com.example.skillbarter.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String profilePicture;

    @Lob
    private String bio;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user")
    private List<UserSkill> userSkills;

    @OneToMany(mappedBy = "reviewer")
    private List<Review> reviewsGiven;

    @OneToMany(mappedBy = "reviewee")
    private List<Review> reviewsReceived;

    // Getters and Setters
}
