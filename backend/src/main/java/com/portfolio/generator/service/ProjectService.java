package com.portfolio.generator.service;

import com.portfolio.generator.dto.ProjectDTO;
import com.portfolio.generator.exception.ResourceNotFoundException;
import com.portfolio.generator.model.Project;
import com.portfolio.generator.model.User;
import com.portfolio.generator.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectDTO> getProjects(User user) {
        return projectRepository.findByUserOrderByFeaturedDescDisplayOrderAscIdDesc(user)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public ProjectDTO getProjectById(User user, Long id) {
        Project project = projectRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        return mapToDTO(project);
    }

    @Transactional
    public ProjectDTO createProject(User user, ProjectDTO dto) {
        Project project = new Project();
        project.setUser(user);
        mapFromDTO(dto, project);
        Project saved = projectRepository.save(project);
        return mapToDTO(saved);
    }

    @Transactional
    public ProjectDTO updateProject(User user, Long id, ProjectDTO dto) {
        Project project = projectRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        mapFromDTO(dto, project);
        Project updated = projectRepository.save(project);
        return mapToDTO(updated);
    }

    @Transactional
    public void deleteProject(User user, Long id) {
        Project project = projectRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        projectRepository.delete(project);
    }

    public ProjectDTO mapToDTO(Project entity) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setTechnologies(entity.getTechnologies());
        dto.setGithubUrl(entity.getGithubUrl());
        dto.setLiveUrl(entity.getLiveUrl());
        dto.setFeatured(entity.isFeatured());
        dto.setDisplayOrder(entity.getDisplayOrder());
        return dto;
    }

    private void mapFromDTO(ProjectDTO dto, Project entity) {
        entity.setTitle(dto.getTitle().trim());
        entity.setDescription(dto.getDescription().trim());
        entity.setTechnologies(dto.getTechnologies() != null ? dto.getTechnologies().trim() : null);
        entity.setGithubUrl(dto.getGithubUrl() != null ? dto.getGithubUrl().trim() : null);
        entity.setLiveUrl(dto.getLiveUrl() != null ? dto.getLiveUrl().trim() : null);
        entity.setFeatured(dto.isFeatured());
        if (dto.getDisplayOrder() != null) {
            entity.setDisplayOrder(dto.getDisplayOrder());
        }
    }
}
