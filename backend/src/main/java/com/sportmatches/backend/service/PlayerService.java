package com.sportmatches.backend.service;

import com.sportmatches.backend.dto.PlayerDto;

import java.util.List;

public interface PlayerService {
    PlayerDto createPlayer(PlayerDto dto);

    PlayerDto getPlayerById(Long id);

    List<PlayerDto> getPlayersByTeam(Long teamId);

    PlayerDto updatePlayer(Long id, PlayerDto dto);

    void deletePlayer(Long id);

    PlayerDto assignPlayerToTeam(Long playerId, Long teamId);

    List<PlayerDto> getAllPlayers();
}
