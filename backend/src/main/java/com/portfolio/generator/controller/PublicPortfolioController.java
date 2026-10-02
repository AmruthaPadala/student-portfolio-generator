package com.portfolio.generator.controller;

import com.portfolio.generator.dto.ApiResponse;
import com.portfolio.generator.dto.PortfolioResponseDTO;
import com.portfolio.generator.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/portfolio")
public class PublicPortfolioController {

    private final PortfolioService portfolioService;

    public PublicPortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/info/network")
    public ResponseEntity<ApiResponse<java.util.Map<String, String>>> getNetworkInfo() {
        String hostAddress = "127.0.0.1";
        try {
            hostAddress = java.net.InetAddress.getLocalHost().getHostAddress();
        } catch (Exception ignored) {
        }
        java.util.Map<String, String> info = new java.util.HashMap<>();
        info.put("lanIp", hostAddress);
        return ResponseEntity.ok(ApiResponse.ok("Network information", info));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<PortfolioResponseDTO>> getPublicPortfolio(@PathVariable String slug) {
        PortfolioResponseDTO portfolio = portfolioService.getPublicPortfolio(slug);
        return ResponseEntity.ok(ApiResponse.ok("Public portfolio loaded", portfolio));
    }
}
