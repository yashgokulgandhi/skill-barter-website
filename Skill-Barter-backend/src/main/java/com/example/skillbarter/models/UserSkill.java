package com.example.skillbarter.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "user_skills")
public class UserSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSkillId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Enumerated(EnumType.STRING)
    private SkillLevel skillLevel;

    public enum SkillLevel {
        BEGINNER, INTERMEDIATE, EXPERT
    }

    // Getters and Setters
}

