package com.portfolio.generator.service;

import com.portfolio.generator.dto.ProfileDTO;
import com.portfolio.generator.model.User;
import com.portfolio.generator.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private final UserRepository userRepository;

    public ProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ProfileDTO getProfile(User user) {
        ProfileDTO dto = new ProfileDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setHeadline(user.getHeadline());
        dto.setBio(user.getBio());
        dto.setPhone(user.getPhone());
        dto.setLocation(user.getLocation());
        dto.setGithubUrl(user.getGithubUrl());
        dto.setLinkedinUrl(user.getLinkedinUrl());
        dto.setWebsiteUrl(user.getWebsiteUrl());
        dto.setAvatarUrl(user.getAvatarUrl());
        return dto;
    }

    @Transactional
    public ProfileDTO updateProfile(User user, ProfileDTO dto) {
        user.setFullName(dto.getFullName().trim());
        user.setHeadline(dto.getHeadline() != null ? dto.getHeadline().trim() : null);
        user.setBio(dto.getBio() != null ? dto.getBio().trim() : null);
        user.setPhone(dto.getPhone() != null ? dto.getPhone().trim() : null);
        user.setLocation(dto.getLocation() != null ? dto.getLocation().trim() : null);
        user.setGithubUrl(dto.getGithubUrl() != null ? dto.getGithubUrl().trim() : null);
        user.setLinkedinUrl(dto.getLinkedinUrl() != null ? dto.getLinkedinUrl().trim() : null);
        user.setWebsiteUrl(dto.getWebsiteUrl() != null ? dto.getWebsiteUrl().trim() : null);
        user.setAvatarUrl(dto.getAvatarUrl() != null ? dto.getAvatarUrl().trim() : null);

        User updatedUser = userRepository.save(user);
        return getProfile(updatedUser);
    }
}
