package com.sportmatches.backend.mapper;

import com.sportmatches.backend.dto.TeamDto;
import com.sportmatches.backend.entity.Team;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TeamMapper {
    // Ignore the players collection
    TeamDto toDto(Team team);
    
    @Mapping(target = "players", ignore = true)  // Ignore the players collection
    Team toEntity(TeamDto dto);
}