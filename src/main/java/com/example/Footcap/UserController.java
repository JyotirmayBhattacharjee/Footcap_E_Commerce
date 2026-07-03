package com.example.Footcap;

import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/api/user")
    public Map<String, Object> user(
            @AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) {
            return Map.of(
                    "loggedIn", false);
        }

        return Map.of(
                "loggedIn", true,
                "name", principal.getAttribute("name"),
                "email", principal.getAttribute("email"),
                "picture", principal.getAttribute("picture"));
    }
}