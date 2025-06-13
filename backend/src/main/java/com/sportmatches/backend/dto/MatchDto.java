package com.sportmatches.backend.dto;

public record MatchDto(
        Long id,
        TeamDto homeTeam,
        TeamDto awayTeam,
        String dateTime,
        Integer homeScore,
        Integer awayScore,
        String venue,
        String status
) {}