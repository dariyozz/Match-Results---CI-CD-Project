package com.sportmatches.backend.service.impl;

import com.sportmatches.backend.dto.MatchResultDto;
import com.sportmatches.backend.entity.Match;
import com.sportmatches.backend.entity.MatchResult;
import com.sportmatches.backend.entity.Player;
import com.sportmatches.backend.mapper.MatchResultMapper;
import com.sportmatches.backend.repository.MatchRepository;
import com.sportmatches.backend.repository.MatchResultRepository;
import com.sportmatches.backend.repository.PlayerRepository;
import com.sportmatches.backend.service.MatchResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MatchResultServiceImpl implements MatchResultService {
    private final MatchResultRepository resultRepo;
    private final MatchRepository matchRepo;
    private final PlayerRepository playerRepo;
    private final MatchResultMapper mapper;

    public MatchResultDto addResult(MatchResultDto dto) {
        Match match = matchRepo.findById(dto.matchId())
                .orElseThrow(() -> new NoSuchElementException("Match not found"));
        Player mvp = playerRepo.findById(dto.mvpPlayerId())
                .orElseThrow(() -> new NoSuchElementException("Player not found"));

        MatchResult result = mapper.toEntity(dto);
        result.setMatch(match);
        result.setMvp(mvp);
        return mapper.toDto(resultRepo.save(result));
    }

    public MatchResultDto getResultByMatchId(Long matchId) {
        return resultRepo.findByMatchId(matchId)
                .map(mapper::toDto)
                .orElseThrow(() -> new NoSuchElementException("Result not found"));
    }
}
