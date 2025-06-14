package com.sportmatches.backend.service;

import com.sportmatches.backend.dto.MatchDto;

import java.util.List;

public interface MatchService {
    MatchDto scheduleMatch(MatchDto dto);
    MatchDto getMatch(Long id);
    List<MatchDto> findAll();
    List<MatchDto> getMatchesByStatus(String status);
    MatchDto updateMatch(Long id, MatchDto dto);
    void cancelMatch(Long id);
}
