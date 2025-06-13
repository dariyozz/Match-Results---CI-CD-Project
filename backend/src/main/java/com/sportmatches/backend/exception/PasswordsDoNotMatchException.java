package com.sportmatches.backend.exception;

public class PasswordsDoNotMatchException extends Exception {
    public PasswordsDoNotMatchException() {
        super("Passwords do not match");
    }

    public PasswordsDoNotMatchException(String message) {
        super(message);
    }

    public PasswordsDoNotMatchException(String message, Throwable cause) {
        super(message, cause);
    }
}
