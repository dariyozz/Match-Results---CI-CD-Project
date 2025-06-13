package com.sportmatches.backend.exception;

public class UsernameAlreadyExistsException extends Exception {
    public UsernameAlreadyExistsException(String username) {
        super("Username already exists: " + username);
    }

    public UsernameAlreadyExistsException(String username, Throwable cause) {
        super("Username already exists: " + username, cause);
    }
}
