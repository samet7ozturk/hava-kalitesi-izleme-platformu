package com.example.gateway.repository;

import com.example.gateway.entity.AirQualityReading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AirQualityRepository extends JpaRepository<AirQualityReading, Long> {

    // Anomalileri zaman aralığına göre getirir
    List<AirQualityReading> findByAnomalousIsTrueAndTimestampBetween(long from, long to);

    // Belirli bir konuma en yakın son veriyi getirir
    Optional<AirQualityReading> findTopByLatitudeBetweenAndLongitudeBetweenOrderByTimestampDesc(
            double latMin, double latMax,
            double lngMin, double lngMax
    );

    // Heatmap için belirli bir bölgede yer alan tüm verileri getirir
    List<AirQualityReading> findByLatitudeBetweenAndLongitudeBetween(
            double latMin, double latMax,
            double lngMin, double lngMax
    );
}
