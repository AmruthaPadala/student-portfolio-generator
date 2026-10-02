package com.portfolio.generator.dto;

import java.util.ArrayList;
import java.util.List;

public class PortfolioResponseDTO {

    private String fullName;
    private String headline;
    private String bio;
    private String location;
    private String email;
    private String phone;
    private String githubUrl;
    private String linkedinUrl;
    private String websiteUrl;
    private String avatarUrl;

    private String slug;
    private boolean isPublic;
    private String themeTemplate;
    private String accentColor;
    private boolean showContactInfo;
    private boolean showGrades;
    private String customTagline;

    private List<EducationDTO> educations = new ArrayList<>();
    private List<SkillDTO> technicalSkills = new ArrayList<>();
    private List<SkillDTO> softSkills = new ArrayList<>();
    private List<ProjectDTO> projects = new ArrayList<>();
    private List<AchievementDTO> achievements = new ArrayList<>();

    public PortfolioResponseDTO() {
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("isPublic")
    public boolean isPublic() {
        return isPublic;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("isPublic")
    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public void setIsPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public String getThemeTemplate() {
        return themeTemplate;
    }

    public void setThemeTemplate(String themeTemplate) {
        this.themeTemplate = themeTemplate;
    }

    public String getAccentColor() {
        return accentColor;
    }

    public void setAccentColor(String accentColor) {
        this.accentColor = accentColor;
    }

    public boolean isShowContactInfo() {
        return showContactInfo;
    }

    public void setShowContactInfo(boolean showContactInfo) {
        this.showContactInfo = showContactInfo;
    }

    public boolean isShowGrades() {
        return showGrades;
    }

    public void setShowGrades(boolean showGrades) {
        this.showGrades = showGrades;
    }

    public String getCustomTagline() {
        return customTagline;
    }

    public void setCustomTagline(String customTagline) {
        this.customTagline = customTagline;
    }

    public List<EducationDTO> getEducations() {
        return educations;
    }

    public void setEducations(List<EducationDTO> educations) {
        this.educations = educations;
    }

    public List<SkillDTO> getTechnicalSkills() {
        return technicalSkills;
    }

    public void setTechnicalSkills(List<SkillDTO> technicalSkills) {
        this.technicalSkills = technicalSkills;
    }

    public List<SkillDTO> getSoftSkills() {
        return softSkills;
    }

    public void setSoftSkills(List<SkillDTO> softSkills) {
        this.softSkills = softSkills;
    }

    public List<ProjectDTO> getProjects() {
        return projects;
    }

    public void setProjects(List<ProjectDTO> projects) {
        this.projects = projects;
    }

    public List<AchievementDTO> getAchievements() {
        return achievements;
    }

    public void setAchievements(List<AchievementDTO> achievements) {
        this.achievements = achievements;
    }
}
