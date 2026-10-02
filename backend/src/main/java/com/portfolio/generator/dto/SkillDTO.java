package com.portfolio.generator.dto;

import com.portfolio.generator.model.SkillCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class SkillDTO {

    private Long id;

    @NotBlank(message = "Skill name is required")
    @Size(max = 100, message = "Skill name cannot exceed 100 characters")
    private String name;

    @NotNull(message = "Category is required")
    private SkillCategory category;

    @Size(max = 50, message = "Proficiency level cannot exceed 50 characters")
    private String proficiencyLevel; // e.g. "Beginner", "Intermediate", "Advanced", "Expert"

    private Integer displayOrder = 0;

    public SkillDTO() {
    }

    public SkillDTO(Long id, String name, SkillCategory category, String proficiencyLevel, Integer displayOrder) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.proficiencyLevel = proficiencyLevel;
        this.displayOrder = displayOrder;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SkillCategory getCategory() {
        return category;
    }

    public void setCategory(SkillCategory category) {
        this.category = category;
    }

    public String getProficiencyLevel() {
        return proficiencyLevel;
    }

    public void setProficiencyLevel(String proficiencyLevel) {
        this.proficiencyLevel = proficiencyLevel;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
