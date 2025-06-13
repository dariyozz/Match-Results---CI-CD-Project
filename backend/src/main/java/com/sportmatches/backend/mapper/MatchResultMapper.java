package com.sportmatches.backend.mapper;

import com.sportmatches.backend.dto.MatchResultDto;
import com.sportmatches.backend.entity.MatchResult;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MatchResultMapper {
    @Mapping(target = "matchId", source = "match.id")
    @Mapping(target = "mvpPlayerId", source = "mvp.id")
    MatchResultDto toDto(MatchResult result);

    @Mapping(target = "match.id", source = "matchId")
    @Mapping(target = "mvp.id", source = "mvpPlayerId")
    @Mapping(target = "playerStats", ignore = true)
    MatchResult toEntity(MatchResultDto dto);
}
