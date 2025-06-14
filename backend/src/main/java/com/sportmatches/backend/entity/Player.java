package com.sportmatches.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "players")
@Data
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String position;
    private int number;
    private LocalDate dateOfBirth;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
}
