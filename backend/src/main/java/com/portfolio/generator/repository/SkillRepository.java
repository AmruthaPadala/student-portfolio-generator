package com.portfolio.generator.repository;

import com.portfolio.generator.model.Skill;
import com.portfolio.generator.model.SkillCategory;
import com.portfolio.generator.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByUserOrderByDisplayOrderAscIdAsc(User user);
    List<Skill> findByUserAndCategoryOrderByDisplayOrderAscIdAsc(User user, SkillCategory category);
    Optional<Skill> findByIdAndUser(Long id, User user);
    void deleteByUser(User user);
}
