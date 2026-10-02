package com.portfolio.generator.controller;

import com.portfolio.generator.dto.AchievementDTO;
import com.portfolio.generator.dto.ApiResponse;
import com.portfolio.generator.model.User;
import com.portfolio.generator.service.AchievementService;
import com.portfolio.generator.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    private final AchievementService achievementService;
    private final AuthService authService;

    public AchievementController(AchievementService achievementService, AuthService authService) {
        this.achievementService = achievementService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AchievementDTO>>> getAchievements() {
        User user = authService.getCurrentAuthenticatedUser();
        List<AchievementDTO> list = achievementService.getAchievements(user);
        return ResponseEntity.ok(ApiResponse.ok("Achievements retrieved successfully", list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AchievementDTO>> getAchievementById(@PathVariable Long id) {
        User user = authService.getCurrentAuthenticatedUser();
        AchievementDTO achievement = achievementService.getAchievementById(user, id);
        return ResponseEntity.ok(ApiResponse.ok("Achievement retrieved successfully", achievement));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AchievementDTO>> createAchievement(@Valid @RequestBody AchievementDTO dto) {
        User user = authService.getCurrentAuthenticatedUser();
        AchievementDTO created = achievementService.createAchievement(user, dto);
        return new ResponseEntity<>(ApiResponse.ok("Achievement added successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AchievementDTO>> updateAchievement(@PathVariable Long id, @Valid @RequestBody AchievementDTO dto) {
        User user = authService.getCurrentAuthenticatedUser();
        AchievementDTO updated = achievementService.updateAchievement(user, id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Achievement updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAchievement(@PathVariable Long id) {
        User user = authService.getCurrentAuthenticatedUser();
        achievementService.deleteAchievement(user, id);
        return ResponseEntity.ok(ApiResponse.ok("Achievement deleted successfully", null));
    }
}
