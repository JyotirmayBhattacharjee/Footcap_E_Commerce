package com.example.Footcap;

import java.io.IOException;
import java.util.Optional;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class OAuthLoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;

    public OAuthLoginSuccessHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException, ServletException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");

        Optional<User> existingUser =
                userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {

            User user = new User();

            user.setEmail(email);
            user.setName(oauthUser.getAttribute("name"));
            user.setPicture(oauthUser.getAttribute("picture"));
            user.setGoogleId(oauthUser.getAttribute("sub"));

            userRepository.save(user);

            System.out.println("USER SAVED: " + email);
        }

        response.sendRedirect("/index.html");
    }
}