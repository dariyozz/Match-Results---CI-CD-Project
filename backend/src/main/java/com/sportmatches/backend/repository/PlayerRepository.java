package com.sportmatches.backend.repository;

import com.sportmatches.backend.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByTeamId(Long teamId);
}
