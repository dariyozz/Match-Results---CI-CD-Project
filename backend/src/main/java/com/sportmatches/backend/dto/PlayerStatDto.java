package com.sportmatches.backend.dto;

public record PlayerStatDto(
        Long id,
        Long matchResultId,
        Long playerId,
        int goals,
        int assists,
        int yellowCards,
        int redCards,
        int minutesPlayed
) {}
