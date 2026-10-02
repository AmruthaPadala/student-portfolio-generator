package com.portfolio.generator.controller;

import com.portfolio.generator.dto.ApiResponse;
import com.portfolio.generator.dto.ProfileDTO;
import com.portfolio.generator.model.User;
import com.portfolio.generator.service.AuthService;
import com.portfolio.generator.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;
    private final AuthService authService;

    public ProfileController(ProfileService profileService, AuthService authService) {
        this.profileService = profileService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<ProfileDTO>> getProfile() {
        User user = authService.getCurrentAuthenticatedUser();
        ProfileDTO profile = profileService.getProfile(user);
        return ResponseEntity.ok(ApiResponse.ok("Profile retrieved successfully", profile));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ProfileDTO>> updateProfile(@Valid @RequestBody ProfileDTO dto) {
        User user = authService.getCurrentAuthenticatedUser();
        ProfileDTO updated = profileService.updateProfile(user, dto);
        return ResponseEntity.ok(ApiResponse.ok("Profile updated successfully", updated));
    }
}
