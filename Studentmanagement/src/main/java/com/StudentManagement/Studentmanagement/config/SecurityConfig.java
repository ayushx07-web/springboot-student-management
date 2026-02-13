package com.StudentManagement.Studentmanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public UserDetailsService userDetailsService() {

        UserDetails admin = User.withUsername("admin")
                .password("{noop}admin123")
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(admin);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        // ✅ Allow ALL static files
                        .requestMatchers(
                                "/",
                                "/login.html",
                                "/login",
                                "/index.html",

                                "/css/**",
                                "/js/**",

                                "/style.css",
                                "/script.js",
                                "/login.js",

                                "/**/*.css",
                                "/**/*.js"
                        ).permitAll()

                        // Everything else needs login
                        .anyRequest().authenticated()
                )

                .formLogin(form -> form
                        .loginPage("/login.html")
                        .loginProcessingUrl("/login")

                        // ✅ Redirect to home
                        .defaultSuccessUrl("/", true)

                        .failureUrl("/login.html?error=true")
                        .permitAll()
                )

                .logout(logout -> logout
                        .logoutSuccessUrl("/login.html")
                );

        return http.build();
    }
}
