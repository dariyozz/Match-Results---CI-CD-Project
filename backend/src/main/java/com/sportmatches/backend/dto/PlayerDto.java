package com.sportmatches.backend.dto;

import java.time.LocalDate;

public record PlayerDto(
        Long id,
        String name,
        String position,
        int number,
        LocalDate dateOfBirth,
        Long teamId
) {}
