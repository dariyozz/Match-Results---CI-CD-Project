package com.sportmatches.backend.mapper;

import com.sportmatches.backend.dto.PlayerDto;
import com.sportmatches.backend.entity.Player;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PlayerMapper {
    @Mapping(source = "team.id", target = "teamId")
    PlayerDto toDto(Player player);
    
    @Mapping(target = "team", ignore = true)
    Player toEntity(PlayerDto dto);
}