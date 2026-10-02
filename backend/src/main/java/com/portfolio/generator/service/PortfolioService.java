package com.portfolio.generator.service;

import com.portfolio.generator.dto.*;
import com.portfolio.generator.exception.BadRequestException;
import com.portfolio.generator.exception.ResourceNotFoundException;
import com.portfolio.generator.model.*;
import com.portfolio.generator.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;

@Service
@Transactional(readOnly = true)
public class PortfolioService {

    private final PortfolioSettingsRepository portfolioSettingsRepository;
    private final UserRepository userRepository;
    private final EducationService educationService;
    private final SkillService skillService;
    private final ProjectService projectService;
    private final AchievementService achievementService;

    public PortfolioService(
            PortfolioSettingsRepository portfolioSettingsRepository,
            UserRepository userRepository,
            EducationService educationService,
            SkillService skillService,
            ProjectService projectService,
            AchievementService achievementService) {
        this.portfolioSettingsRepository = portfolioSettingsRepository;
        this.userRepository = userRepository;
        this.educationService = educationService;
        this.skillService = skillService;
        this.projectService = projectService;
        this.achievementService = achievementService;
    }

    @Transactional
    public PortfolioSettingsDTO getSettings(User user) {
        PortfolioSettings settings = portfolioSettingsRepository.findByUser(user)
                .orElseGet(() -> {
                    PortfolioSettings s = new PortfolioSettings(user, user.getUsername());
                    return portfolioSettingsRepository.save(s);
                });

        return mapToDTO(settings);
    }

    @Transactional
    public PortfolioSettingsDTO updateSettings(User user, PortfolioSettingsDTO dto) {
        PortfolioSettings settings = portfolioSettingsRepository.findByUser(user)
                .orElseGet(() -> new PortfolioSettings(user, user.getUsername()));

        String requestedSlug = dto.getSlug().trim().toLowerCase(Locale.ROOT);

        if (!requestedSlug.equals(settings.getSlug())) {
            // Check if slug taken by someone else
            boolean slugExists = portfolioSettingsRepository.findBySlug(requestedSlug)
                    .filter(s -> !s.getUser().getId().equals(user.getId()))
                    .isPresent();

            if (slugExists) {
                throw new BadRequestException("The portfolio slug '" + requestedSlug + "' is already in use. Please pick another one.");
            }
            settings.setSlug(requestedSlug);
        }

        settings.setPublic(dto.isPublic());
        if (dto.getThemeTemplate() != null && !dto.getThemeTemplate().isBlank()) {
            settings.setThemeTemplate(dto.getThemeTemplate());
        }
        if (dto.getAccentColor() != null && !dto.getAccentColor().isBlank()) {
            settings.setAccentColor(dto.getAccentColor());
        }
        settings.setShowContactInfo(dto.isShowContactInfo());
        settings.setShowGrades(dto.isShowGrades());
        settings.setCustomTagline(dto.getCustomTagline());

        PortfolioSettings saved = portfolioSettingsRepository.save(settings);
        return mapToDTO(saved);
    }

    public PortfolioResponseDTO getPortfolioPreview(User user) {
        PortfolioSettings settings = portfolioSettingsRepository.findByUser(user)
                .orElseGet(() -> new PortfolioSettings(user, user.getUsername()));

        return buildPortfolioResponse(user, settings, true);
    }

    public PortfolioResponseDTO getPublicPortfolio(String slug) {
        String cleanSlug = slug.trim().toLowerCase(Locale.ROOT);

        PortfolioSettings settings = portfolioSettingsRepository.findBySlug(cleanSlug)
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found for url: " + slug));

        if (!settings.isPublic()) {
            throw new ResourceNotFoundException("This student's portfolio is currently private.");
        }

        User user = settings.getUser();
        return buildPortfolioResponse(user, settings, false);
    }

    @Transactional
    public PortfolioResponseDTO loadSampleData(User user) {
        // Update user profile with sample realistic details if empty or requested
        user.setFullName(user.getFullName() != null && !user.getFullName().isBlank() ? user.getFullName() : "Aarav Sharma");
        user.setHeadline("Computer Science Student | Full-Stack & Cloud Enthusiast");
        user.setBio("Final-year Computer Science undergraduate passionate about building scalable web applications, distributed systems, and intuitive user experiences. Active open-source contributor and hackathon participant.");
        user.setLocation("Bengaluru, India");
        user.setPhone("+91 98765 43210");
        user.setGithubUrl("https://github.com");
        user.setLinkedinUrl("https://linkedin.com");
        user.setWebsiteUrl("https://aaravsharma.dev");
        user.setAvatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80");
        userRepository.save(user);

        // Add Sample Education if none
        List<EducationDTO> currentEducations = educationService.getEducations(user);
        if (currentEducations.isEmpty()) {
            EducationDTO edu1 = new EducationDTO();
            edu1.setInstitution("National Institute of Technology, Karnataka");
            edu1.setDegree("Bachelor of Technology (B.Tech)");
            edu1.setFieldOfStudy("Computer Science & Engineering");
            edu1.setStartYear(2022);
            edu1.setGraduationYear(2026);
            edu1.setGrade("8.9 CGPA");
            edu1.setDescription("Core coursework: Data Structures & Algorithms, Database Systems, Computer Networks, Operating Systems, Cloud Computing.");
            educationService.createEducation(user, edu1);

            EducationDTO edu2 = new EducationDTO();
            edu2.setInstitution("Delhi Public School");
            edu2.setDegree("Higher Secondary Certificate (CBSE XII)");
            edu2.setFieldOfStudy("Physics, Chemistry, Mathematics & CS");
            edu2.setStartYear(2020);
            edu2.setGraduationYear(2022);
            edu2.setGrade("94.6%");
            edu2.setDescription("School Academic Excellence Awardee, President of the Coding & Robotics Club.");
            educationService.createEducation(user, edu2);
        }

        // Add Sample Skills if none
        List<SkillDTO> currentSkills = skillService.getSkills(user);
        if (currentSkills.isEmpty()) {
            String[] techSkills = {"Java", "Spring Boot", "React.js", "MySQL", "JavaScript / TypeScript", "Docker", "RESTful APIs", "Git & GitHub", "Tailwind CSS"};
            for (String tech : techSkills) {
                SkillDTO s = new SkillDTO();
                s.setName(tech);
                s.setCategory(SkillCategory.TECHNICAL);
                s.setProficiencyLevel("Advanced");
                skillService.createSkill(user, s);
            }

            String[] softSkills = {"Problem Solving", "Team Leadership", "Agile / Scrum", "Technical Communication", "Time Management"};
            for (String soft : softSkills) {
                SkillDTO s = new SkillDTO();
                s.setName(soft);
                s.setCategory(SkillCategory.SOFT);
                s.setProficiencyLevel("Expert");
                skillService.createSkill(user, s);
            }
        }

        // Add Sample Projects if none
        List<ProjectDTO> currentProjects = projectService.getProjects(user);
        if (currentProjects.isEmpty()) {
            ProjectDTO p1 = new ProjectDTO();
            p1.setTitle("EduConnect - Campus Collaboration Portal");
            p1.setDescription("A real-time academic discussion and peer-tutoring web platform allowing students to collaborate on coursework, share verified study notes, and schedule mentoring sessions.");
            p1.setTechnologies("React, Spring Boot, MySQL, WebSocket, Tailwind CSS");
            p1.setGithubUrl("https://github.com/example/educonnect");
            p1.setLiveUrl("https://educonnect-demo.vercel.app");
            p1.setFeatured(true);
            projectService.createProject(user, p1);

            ProjectDTO p2 = new ProjectDTO();
            p2.setTitle("Smart Expense Tracker & Budget Planner");
            p2.setDescription("Personal finance management application with automated receipt classification, monthly visual breakdown analytics, and budget threshold alerts.");
            p2.setTechnologies("React, Spring Boot, Hibernate, Chart.js, JWT");
            p2.setGithubUrl("https://github.com/example/expense-tracker");
            p2.setLiveUrl("https://expense-tracker.demo.app");
            p2.setFeatured(false);
            projectService.createProject(user, p2);

            ProjectDTO p3 = new ProjectDTO();
            p3.setTitle("Algorithms & Data Structures Visualizer");
            p3.setDescription("Interactive web tool for visualizing sorting, graph traversal (Dijkstra, A*), and dynamic programming solutions step-by-step with speed controls.");
            p3.setTechnologies("React, Canvas API, TypeScript, CSS Animations");
            p3.setGithubUrl("https://github.com/example/algo-visualizer");
            p3.setLiveUrl("https://algo-visualizer.demo.app");
            p3.setFeatured(false);
            projectService.createProject(user, p3);
        }

        // Add Sample Achievements if none
        List<AchievementDTO> currentAchievements = achievementService.getAchievements(user);
        if (currentAchievements.isEmpty()) {
            AchievementDTO a1 = new AchievementDTO();
            a1.setTitle("AWS Certified Cloud Practitioner");
            a1.setCategory("CERTIFICATION");
            a1.setIssuer("Amazon Web Services (AWS)");
            a1.setIssueDate("Nov 2024");
            a1.setDescription("Validated comprehensive understanding of AWS cloud security, compliance, architecture, and core services.");
            a1.setCredentialUrl("https://aws.amazon.com/verification");
            achievementService.createAchievement(user, a1);

            AchievementDTO a2 = new AchievementDTO();
            a2.setTitle("1st Runner Up - National Smart Campus Hackathon");
            a2.setCategory("HACKATHON");
            a2.setIssuer("Ministry of Education & AICTE");
            a2.setIssueDate("Aug 2024");
            a2.setDescription("Built an AI-driven energy optimization system for institutional buildings, competing against 350+ university teams.");
            achievementService.createAchievement(user, a2);

            AchievementDTO a3 = new AchievementDTO();
            a3.setTitle("Gold Badge (5-Star) in Problem Solving");
            a3.setCategory("AWARD");
            a3.setIssuer("HackerRank");
            a3.setIssueDate("Feb 2024");
            a3.setDescription("Solved 100+ algorithmic challenges spanning dynamic programming, tree traversals, and graph problems.");
            a3.setCredentialUrl("https://hackerrank.com");
            achievementService.createAchievement(user, a3);
        }

        return getPortfolioPreview(user);
    }

    private PortfolioResponseDTO buildPortfolioResponse(User user, PortfolioSettings settings, boolean isOwnerPreview) {
        PortfolioResponseDTO response = new PortfolioResponseDTO();

        response.setFullName(user.getFullName());
        response.setHeadline(user.getHeadline());
        response.setBio(user.getBio());
        response.setLocation(user.getLocation());
        response.setAvatarUrl(user.getAvatarUrl());

        response.setSlug(settings.getSlug());
        response.setPublic(settings.isPublic());
        response.setThemeTemplate(settings.getThemeTemplate());
        response.setAccentColor(settings.getAccentColor());
        response.setShowContactInfo(settings.isShowContactInfo());
        response.setShowGrades(settings.isShowGrades());
        response.setCustomTagline(settings.getCustomTagline());

        // Contact info visibility
        if (isOwnerPreview || settings.isShowContactInfo()) {
            response.setEmail(user.getEmail());
            response.setPhone(user.getPhone());
            response.setGithubUrl(user.getGithubUrl());
            response.setLinkedinUrl(user.getLinkedinUrl());
            response.setWebsiteUrl(user.getWebsiteUrl());
        } else {
            // Still allow social links if desired, or omit
            response.setGithubUrl(user.getGithubUrl());
            response.setLinkedinUrl(user.getLinkedinUrl());
            response.setWebsiteUrl(user.getWebsiteUrl());
        }

        // Educations
        List<EducationDTO> educations = educationService.getEducations(user);
        if (!isOwnerPreview && !settings.isShowGrades()) {
            for (EducationDTO edu : educations) {
                edu.setGrade(null);
            }
        }
        response.setEducations(educations);

        // Skills
        response.setTechnicalSkills(skillService.getSkillsByCategory(user, SkillCategory.TECHNICAL));
        response.setSoftSkills(skillService.getSkillsByCategory(user, SkillCategory.SOFT));

        // Projects
        response.setProjects(projectService.getProjects(user));

        // Achievements
        response.setAchievements(achievementService.getAchievements(user));

        return response;
    }

    private PortfolioSettingsDTO mapToDTO(PortfolioSettings settings) {
        PortfolioSettingsDTO dto = new PortfolioSettingsDTO();
        dto.setId(settings.getId());
        dto.setSlug(settings.getSlug());
        dto.setPublic(settings.isPublic());
        dto.setThemeTemplate(settings.getThemeTemplate());
        dto.setAccentColor(settings.getAccentColor());
        dto.setShowContactInfo(settings.isShowContactInfo());
        dto.setShowGrades(settings.isShowGrades());
        dto.setCustomTagline(settings.getCustomTagline());
        return dto;
    }
}
