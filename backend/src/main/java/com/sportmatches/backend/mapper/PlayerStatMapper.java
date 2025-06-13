package com.sportmatches.backend.mapper;

import com.sportmatches.backend.dto.PlayerStatDto;
import com.sportmatches.backend.entity.PlayerStat;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PlayerStatMapper {
    @Mapping(source = "matchResult.id", target = "matchResultId")
    @Mapping(source = "player.id", target = "playerId")
    PlayerStatDto toDto(PlayerStat stat);
    
    @Mapping(target = "matchResult", ignore = true)
    @Mapping(target = "player", ignore = true)
    PlayerStat toEntity(PlayerStatDto dto);
}