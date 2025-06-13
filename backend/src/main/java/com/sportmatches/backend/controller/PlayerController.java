package com.sportmatches.backend.controller;

import com.sportmatches.backend.dto.PlayerDto;
import com.sportmatches.backend.service.PlayerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping
    public ResponseEntity<List<PlayerDto>> getAll() {
        return ResponseEntity.ok(playerService.getAllPlayers());
    }

    @PostMapping
    public ResponseEntity<PlayerDto> create(@RequestBody @Valid PlayerDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(playerService.createPlayer(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayerDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(playerService.getPlayerById(id));
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<PlayerDto>> getByTeam(@PathVariable Long teamId) {
        return ResponseEntity.ok(playerService.getPlayersByTeam(teamId));
    }

    //assign player to a team
    @PostMapping("/{playerId}/team/{teamId}")
    public ResponseEntity<PlayerDto> assignToTeam(@PathVariable Long playerId, @PathVariable Long teamId) {
        return ResponseEntity.ok(playerService.assignPlayerToTeam(playerId, teamId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlayerDto> update(@PathVariable Long id, @RequestBody @Valid PlayerDto dto) {
        return ResponseEntity.ok(playerService.updatePlayer(id, dto));
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        playerService.deletePlayer(id);
        return ResponseEntity.noContent().build();
    }
}
