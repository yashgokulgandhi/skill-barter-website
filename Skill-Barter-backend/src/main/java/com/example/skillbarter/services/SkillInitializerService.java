package com.example.skillbarter.services;

import com.example.skillbarter.models.Skill;
import com.example.skillbarter.repositories.SkillRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillInitializerService {

    private final SkillRepository skillRepository;

    public SkillInitializerService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @PostConstruct
    public void initializeSkills() {
        List<Skill> skills = List.of(
                new Skill(null, "Web Development", "Building websites using HTML, CSS, JavaScript, and frameworks like React or Angular.", "Browser", null),
                new Skill(null, "Graphic Design", "Creating visual content using tools like Photoshop, Illustrator, and Canva.", "Paintbrush", null),
                new Skill(null, "Data Science", "Analyzing data using Python, R, and machine learning techniques.", "Database", null),
                new Skill(null, "Digital Marketing", "Promoting products and services through SEO, SEM, and social media marketing.", "Megaphone", null),
                new Skill(null, "Content Writing", "Writing engaging blog posts, articles, and marketing copies.", "PenTool", null),
                new Skill(null, "Mobile App Development", "Developing Android and iOS apps using Flutter, React Native, or Kotlin.", "Smartphone", null),
                new Skill(null, "Cybersecurity", "Protecting networks and systems from cyber threats and vulnerabilities.", "ShieldCheck", null),
                new Skill(null, "Video Editing", "Editing videos using Adobe Premiere Pro, Final Cut Pro, or DaVinci Resolve.", "Video", null),
                new Skill(null, "UI/UX Design", "Designing user-friendly interfaces using Figma, Sketch, or Adobe XD.", "LayoutDashboard", null),
                new Skill(null, "Photography", "Capturing and editing high-quality photos for events, products, and branding.", "Camera", null)
        );

        for (Skill skill : skills) {
            if (skillRepository.findBySkillName(skill.getSkillName()).isEmpty()) {
                skillRepository.save(skill);
            }
        }
    }
}

