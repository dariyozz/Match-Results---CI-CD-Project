package com.sportmatches.backend.service;

import com.sportmatches.backend.dto.TeamDto;

import java.util.List;

public interface TeamService {
    TeamDto createTeam(TeamDto dto);
    TeamDto getTeamById(Long id);
    List<TeamDto> getAllTeams();
    TeamDto updateTeam(Long id, TeamDto dto);
    void deleteTeam(Long id);

}
