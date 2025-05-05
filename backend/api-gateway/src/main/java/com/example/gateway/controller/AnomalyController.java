package com.example.gateway.controller;

import com.example.gateway.entity.AirQualityReading;
import com.example.gateway.repository.AirQualityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/anomalies")
public class AnomalyController {

    private final AirQualityRepository repository;

    public AnomalyController(AirQualityRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<AirQualityReading> getAnomalies(
        @RequestParam long from,
        @RequestParam long to
    ) {
        return repository.findByAnomalousIsTrueAndTimestampBetween(from, to);
    }
}
