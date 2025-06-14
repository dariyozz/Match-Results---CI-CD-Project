package com.sportmatches.backend.service;

import com.sportmatches.backend.dto.PlayerStatDto;

import java.util.List;

public interface PlayerStatService {
    PlayerStatDto create(PlayerStatDto dto);
    List<PlayerStatDto> getByMatchResult(Long matchResultId);
}
