package com.example.skillbarter.controllers;


import com.example.skillbarter.models.Skill;
import com.example.skillbarter.models.User;
import com.example.skillbarter.models.UserSkill;
import com.example.skillbarter.repositories.SkillRepository;
import com.example.skillbarter.repositories.UserRepository;
import com.example.skillbarter.repositories.UserSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
public class SkillController {

    @Autowired
    SkillRepository skillRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserSkillRepository userSkillRepository;

    @GetMapping("api/skills")
    List<Skill> getSkills() {
        return skillRepository.findAll();
    }

    @PostMapping("/api/user/{email}/skills")
    public ResponseEntity<User> addUserSkills(@PathVariable String email, @RequestBody List<Long> skillIds) {
        System.out.println("Received skillIds: " + skillIds);
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();
        List<Skill> skills = skillRepository.findAllById(skillIds); // Fetch skills from DB

        for (Skill skill : skills) {
            if (userSkillRepository.findByUserAndSkill(user, skill).isEmpty()) {
                UserSkill userSkill = new UserSkill();
                userSkill.setUser(user);
                userSkill.setSkill(skill);
                userSkill.setSkillLevel(UserSkill.SkillLevel.BEGINNER);
                userSkillRepository.save(userSkill);
            }
        }

        return ResponseEntity.ok(user);
    }


}
