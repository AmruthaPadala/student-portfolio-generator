package com.portfolio.generator.service;

import com.portfolio.generator.dto.AchievementDTO;
import com.portfolio.generator.exception.ResourceNotFoundException;
import com.portfolio.generator.model.Achievement;
import com.portfolio.generator.model.User;
import com.portfolio.generator.repository.AchievementRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AchievementService {

    private final AchievementRepository achievementRepository;

    public AchievementService(AchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    public List<AchievementDTO> getAchievements(User user) {
        return achievementRepository.findByUserOrderByDisplayOrderAscIdDesc(user)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public AchievementDTO getAchievementById(User user, Long id) {
        Achievement achievement = achievementRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found with id: " + id));
        return mapToDTO(achievement);
    }

    @Transactional
    public AchievementDTO createAchievement(User user, AchievementDTO dto) {
        Achievement achievement = new Achievement();
        achievement.setUser(user);
        mapFromDTO(dto, achievement);
        Achievement saved = achievementRepository.save(achievement);
        return mapToDTO(saved);
    }

    @Transactional
    public AchievementDTO updateAchievement(User user, Long id, AchievementDTO dto) {
        Achievement achievement = achievementRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found with id: " + id));

        mapFromDTO(dto, achievement);
        Achievement updated = achievementRepository.save(achievement);
        return mapToDTO(updated);
    }

    @Transactional
    public void deleteAchievement(User user, Long id) {
        Achievement achievement = achievementRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found with id: " + id));
        achievementRepository.delete(achievement);
    }

    public AchievementDTO mapToDTO(Achievement entity) {
        AchievementDTO dto = new AchievementDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setCategory(entity.getCategory());
        dto.setIssuer(entity.getIssuer());
        dto.setIssueDate(entity.getIssueDate());
        dto.setDescription(entity.getDescription());
        dto.setCredentialUrl(entity.getCredentialUrl());
        dto.setDisplayOrder(entity.getDisplayOrder());
        return dto;
    }

    private void mapFromDTO(AchievementDTO dto, Achievement entity) {
        entity.setTitle(dto.getTitle().trim());
        entity.setCategory(dto.getCategory() != null ? dto.getCategory().trim() : "CERTIFICATION");
        entity.setIssuer(dto.getIssuer() != null ? dto.getIssuer().trim() : null);
        entity.setIssueDate(dto.getIssueDate() != null ? dto.getIssueDate().trim() : null);
        entity.setDescription(dto.getDescription() != null ? dto.getDescription().trim() : null);
        entity.setCredentialUrl(dto.getCredentialUrl() != null ? dto.getCredentialUrl().trim() : null);
        if (dto.getDisplayOrder() != null) {
            entity.setDisplayOrder(dto.getDisplayOrder());
        }
    }
}
