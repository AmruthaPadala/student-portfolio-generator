package com.portfolio.generator.controller;

import com.portfolio.generator.dto.ApiResponse;
import com.portfolio.generator.dto.EducationDTO;
import com.portfolio.generator.model.User;
import com.portfolio.generator.service.AuthService;
import com.portfolio.generator.service.EducationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
public class EducationController {

    private final EducationService educationService;
    private final AuthService authService;

    public EducationController(EducationService educationService, AuthService authService) {
        this.educationService = educationService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<EducationDTO>>> getEducations() {
        User user = authService.getCurrentAuthenticatedUser();
        List<EducationDTO> list = educationService.getEducations(user);
        return ResponseEntity.ok(ApiResponse.ok("Education records retrieved", list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EducationDTO>> getEducationById(@PathVariable Long id) {
        User user = authService.getCurrentAuthenticatedUser();
        EducationDTO education = educationService.getEducationById(user, id);
        return ResponseEntity.ok(ApiResponse.ok("Education retrieved", education));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EducationDTO>> createEducation(@Valid @RequestBody EducationDTO dto) {
        User user = authService.getCurrentAuthenticatedUser();
        EducationDTO created = educationService.createEducation(user, dto);
        return new ResponseEntity<>(ApiResponse.ok("Education entry added successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EducationDTO>> updateEducation(@PathVariable Long id, @Valid @RequestBody EducationDTO dto) {
        User user = authService.getCurrentAuthenticatedUser();
        EducationDTO updated = educationService.updateEducation(user, id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Education entry updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEducation(@PathVariable Long id) {
        User user = authService.getCurrentAuthenticatedUser();
        educationService.deleteEducation(user, id);
        return ResponseEntity.ok(ApiResponse.ok("Education entry deleted successfully", null));
    }
}
