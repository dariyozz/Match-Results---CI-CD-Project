package com.sportmatches.backend.service.impl;

import com.sportmatches.backend.entity.User;
import com.sportmatches.backend.enums.Role;
import com.sportmatches.backend.exception.InvalidUsernameOrPasswordException;
import com.sportmatches.backend.repository.UserRepository;
import com.sportmatches.backend.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(
                username));
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(
                username));
    }

    @Override
    public User register(
            String username,
            String password,
            String repeatPassword,
            String name,
            String surname,
            Role userRole
    ) throws InvalidUsernameOrPasswordException {
        if (username == null || username.isEmpty() || password == null || password.isEmpty())
            throw new InvalidUsernameOrPasswordException("Username and password cannot be empty");
        if (!password.equals(repeatPassword)) throw new InvalidUsernameOrPasswordException("Passwords do not match");
        if (userRepository.findByUsername(username).isPresent())
            throw new InvalidUsernameOrPasswordException("Username already exists: " + username);
        User user = new User(username, passwordEncoder.encode(password), name, surname, userRole);
        return userRepository.save(user);
    }

    @Override
    public User login(String username, String password) throws InvalidUsernameOrPasswordException {
        if (username == null || username.isEmpty() || password == null || password.isEmpty())
            throw new InvalidUsernameOrPasswordException("Username and password cannot be empty");
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new InvalidUsernameOrPasswordException("Invalid username or password"));
        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new InvalidUsernameOrPasswordException("Invalid username or password");
        return user;
    }
}