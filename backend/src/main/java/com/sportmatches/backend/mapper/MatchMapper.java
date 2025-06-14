package com.sportmatches.backend.mapper;

import com.sportmatches.backend.dto.MatchDto;
import com.sportmatches.backend.entity.Match;
import com.sportmatches.backend.entity.MatchResult;
import com.sportmatches.backend.repository.MatchResultRepository;
import org.springframework.stereotype.Component;

@Component
public class MatchMapper {

    private final TeamMapper teamMapper;
    private final MatchResultRepository matchResultRepository;

    public MatchMapper(TeamMapper teamMapper, MatchResultRepository matchResultRepository) {
        this.teamMapper = teamMapper;
        this.matchResultRepository = matchResultRepository;
    }

    public MatchDto toDto(Match match) {
        //debug message
        System.out.println("TEST");
        System.out.println("Converting Match entity to MatchDto: " + match);
        return new MatchDto(
                match.getId(),
                teamMapper.toDto(match.getHomeTeam()),
                teamMapper.toDto(match.getAwayTeam()),
                match.getDateTime().toString(),
                matchResultRepository.findByMatchId(match.getId())
                        .map(MatchResult::getHomeScore)
                        .orElse(0),
                matchResultRepository.findByMatchId(match.getId())
                        .map(MatchResult::getAwayScore)
                        .orElse(0),
                match.getLocation(),
                match.getStatus().name()
        );
    }

    public Match toEntity(MatchDto dto) {
        Match match = new Match();
        match.setId(dto.id());
        match.setHomeTeam(teamMapper.toEntity(dto.homeTeam()));
        match.setAwayTeam(teamMapper.toEntity(dto.awayTeam()));
        match.setDateTime(java.time.LocalDateTime.parse(dto.dateTime()));
        match.setLocation(dto.venue());
        match.setStatus(Match.Status.valueOf(dto.status().toUpperCase()));
        return match;
    }
}