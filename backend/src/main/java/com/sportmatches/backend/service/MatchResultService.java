package com.sportmatches.backend.service;

import com.sportmatches.backend.dto.MatchResultDto;

public interface MatchResultService {
    MatchResultDto addResult(MatchResultDto dto);
    MatchResultDto getResultByMatchId(Long matchId);
}
