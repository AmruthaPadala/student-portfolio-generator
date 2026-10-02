package com.portfolio.generator.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "achievements")
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(length = 50)
    private String category; // e.g. "CERTIFICATION", "AWARD", "WORKSHOP", "HACKATHON", "OTHER"

    @Column(length = 150)
    private String issuer; // Organization / Authority

    @Column(name = "issue_date", length = 50)
    private String issueDate; // e.g. "June 2025"

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "credential_url")
    private String credentialUrl;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    public Achievement() {
    }

    public Achievement(User user, String title, String category, String issuer, String issueDate, String description, String credentialUrl) {
        this.user = user;
        this.title = title;
        this.category = category;
        this.issuer = issuer;
        this.issueDate = issueDate;
        this.description = description;
        this.credentialUrl = credentialUrl;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public String getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(String issueDate) {
        this.issueDate = issueDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCredentialUrl() {
        return credentialUrl;
    }

    public void setCredentialUrl(String credentialUrl) {
        this.credentialUrl = credentialUrl;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
