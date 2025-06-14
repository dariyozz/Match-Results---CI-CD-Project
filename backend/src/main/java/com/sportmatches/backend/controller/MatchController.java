package com.sportmatches.backend.controller;

import com.sportmatches.backend.dto.MatchDto;
import com.sportmatches.backend.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    @GetMapping
    public ResponseEntity<List<MatchDto>> getAll() {
        return ResponseEntity.ok(matchService.findAll());
    }

    @PostMapping
    public ResponseEntity<MatchDto> schedule(@RequestBody MatchDto dto) {
        System.out.println("Controller received request with DTO: " + dto);
        try {
            MatchDto result = matchService.scheduleMatch(dto);
            System.out.println("Controller received response: " + result);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (Exception e) {
            System.err.println("Error in controller: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to schedule match: " + e.getMessage(), e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(matchService.getMatch(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<MatchDto>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(matchService.getMatchesByStatus(status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MatchDto> update(@PathVariable Long id, @RequestBody MatchDto dto) {
        return ResponseEntity.ok(matchService.updateMatch(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancel(@PathVariable Long id) {
        matchService.cancelMatch(id);
        return ResponseEntity.noContent().build();
    }
}