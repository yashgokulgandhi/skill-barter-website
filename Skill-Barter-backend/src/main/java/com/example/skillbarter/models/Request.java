package com.example.skillbarter.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "request")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    private String requestMessage;

    public enum Status {
        ACCEPTED, PENDING, DECLINED
    }
}
