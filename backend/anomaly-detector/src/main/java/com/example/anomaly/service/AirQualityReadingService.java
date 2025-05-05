package com.example.anomaly.service;

import com.example.anomaly.entity.AirQualityReading;
import com.example.anomaly.repository.AirQualityReadingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirQualityReadingService {

    @Autowired
    private AirQualityReadingRepository repository;

    public List<AirQualityReading> getAllReadings() {
        return repository.findAll();
    }

    public Optional<AirQualityReading> getReadingById(Long id) {
        return repository.findById(id);
    }

    public AirQualityReading saveReading(AirQualityReading reading) {
        return repository.save(reading);
    }

    public void deleteReading(Long id) {
        repository.deleteById(id);
    }

    public List<AirQualityReading> getAnomalousReadings() {
        return repository.findByAnomalousTrue();
    }
}
