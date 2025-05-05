package com.example.gateway.controller;

import com.example.gateway.entity.AirQualityReading;
import com.example.gateway.repository.AirQualityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/heatmap")
public class HeatmapController {

    private final AirQualityRepository repository;

    public HeatmapController(AirQualityRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<AirQualityReading> getHeatmapData(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "25") double radius // km
    ) {
        // 1 derece ≈ 111 km, yaklaşık hesap
        double degreeTolerance = radius / 111.0;

        return repository.findByLatitudeBetweenAndLongitudeBetween(
                lat - degreeTolerance, lat + degreeTolerance,
                lng - degreeTolerance, lng + degreeTolerance
        );
    }
}
