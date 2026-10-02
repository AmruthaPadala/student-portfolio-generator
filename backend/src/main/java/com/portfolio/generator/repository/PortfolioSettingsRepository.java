package com.portfolio.generator.repository;

import com.portfolio.generator.model.PortfolioSettings;
import com.portfolio.generator.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PortfolioSettingsRepository extends JpaRepository<PortfolioSettings, Long> {
    Optional<PortfolioSettings> findByUser(User user);
    Optional<PortfolioSettings> findBySlug(String slug);
    boolean existsBySlug(String slug);
}
