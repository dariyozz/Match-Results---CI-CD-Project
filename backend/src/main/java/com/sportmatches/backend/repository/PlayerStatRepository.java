package com.sportmatches.backend.repository;

import com.sportmatches.backend.entity.PlayerStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerStatRepository extends JpaRepository<PlayerStat, Long> {
    List<PlayerStat> findByMatchResultId(Long matchResultId);
}
