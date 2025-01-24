package com.example.skillbarter.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "exchanges")
public class Exchange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exchangeId;

    @ManyToOne
    @JoinColumn(name = "user_a_id", nullable = false)
    private User userA;

    @ManyToOne
    @JoinColumn(name = "user_a_skill_id", nullable = false)
    private Skill userASkill;

    @ManyToOne
    @JoinColumn(name = "user_b_id", nullable = false)
    private User userB;

    @ManyToOne
    @JoinColumn(name = "user_b_skill_id", nullable = false)
    private Skill userBSkill;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime createdAt;

    public enum Status {
        PENDING, IN_PROGRESS, COMPLETED, CANCELLED
    }

    // Getters and Setters
}

