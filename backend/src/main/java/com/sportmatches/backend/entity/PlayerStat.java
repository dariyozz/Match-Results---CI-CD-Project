package com.sportmatches.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "player_stats")
@Data
public class PlayerStat {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "match_result_id")
    private MatchResult matchResult;

    @ManyToOne
    @JoinColumn(name = "player_id")
    private Player player;

    private int goals;
    private int assists;
    private int yellowCards;
    private int redCards;
    private int minutesPlayed;
}
