package com.sportmatches.backend.service.impl;

import com.sportmatches.backend.dto.MatchDto;
import com.sportmatches.backend.entity.Match;
import com.sportmatches.backend.entity.MatchResult;
import com.sportmatches.backend.entity.Team;
import com.sportmatches.backend.mapper.MatchMapper;
import com.sportmatches.backend.repository.MatchRepository;
import com.sportmatches.backend.repository.MatchResultRepository;
import com.sportmatches.backend.repository.TeamRepository;
import com.sportmatches.backend.service.MatchService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MatchServiceImpl implements MatchService {
    private final MatchRepository matchRepo;
    private final TeamRepository teamRepo;
    private final MatchMapper matchMapper;
    private final MatchResultRepository matchResultRepository; // Add this

    @Transactional
    public MatchDto scheduleMatch(MatchDto dto) {
        System.out.println("Scheduling match: " + dto);

        // Validate teams
        if (dto.homeTeam() == null || dto.awayTeam() == null ||
                dto.homeTeam().id() == null || dto.awayTeam().id() == null) {
            System.out.println("Invalid match DTO: " + dto);
            throw new IllegalArgumentException("Both home and away teams must be specified with valid IDs");
        }

        System.out.println("Validating teams: Home ID - " + dto.homeTeam().id() + ", Away ID - " + dto.awayTeam().id());

        // Get the complete team entities
        Team homeTeam = teamRepo.findById(dto.homeTeam().id())
                .orElseThrow(() -> new NoSuchElementException("Home team not found"));
        Team awayTeam = teamRepo.findById(dto.awayTeam().id())
                .orElseThrow(() -> new NoSuchElementException("Away team not found"));

        System.out.println("Found teams: Home - " + homeTeam + ", Away - " + awayTeam);
        // Create new match entity
        Match match = new Match();
        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);
        match.setDateTime(LocalDateTime.parse(dto.dateTime()));
        match.setLocation(dto.venue());
        match.setStatus(Match.Status.SCHEDULED);

        System.out.println("TESTTT");
        System.out.println("Created match entity: " + match);
        // Save the match
        Match savedMatch = matchRepo.save(match);
        System.out.println("Saved match: " + savedMatch);

        // Map to DTO and return
        return matchMapper.toDto(savedMatch);
    }


    public MatchDto getMatch(Long id) {
        return matchRepo.findById(id)
                .map(matchMapper::toDto)
                .orElseThrow(() -> new NoSuchElementException("Match not found"));
    }

    public List<MatchDto> findAll() {
        return matchRepo.findAll()
                .stream().map(matchMapper::toDto).toList();
    }

    public List<MatchDto> getMatchesByStatus(String status) {
        return matchRepo.findByStatus(Match.Status.valueOf(status.toUpperCase()))
                .stream().map(matchMapper::toDto).toList();
    }

    @Transactional
    public MatchDto updateMatch(Long id, MatchDto dto) {
        Match match = matchRepo.findById(id).orElseThrow();
        match.setDateTime(LocalDateTime.parse(dto.dateTime()));
        match.setLocation(dto.venue());
        match.setStatus(Match.Status.valueOf(dto.status().toUpperCase()));
        match.setHomeTeam(teamRepo.findById(dto.homeTeam().id())
                .orElseThrow(() -> new NoSuchElementException("Home team not found")));
        match.setAwayTeam(teamRepo.findById(dto.awayTeam().id())
                .orElseThrow(() -> new NoSuchElementException("Away team not found")));

        // Handle match result

        MatchResult result = matchResultRepository.findByMatchId(id)
                .orElse(new MatchResult());
        result.setMatch(match);
        result.setHomeScore(dto.homeScore());
        result.setAwayScore(dto.awayScore());
        match.setResult(result);
        matchResultRepository.save(result);


        return matchMapper.toDto(matchRepo.save(match));
    }


    public void cancelMatch(Long id) {
        Match match = matchRepo.findById(id).orElseThrow();
        match.setStatus(Match.Status.CANCELED);
        matchRepo.save(match);
    }
}