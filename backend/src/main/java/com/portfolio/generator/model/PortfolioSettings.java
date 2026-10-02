package com.portfolio.generator.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "portfolio_settings")
public class PortfolioSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonIgnore
    private User user;

    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Column(name = "is_public", nullable = false)
    private boolean isPublic = true;

    @Column(name = "theme_template", length = 50)
    private String themeTemplate = "MODERN"; // "MODERN", "MINIMAL", "CREATIVE", "ELEGANT"

    @Column(name = "accent_color", length = 50)
    private String accentColor = "indigo"; // "indigo", "emerald", "rose", "amber", "cyan", "violet"

    @Column(name = "show_contact_info")
    private boolean showContactInfo = true;

    @Column(name = "show_grades")
    private boolean showGrades = true;

    @Column(name = "custom_tagline")
    private String customTagline;

    public PortfolioSettings() {
    }

    public PortfolioSettings(User user, String slug) {
        this.user = user;
        this.slug = slug;
        this.isPublic = true;
        this.themeTemplate = "MODERN";
        this.accentColor = "indigo";
        this.showContactInfo = true;
        this.showGrades = true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public boolean isPublic() {
        return isPublic;
    }

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
