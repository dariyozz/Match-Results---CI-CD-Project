package com.sportmatches.backend.controller;

import com.sportmatches.backend.dto.PlayerStatDto;
import com.sportmatches.backend.service.PlayerStatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class PlayerStatController {
    private final PlayerStatService statService;

    @PostMapping
    public ResponseEntity<PlayerStatDto> create(@RequestBody PlayerStatDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(statService.create(dto));
    }

    @GetMapping("/match-result/{id}")
    public ResponseEntity<List<PlayerStatDto>> getByResult(@PathVariable Long id) {
        return ResponseEntity.ok(statService.getByMatchResult(id));
    }
}
