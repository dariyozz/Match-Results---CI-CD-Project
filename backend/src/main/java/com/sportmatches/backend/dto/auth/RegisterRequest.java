package com.sportmatches.backend.dto.auth;


public record RegisterRequest(String username, String name, String email, String password) {
    public RegisterRequest(String username, String name, String email, String password) {
        this.username = username;
        this.email = email;
        this.name = name;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }
}
