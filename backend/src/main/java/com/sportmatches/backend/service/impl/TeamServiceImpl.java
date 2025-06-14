package com.sportmatches.backend.service.impl;

import com.sportmatches.backend.dto.PlayerDto;
import com.sportmatches.backend.dto.TeamDto;
import com.sportmatches.backend.entity.Team;
import com.sportmatches.backend.mapper.TeamMapper;
import com.sportmatches.backend.repository.TeamRepository;
import com.sportmatches.backend.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepo;
    private final TeamMapper teamMapper;

    public TeamDto createTeam(TeamDto dto) {
        Team team = teamMapper.toEntity(dto);
        return teamMapper.toDto(teamRepo.save(team));
    }

    public TeamDto getTeamById(Long id) {
        return teamRepo.findById(id)
                .map(teamMapper::toDto)
                .orElseThrow(() -> new NoSuchElementException("Team not found"));
    }

    public List<TeamDto> getAllTeams() {
        return teamRepo.findAll().stream()
                .map(teamMapper::toDto)
                .toList();
    }

    public TeamDto updateTeam(Long id, TeamDto dto) {
        Team team = teamRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Team not found"));
        team.setName(dto.name());
        team.setCoachName(dto.coachName());
        team.setLogoUrl(dto.logoUrl());
        return teamMapper.toDto(teamRepo.save(team));
    }

    public void deleteTeam(Long id) {
        teamRepo.deleteById(id);
    }


}
