package com.sportmatches.backend.controller;

import com.sportmatches.backend.dto.MatchResultDto;
import com.sportmatches.backend.service.MatchResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class MatchResultController {
    private final MatchResultService resultService;

    @PostMapping
    public ResponseEntity<MatchResultDto> create(@RequestBody MatchResultDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(resultService.addResult(dto));
    }

    @GetMapping("/match/{matchId}")
    public ResponseEntity<MatchResultDto> get(@PathVariable Long matchId) {
        return ResponseEntity.ok(resultService.getResultByMatchId(matchId));
    }
}
