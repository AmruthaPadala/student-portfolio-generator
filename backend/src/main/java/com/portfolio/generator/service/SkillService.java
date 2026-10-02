package com.portfolio.generator.service;

import com.portfolio.generator.dto.SkillDTO;
import com.portfolio.generator.exception.ResourceNotFoundException;
import com.portfolio.generator.model.Skill;
import com.portfolio.generator.model.SkillCategory;
import com.portfolio.generator.model.User;
import com.portfolio.generator.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<SkillDTO> getSkills(User user) {
        return skillRepository.findByUserOrderByDisplayOrderAscIdAsc(user)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<SkillDTO> getSkillsByCategory(User user, SkillCategory category) {
        return skillRepository.findByUserAndCategoryOrderByDisplayOrderAscIdAsc(user, category)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public SkillDTO createSkill(User user, SkillDTO dto) {
        Skill skill = new Skill();
        skill.setUser(user);
        skill.setName(dto.getName().trim());
        skill.setCategory(dto.getCategory() != null ? dto.getCategory() : SkillCategory.TECHNICAL);
        skill.setProficiencyLevel(dto.getProficiencyLevel() != null ? dto.getProficiencyLevel().trim() : "Intermediate");
        if (dto.getDisplayOrder() != null) {
            skill.setDisplayOrder(dto.getDisplayOrder());
        }
        Skill saved = skillRepository.save(skill);
        return mapToDTO(saved);
    }

    @Transactional
    public SkillDTO updateSkill(User user, Long id, SkillDTO dto) {
        Skill skill = skillRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));

        skill.setName(dto.getName().trim());
        if (dto.getCategory() != null) {
            skill.setCategory(dto.getCategory());
        }
        if (dto.getProficiencyLevel() != null) {
            skill.setProficiencyLevel(dto.getProficiencyLevel().trim());
        }
        if (dto.getDisplayOrder() != null) {
            skill.setDisplayOrder(dto.getDisplayOrder());
        }

        Skill updated = skillRepository.save(skill);
        return mapToDTO(updated);
    }

    @Transactional
    public void deleteSkill(User user, Long id) {
        Skill skill = skillRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));
        skillRepository.delete(skill);
    }

    public SkillDTO mapToDTO(Skill entity) {
        return new SkillDTO(
                entity.getId(),
                entity.getName(),
                entity.getCategory(),
                entity.getProficiencyLevel(),
                entity.getDisplayOrder()
        );
    }
}
