package com.portfolio.generator.repository;

import com.portfolio.generator.model.Project;
import com.portfolio.generator.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUserOrderByFeaturedDescDisplayOrderAscIdDesc(User user);
    Optional<Project> findByIdAndUser(Long id, User user);
    void deleteByUser(User user);
}
