package com.example.skillbarter.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "skill")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillId;

    @Column(unique = true, nullable = false)
    private String skillName;

    @Lob
    private String description;

    @OneToMany(mappedBy = "skill")
    private List<UserSkill> userSkills;

    // Getters and Setters
}
