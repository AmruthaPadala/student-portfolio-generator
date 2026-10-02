package com.portfolio.generator.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class PortfolioSettingsDTO {

    private Long id;

    @NotBlank(message = "Portfolio URL slug is required")
    @Size(min = 3, max = 100, message = "Slug must be between 3 and 100 characters")
    @Pattern(regexp = "^[a-z0-9-]+$", message = "Slug must contain only lowercase letters, numbers, and hyphens")
    private String slug;

    private boolean isPublic;
    private String themeTemplate;
    private String accentColor;
    private boolean showContactInfo;
    private boolean showGrades;
    private String customTagline;

    public PortfolioSettingsDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
