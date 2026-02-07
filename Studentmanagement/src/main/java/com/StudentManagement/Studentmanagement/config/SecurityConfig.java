package com.StudentManagement.Studentmanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        // Allow login page + static files
                        .requestMatchers(
                                "/login.html",
                                "/css/**",
                                "/js/**",
                                "/images/**"
                        ).permitAll()

                        // Everything else needs login
                        .anyRequest().authenticated()
                )

                .formLogin(form -> form

                        .loginPage("/login.html")

                        .loginProcessingUrl("/login")

                        .defaultSuccessUrl("/index.html", true)

                        .failureUrl("/login.html?error=true")

                        .permitAll()
                )

                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login.html")
                );

        return http.build();
    }


    //  ADMIN USER
    @Bean
    public InMemoryUserDetailsManager userDetailsService() {

        UserDetails admin = User
                .withUsername("admin")
                .password("{noop}admin123")   // no encryption (for dev only)
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(admin);
    }
}
