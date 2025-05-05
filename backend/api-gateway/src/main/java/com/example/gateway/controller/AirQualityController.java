package com.example.gateway.controller;

import com.example.gateway.entity.AirQualityReading;
import com.example.gateway.repository.AirQualityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/air-quality")
public class AirQualityController {

    private final AirQualityRepository repository;

    public AirQualityController(AirQualityRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<AirQualityReading> getLatestReading(
            @RequestParam double lat,
            @RequestParam double lng
    ) {
        double tolerance = 0.01;

        Optional<AirQualityReading> result = repository
                .findTopByLatitudeBetweenAndLongitudeBetweenOrderByTimestampDesc(
                        lat - tolerance, lat + tolerance,
                        lng - tolerance, lng + tolerance
                );

        return result.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
