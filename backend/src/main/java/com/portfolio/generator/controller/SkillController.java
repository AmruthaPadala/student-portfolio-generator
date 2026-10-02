package com.portfolio.generator.controller;

import com.portfolio.generator.dto.ApiResponse;
import com.portfolio.generator.dto.SkillDTO;
import com.portfolio.generator.model.SkillCategory;
import com.portfolio.generator.model.User;
import com.portfolio.generator.service.AuthService;
import com.portfolio.generator.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;
    private final AuthService authService;

    public SkillController(SkillService skillService, AuthService authService) {
        this.skillService = skillService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<SkillDTO>>> getSkills(
            @RequestParam(required = false) SkillCategory category) {
        User user = authService.getCurrentAuthenticatedUser();
        List<SkillDTO> skills = (category != null)
                ? skillService.getSkillsByCategory(user, category)
                : skillService.getSkills(user);
        return ResponseEntity.ok(ApiResponse.ok("Skills retrieved successfully", skills));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SkillDTO>> createSkill(@Valid @RequestBody SkillDTO dto) {
        User user = authService.getCurrentAuthenticatedUser();
        SkillDTO created = skillService.createSkill(user, dto);
        return new ResponseEntity<>(ApiResponse.ok("Skill added successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SkillDTO>> updateSkill(@PathVariable Long id, @Valid @RequestBody SkillDTO dto) {
        User user = authService.getCurrentAuthenticatedUser();
        SkillDTO updated = skillService.updateSkill(user, id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Skill updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSkill(@PathVariable Long id) {
        User user = authService.getCurrentAuthenticatedUser();
        skillService.deleteSkill(user, id);
        return ResponseEntity.ok(ApiResponse.ok("Skill removed successfully", null));
    }
}
