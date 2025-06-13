package com.sportmatches.backend.dto.auth;

public record AuthResponse(
        String token,
        String username,
        String email,
        String role
) {
    public AuthResponse(String token, String username, String email, String role) {
        this.token = token;
        this.username = username;
        this.email = email;
        this.role = role;
    }
}
