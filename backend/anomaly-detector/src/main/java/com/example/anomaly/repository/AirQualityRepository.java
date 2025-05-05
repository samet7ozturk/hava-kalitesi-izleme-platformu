package com.example.anomaly.repository;

import com.example.anomaly.entity.AirQualityReading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirQualityRepository extends JpaRepository<AirQualityReading, Long> {
}
