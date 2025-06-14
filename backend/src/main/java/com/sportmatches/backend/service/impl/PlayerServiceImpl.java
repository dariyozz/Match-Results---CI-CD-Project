package com.sportmatches.backend.service.impl;

import com.sportmatches.backend.dto.PlayerDto;
import com.sportmatches.backend.entity.Player;
import com.sportmatches.backend.entity.Team;
import com.sportmatches.backend.mapper.PlayerMapper;
import com.sportmatches.backend.repository.PlayerRepository;
import com.sportmatches.backend.repository.TeamRepository;
import com.sportmatches.backend.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository playerRepo;
    private final TeamRepository teamRepo;
    private final PlayerMapper playerMapper;

    @Override
    public PlayerDto createPlayer(PlayerDto dto) {
        Player player = playerMapper.toEntity(dto);
        Team team = teamRepo.findById(dto.teamId())
                .orElseThrow(() -> new IllegalArgumentException("Team not found"));

        player.setTeam(team);
        return playerMapper.toDto(playerRepo.save(player));
    }

    @Override
    public PlayerDto getPlayerById(Long id) {
        return playerRepo.findById(id)
                .map(playerMapper::toDto)
                .orElseThrow(() -> new NoSuchElementException("Player not found"));
    }

    @Override
    public List<PlayerDto> getPlayersByTeam(Long teamId) {
        return playerRepo.findByTeamId(teamId)
                .stream()
                .map(playerMapper::toDto)
                .toList();
    }

    @Override
    public PlayerDto updatePlayer(Long id, PlayerDto dto) {
        Player existing = playerRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Player not found"));

        existing.setName(dto.name());
        existing.setPosition(dto.position());
        existing.setNumber(dto.number());
        existing.setDateOfBirth(dto.dateOfBirth());

        if (!existing.getTeam().getId().equals(dto.teamId())) {
            Team newTeam = teamRepo.findById(dto.teamId())
                    .orElseThrow(() -> new NoSuchElementException("Team not found"));
            existing.setTeam(newTeam);
        }

        return playerMapper.toDto(playerRepo.save(existing));
    }

    @Override
    public void deletePlayer(Long id) {
        playerRepo.deleteById(id);
    }

    @Override
    public PlayerDto assignPlayerToTeam(Long playerId, Long teamId) {
        Player player = playerRepo.findById(playerId)
                .orElseThrow(() -> new NoSuchElementException("Player not found"));
        Team team = teamRepo.findById(teamId)
                .orElseThrow(() -> new NoSuchElementException("Team not found"));

        player.setTeam(team);
        return playerMapper.toDto(playerRepo.save(player));
    }

    @Override
    public List<PlayerDto> getAllPlayers() {
        return playerRepo.findAll()
                .stream()
                .map(playerMapper::toDto)
                .toList();
    }
}
