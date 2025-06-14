package com.sportmatches.backend.service;

import com.sportmatches.backend.dto.auth.AuthResponse;
import com.sportmatches.backend.dto.auth.LoginRequest;
import com.sportmatches.backend.dto.auth.RegisterRequest;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthService {
    AuthResponse register(RegisterRequest req);

    AuthResponse login(LoginRequest req);

    UserDetails loadUserByUsername(String username);

    String generateToken(UserDetails userDetails);

    boolean validateToken(String token, UserDetails userDetails);
}
