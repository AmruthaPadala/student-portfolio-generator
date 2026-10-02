package com.portfolio.generator;

import com.portfolio.generator.dto.ProfileDTO;
import com.portfolio.generator.model.User;
import com.portfolio.generator.repository.UserRepository;
import com.portfolio.generator.service.ProfileService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class ProfileServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ProfileService profileService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetProfile() {
        User user = new User("rahul", "rahul@college.edu", "pass", "Rahul Verma");
        user.setId(10L);
        user.setHeadline("Software Engineering Student");
        user.setLocation("Delhi, India");

        ProfileDTO dto = profileService.getProfile(user);

        assertNotNull(dto);
        assertEquals("Rahul Verma", dto.getFullName());
        assertEquals("Software Engineering Student", dto.getHeadline());
        assertEquals("Delhi, India", dto.getLocation());
    }

    @Test
    void testUpdateProfile() {
        User user = new User("rahul", "rahul@college.edu", "pass", "Rahul Verma");
        user.setId(10L);

        ProfileDTO updateDto = new ProfileDTO();
        updateDto.setFullName("Rahul Verma Updated");
        updateDto.setHeadline("Cloud Developer");
        updateDto.setBio("Passionate student");
        updateDto.setLocation("Mumbai, India");

        when(userRepository.save(any(User.class))).thenReturn(user);

        ProfileDTO result = profileService.updateProfile(user, updateDto);

        assertNotNull(result);
        assertEquals("Rahul Verma Updated", user.getFullName());
        assertEquals("Cloud Developer", user.getHeadline());
    }
}
