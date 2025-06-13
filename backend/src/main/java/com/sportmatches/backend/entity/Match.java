package com.sportmatches.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@ToString(exclude = {"homeTeam", "awayTeam", "result"})
@EqualsAndHashCode(exclude = {"homeTeam", "awayTeam", "result"})
@Table(name = "matches")
@Data
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "home_team_id")
    private Team homeTeam;

    @ManyToOne
    @JoinColumn(name = "away_team_id")
    private Team awayTeam;

    private LocalDateTime dateTime;
    private String location;

    @Enumerated(EnumType.STRING)
    private Status status = Status.SCHEDULED;

    public enum Status {
        SCHEDULED, COMPLETED, CANCELED
    }

    @OneToOne(mappedBy = "match", cascade = CascadeType.ALL)
    private MatchResult result;
}
