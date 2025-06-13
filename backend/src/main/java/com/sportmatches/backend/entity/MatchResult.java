package com.sportmatches.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "match_results")
public class MatchResult {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "match_id")
    private Match match;

    private int homeScore;
    private int awayScore;

    @ManyToOne
    @JoinColumn(name = "mvp_player_id")
    private Player mvp;

    @OneToMany(mappedBy = "matchResult", cascade = CascadeType.ALL)
    private List<PlayerStat> playerStats = new ArrayList<>();
}

