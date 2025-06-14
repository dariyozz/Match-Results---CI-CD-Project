package com.sportmatches.backend.service.impl;

import com.sportmatches.backend.dto.PlayerStatDto;
import com.sportmatches.backend.entity.MatchResult;
import com.sportmatches.backend.entity.Player;
import com.sportmatches.backend.entity.PlayerStat;
import com.sportmatches.backend.mapper.PlayerStatMapper;
import com.sportmatches.backend.repository.MatchResultRepository;
import com.sportmatches.backend.repository.PlayerRepository;
import com.sportmatches.backend.repository.PlayerStatRepository;
import com.sportmatches.backend.service.PlayerStatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerStatServiceImpl implements PlayerStatService {

    private final PlayerStatRepository statRepo;
    private final PlayerRepository playerRepo;
    private final MatchResultRepository resultRepo;
    private final PlayerStatMapper statMapper;

    public PlayerStatDto create(PlayerStatDto dto) {
        Player player = playerRepo.findById(dto.playerId()).orElseThrow();
        MatchResult result = resultRepo.findById(dto.matchResultId()).orElseThrow();

        PlayerStat stat = statMapper.toEntity(dto);
        stat.setPlayer(player);
        stat.setMatchResult(result);

        return statMapper.toDto(statRepo.save(stat));
    }

    public List<PlayerStatDto> getByMatchResult(Long matchResultId) {
        return statRepo.findByMatchResultId(matchResultId)
                .stream().map(statMapper::toDto).toList();
    }
}
