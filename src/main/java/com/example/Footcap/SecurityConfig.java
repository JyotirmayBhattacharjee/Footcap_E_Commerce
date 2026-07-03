package com.example.Footcap;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

        private final OAuthLoginSuccessHandler successHandler;

        public SecurityConfig(OAuthLoginSuccessHandler successHandler) {
                this.successHandler = successHandler;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

                http
                                .csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(
                                                                "/",
                                                                "/index.html",
                                                                "/login.html",
                                                                "/assets/**",
                                                                "/favicon.ico",
                                                                "/api/user")
                                                .permitAll()
                                                .anyRequest().authenticated())

                                .oauth2Login(oauth -> oauth
                                                .successHandler(successHandler))

                                .logout(logout -> logout
                                                .logoutSuccessUrl("/index.html")
                                                .invalidateHttpSession(true)
                                                .clearAuthentication(true));

                return http.build();
        }
}