package com.example.skillbarter.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "skill")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillId;

    @Column(unique = true, nullable = false)
    private String skillName;


    @Column(columnDefinition = "TEXT")
    private String description;

    private String icon;

    @OneToMany(mappedBy = "skill")
    @JsonIgnore
    private List<UserSkill> userSkills;

    // Getters and Setters
}
