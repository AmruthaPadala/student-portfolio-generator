package com.portfolio.generator.controller;

import com.portfolio.generator.dto.ApiResponse;
import com.portfolio.generator.dto.AuthResponse;
import com.portfolio.generator.dto.LoginRequest;
import com.portfolio.generator.dto.RegisterRequest;
import com.portfolio.generator.model.User;
import com.portfolio.generator.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return new ResponseEntity<>(ApiResponse.ok("Registration successful! Welcome to Digital Portfolio Generator.", response), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.ok("Login successful.", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<AuthResponse>> getCurrentUser() {
        User user = authService.getCurrentAuthenticatedUser();
        String slug = user.getPortfolioSettings() != null ? user.getPortfolioSettings().getSlug() : user.getUsername();
        AuthResponse response = new AuthResponse(
                null,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                slug
        );
        return ResponseEntity.ok(ApiResponse.ok("Current user details retrieved.", response));
    }
}
