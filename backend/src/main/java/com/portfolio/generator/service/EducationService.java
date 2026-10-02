package com.portfolio.generator.service;

import com.portfolio.generator.dto.EducationDTO;
import com.portfolio.generator.exception.ResourceNotFoundException;
import com.portfolio.generator.model.Education;
import com.portfolio.generator.model.User;
import com.portfolio.generator.repository.EducationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EducationService {

    private final EducationRepository educationRepository;

    public EducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    public List<EducationDTO> getEducations(User user) {
        return educationRepository.findByUserOrderByGraduationYearDesc(user)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public EducationDTO getEducationById(User user, Long id) {
        Education education = educationRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Education entry not found with id: " + id));
        return mapToDTO(education);
    }

    @Transactional
    public EducationDTO createEducation(User user, EducationDTO dto) {
        Education education = new Education();
        education.setUser(user);
        mapFromDTO(dto, education);
        Education saved = educationRepository.save(education);
        return mapToDTO(saved);
    }

    @Transactional
    public EducationDTO updateEducation(User user, Long id, EducationDTO dto) {
        Education education = educationRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Education entry not found with id: " + id));

        mapFromDTO(dto, education);
        Education updated = educationRepository.save(education);
        return mapToDTO(updated);
    }

    @Transactional
    public void deleteEducation(User user, Long id) {
        Education education = educationRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Education entry not found with id: " + id));
        educationRepository.delete(education);
    }

    public EducationDTO mapToDTO(Education entity) {
        EducationDTO dto = new EducationDTO();
        dto.setId(entity.getId());
        dto.setInstitution(entity.getInstitution());
        dto.setDegree(entity.getDegree());
        dto.setFieldOfStudy(entity.getFieldOfStudy());
        dto.setStartYear(entity.getStartYear());
        dto.setGraduationYear(entity.getGraduationYear());
        dto.setGrade(entity.getGrade());
        dto.setDescription(entity.getDescription());
        dto.setDisplayOrder(entity.getDisplayOrder());
        return dto;
    }

    private void mapFromDTO(EducationDTO dto, Education entity) {
        entity.setInstitution(dto.getInstitution().trim());
        entity.setDegree(dto.getDegree().trim());
        entity.setFieldOfStudy(dto.getFieldOfStudy().trim());
        entity.setStartYear(dto.getStartYear());
        entity.setGraduationYear(dto.getGraduationYear());
        entity.setGrade(dto.getGrade() != null ? dto.getGrade().trim() : null);
        entity.setDescription(dto.getDescription() != null ? dto.getDescription().trim() : null);
        if (dto.getDisplayOrder() != null) {
            entity.setDisplayOrder(dto.getDisplayOrder());
        }
    }
}
