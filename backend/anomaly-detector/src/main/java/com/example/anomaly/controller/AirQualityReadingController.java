package com.example.anomaly.controller;

import com.example.anomaly.entity.AirQualityReading;
import com.example.anomaly.service.AirQualityReadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/readings")
@CrossOrigin(origins = "*")
public class AirQualityReadingController {

    @Autowired
    private AirQualityReadingService service;

    @GetMapping
    public List<AirQualityReading> getAllReadings() {
        return service.getAllReadings();
    }

    @GetMapping("/{id}")
    public Optional<AirQualityReading> getReadingById(@PathVariable Long id) {
        return service.getReadingById(id);
    }

    @PostMapping
    public AirQualityReading createReading(@RequestBody AirQualityReading reading) {
        return service.saveReading(reading);
    }

    @DeleteMapping("/{id}")
    public void deleteReading(@PathVariable Long id) {
        service.deleteReading(id);
    }

    @GetMapping("/anomalies")
    public List<AirQualityReading> getAnomalousReadings() {
        return service.getAnomalousReadings();
    }
}
