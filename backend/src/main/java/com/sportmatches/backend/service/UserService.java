package com.sportmatches.backend.service;

import com.sportmatches.backend.entity.User;
import com.sportmatches.backend.enums.Role;
import com.sportmatches.backend.exception.InvalidUsernameOrPasswordException;
import com.sportmatches.backend.exception.UsernameAlreadyExistsException;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    User register(String username, String password, String repeatPassword, String name, String surname, Role role) throws UsernameAlreadyExistsException, InvalidUsernameOrPasswordException;

    User login(String username, String password) throws InvalidUsernameOrPasswordException;

    User findByUsername(String username);
}

