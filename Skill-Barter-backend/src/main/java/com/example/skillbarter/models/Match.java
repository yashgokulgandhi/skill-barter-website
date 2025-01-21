package com.example.skillbarter.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "skillmatch")
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "matched_user_id")
    private User matchedUser;

    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skill skill;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and Setters
}