package com.portfolio.generator.controller;

import com.portfolio.generator.dto.ApiResponse;
import com.portfolio.generator.dto.PortfolioResponseDTO;
import com.portfolio.generator.dto.PortfolioSettingsDTO;
import com.portfolio.generator.model.User;
import com.portfolio.generator.service.AuthService;
import com.portfolio.generator.service.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final AuthService authService;

    public PortfolioController(PortfolioService portfolioService, AuthService authService) {
        this.portfolioService = portfolioService;
        this.authService = authService;
    }

    @GetMapping("/settings")
    public ResponseEntity<ApiResponse<PortfolioSettingsDTO>> getSettings() {
        User user = authService.getCurrentAuthenticatedUser();
        PortfolioSettingsDTO settings = portfolioService.getSettings(user);
        return ResponseEntity.ok(ApiResponse.ok("Portfolio settings retrieved", settings));
    }

    @PutMapping("/settings")
    public ResponseEntity<ApiResponse<PortfolioSettingsDTO>> updateSettings(@Valid @RequestBody PortfolioSettingsDTO dto) {
        User user = authService.getCurrentAuthenticatedUser();
        PortfolioSettingsDTO updated = portfolioService.updateSettings(user, dto);
        return ResponseEntity.ok(ApiResponse.ok("Portfolio settings updated successfully", updated));
    }

    @GetMapping("/preview")
    public ResponseEntity<ApiResponse<PortfolioResponseDTO>> getPreview() {
        User user = authService.getCurrentAuthenticatedUser();
        PortfolioResponseDTO preview = portfolioService.getPortfolioPreview(user);
        return ResponseEntity.ok(ApiResponse.ok("Portfolio preview generated successfully", preview));
    }

    @PostMapping("/sample-data")
    public ResponseEntity<ApiResponse<PortfolioResponseDTO>> loadSampleData() {
        User user = authService.getCurrentAuthenticatedUser();
        PortfolioResponseDTO response = portfolioService.loadSampleData(user);
        return ResponseEntity.ok(ApiResponse.ok("Realistic sample portfolio data loaded successfully!", response));
    }
}
