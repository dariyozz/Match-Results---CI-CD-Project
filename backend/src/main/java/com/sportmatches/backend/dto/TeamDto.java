package com.sportmatches.backend.dto;

public record TeamDto(
        Long id,
        String name,
        String coachName,
        String logoUrl
) {}
