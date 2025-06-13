package com.sportmatches.backend.service.impl;

import com.sportmatches.backend.config.JwtService;
import com.sportmatches.backend.dto.auth.AuthResponse;
import com.sportmatches.backend.dto.auth.LoginRequest;
import com.sportmatches.backend.dto.auth.RegisterRequest;
import com.sportmatches.backend.entity.User;
import com.sportmatches.backend.exception.InvalidUsernameOrPasswordException;
import com.sportmatches.backend.exception.UsernameAlreadyExistsException;
import com.sportmatches.backend.repository.UserRepository;
import com.sportmatches.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public AuthResponse register(RegisterRequest request) {

        try {
            if (request.getUsername() == null || request.getUsername().isEmpty() || request.getPassword() == null || request.getPassword().isEmpty())
                throw new InvalidUsernameOrPasswordException("Username and password cannot be empty");
//        if (!request.getPassword().equals(repeatPassword)) throw new PasswordsDoNotMatchException();
            if (userRepository.findByUsername(request.getUsername()).isPresent())
                throw new UsernameAlreadyExistsException(request.getUsername());
        } catch (InvalidUsernameOrPasswordException | UsernameAlreadyExistsException e) {
            throw new RuntimeException(e);
        }
        User user = new User(request.getUsername(), passwordEncoder.encode(request.getPassword()), request.email(), request.name());
        userRepository.save(user);
        return new AuthResponse(generateToken(user), user.getUsername(), user.getEmail(), user.getRole().name());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = null;
        try {
            if (request.getUsername() == null || request.getUsername().isEmpty() || request.getPassword() == null || request.getPassword().isEmpty())
                throw new InvalidUsernameOrPasswordException("Username and password cannot be empty");
            user = userRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException(request.getUsername()));
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
                throw new InvalidUsernameOrPasswordException("Invalid username or password");
        } catch (InvalidUsernameOrPasswordException e) {
            throw new RuntimeException(e);
        }
        return new AuthResponse(generateToken(user), user.getUsername(), user.getEmail(), user.getRole().name());
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found: " + username));
    }

    @Override
    public String generateToken(UserDetails userDetails) {
        return jwtService.generateToken(userDetails);
    }

    @Override
    public boolean validateToken(String token, UserDetails userDetails) {
        return jwtService.isValid(token, userDetails);
    }
}
