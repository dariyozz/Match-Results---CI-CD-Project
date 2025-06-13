package com.sportmatches.backend.dto;

public record MatchResultDto(
        Long id,
        Long matchId,
        int homeScore,
        int awayScore,
        Long mvpPlayerId
) {}
