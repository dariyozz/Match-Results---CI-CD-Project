package com.sportmatches.backend.enums;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

@Getter
public enum Role implements GrantedAuthority {
    USER("ROLE_USER"),
    ADMIN("ROLE_ADMIN");

    private final String value;

    Role(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }

    @Override
    public String getAuthority() {
        return value;
    }
}
