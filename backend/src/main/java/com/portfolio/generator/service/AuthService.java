package com.portfolio.generator.service;

import com.portfolio.generator.config.JwtTokenProvider;
import com.portfolio.generator.dto.AuthResponse;
import com.portfolio.generator.dto.LoginRequest;
import com.portfolio.generator.dto.RegisterRequest;
import com.portfolio.generator.exception.BadRequestException;
import com.portfolio.generator.exception.ResourceNotFoundException;
import com.portfolio.generator.model.PortfolioSettings;
import com.portfolio.generator.model.User;
import com.portfolio.generator.repository.PortfolioSettingsRepository;
import com.portfolio.generator.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PortfolioSettingsRepository portfolioSettingsRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(
            UserRepository userRepository,
            PortfolioSettingsRepository portfolioSettingsRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.portfolioSettingsRepository = portfolioSettingsRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String cleanUsername = request.getUsername().trim().toLowerCase(Locale.ROOT);
        String cleanEmail = request.getEmail().trim().toLowerCase(Locale.ROOT);

        if (userRepository.existsByUsername(cleanUsername)) {
            throw new BadRequestException("Username '" + cleanUsername + "' is already taken.");
        }

        if (userRepository.existsByEmail(cleanEmail)) {
            throw new BadRequestException("Email '" + cleanEmail + "' is already registered.");
        }

        User user = new User();
        user.setUsername(cleanUsername);
        user.setEmail(cleanEmail);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName().trim());
        user.setHeadline("Aspiring Student & Problem Solver");
        user.setBio("Passionate student eager to learn and build impactful solutions.");

        User savedUser = userRepository.save(user);

        // Generate a unique initial slug
        String baseSlug = cleanUsername.replaceAll("[^a-z0-9-]", "-");
        String finalSlug = baseSlug;
        int counter = 1;
        while (portfolioSettingsRepository.existsBySlug(finalSlug)) {
            finalSlug = baseSlug + "-" + counter++;
        }

        PortfolioSettings settings = new PortfolioSettings(savedUser, finalSlug);
        settings.setPublic(true);
        settings.setThemeTemplate("MODERN");
        settings.setAccentColor("indigo");
        portfolioSettingsRepository.save(settings);
        savedUser.setPortfolioSettings(settings);

        String token = tokenProvider.generateTokenForUsername(cleanUsername);

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getFullName(),
                finalSlug
        );
    }

    public AuthResponse login(LoginRequest request) {
        String usernameOrEmail = request.getUsernameOrEmail().trim();

        // Check if input is email, if so get username for authentication
        String targetUsername = usernameOrEmail;
        if (usernameOrEmail.contains("@")) {
            User user = userRepository.findByEmail(usernameOrEmail.toLowerCase(Locale.ROOT))
                    .orElseThrow(() -> new BadRequestException("No account found with this email."));
            targetUsername = user.getUsername();
        }

        final String finalUsername = targetUsername;
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(finalUsername, request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(finalUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + finalUsername));

        String slug = user.getPortfolioSettings() != null ? user.getPortfolioSettings().getSlug() : user.getUsername();

        return new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                slug
        );
    }

    public User getCurrentAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new BadRequestException("User is not authenticated");
        }

        String username;
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found"));
    }
}
