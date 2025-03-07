package com.example.skillbarter.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
public class Exchange {

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


    private String status;


    private LocalDateTime createdAt;



    public Exchange() {
    }

    public Exchange(Long id, User userA, Skill userASkill, User userB, Skill userBSkill, String status, LocalDateTime createdAt) {
        this.id = id;
        this.userA = userA;
        this.userASkill = userASkill;
        this.userB = userB;
        this.userBSkill = userBSkill;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUserA() {
        return userA;
    }

    public void setUserA(User userA) {
        this.userA = userA;
    }

    public Skill getUserASkill() {
        return userASkill;
    }

    public void setUserASkill(Skill userASkill) {
        this.userASkill = userASkill;
    }

    public User getUserB() {
        return userB;
    }

    public void setUserB(User userB) {
        this.userB = userB;
    }

    public Skill getUserBSkill() {
        return userBSkill;
    }

    public void setUserBSkill(Skill userBSkill) {
        this.userBSkill = userBSkill;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
