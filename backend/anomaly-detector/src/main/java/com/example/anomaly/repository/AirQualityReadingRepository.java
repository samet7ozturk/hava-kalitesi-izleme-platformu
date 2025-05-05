package com.example.anomaly.repository;

import com.example.anomaly.entity.AirQualityReading;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AirQualityReadingRepository extends JpaRepository<AirQualityReading, Long> {
    List<AirQualityReading> findByAnomalousTrue();
}
