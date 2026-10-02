package com.portfolio.generator.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class EducationDTO {

    private Long id;

    @NotBlank(message = "Institution/College name is required")
    @Size(max = 150, message = "Institution name cannot exceed 150 characters")
    private String institution;

    @NotBlank(message = "Degree is required")
    @Size(max = 100, message = "Degree cannot exceed 100 characters")
    private String degree;

    @NotBlank(message = "Branch/Field of study is required")
    @Size(max = 100, message = "Field of study cannot exceed 100 characters")
    private String fieldOfStudy;

    private Integer startYear;

    @NotNull(message = "Graduation year is required")
    private Integer graduationYear;

    @Size(max = 30, message = "Grade/CGPA cannot exceed 30 characters")
    private String grade;

    private String description;

    private Integer displayOrder = 0;

    public EducationDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getFieldOfStudy() {
        return fieldOfStudy;
    }

    public void setFieldOfStudy(String fieldOfStudy) {
        this.fieldOfStudy = fieldOfStudy;
    }

    public Integer getStartYear() {
        return startYear;
    }

    public void setStartYear(Integer startYear) {
        this.startYear = startYear;
    }

    public Integer getGraduationYear() {
        return graduationYear;
    }

    public void setGraduationYear(Integer graduationYear) {
        this.graduationYear = graduationYear;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
