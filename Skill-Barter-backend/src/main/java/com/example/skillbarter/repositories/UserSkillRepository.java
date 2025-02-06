package com.example.skillbarter.repositories;

import com.example.skillbarter.models.Skill;
import com.example.skillbarter.models.User;
import com.example.skillbarter.models.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {
    Optional<Object> findByUserAndSkill(User user, Skill skill);
}
