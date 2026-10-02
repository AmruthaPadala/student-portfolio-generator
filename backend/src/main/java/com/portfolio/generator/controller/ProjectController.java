package com.portfolio.generator.controller;

import com.portfolio.generator.dto.ApiResponse;
import com.portfolio.generator.dto.ProjectDTO;
import com.portfolio.generator.model.User;
import com.portfolio.generator.service.AuthService;
import com.portfolio.generator.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final AuthService authService;

    public ProjectController(ProjectService projectService, AuthService authService) {
        this.projectService = projectService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getProjects() {
        User user = authService.getCurrentAuthenticatedUser();
        List<ProjectDTO> list = projectService.getProjects(user);
        return ResponseEntity.ok(ApiResponse.ok("Projects retrieved successfully", list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDTO>> getProjectById(@PathVariable Long id) {
        User user = authService.getCurrentAuthenticatedUser();
        ProjectDTO project = projectService.getProjectById(user, id);
        return ResponseEntity.ok(ApiResponse.ok("Project retrieved successfully", project));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectDTO>> createProject(@Valid @RequestBody ProjectDTO dto) {
        User user = authService.getCurrentAuthenticatedUser();
        ProjectDTO created = projectService.createProject(user, dto);
        return new ResponseEntity<>(ApiResponse.ok("Project added successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDTO>> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectDTO dto) {
        User user = authService.getCurrentAuthenticatedUser();
        ProjectDTO updated = projectService.updateProject(user, id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Project updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Long id) {
        User user = authService.getCurrentAuthenticatedUser();
        projectService.deleteProject(user, id);
        return ResponseEntity.ok(ApiResponse.ok("Project deleted successfully", null));
    }
}
