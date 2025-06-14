package com.sportmatches.backend.exception;

public class InvalidUsernameOrPasswordException extends Exception {
    public InvalidUsernameOrPasswordException(String message) {
        super(message);
    }

    public InvalidUsernameOrPasswordException(String message, Throwable cause) {
        super(message, cause);
    }
}
