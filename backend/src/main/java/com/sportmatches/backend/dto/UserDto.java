package com.sportmatches.backend.dto;

import java.util.UUID;

public record UserDto(
        UUID id,
        String username,
        String email,
        String role
) {}
