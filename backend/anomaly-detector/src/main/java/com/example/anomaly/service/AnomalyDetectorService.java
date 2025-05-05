package com.example.anomaly.service;

import com.example.anomaly.model.AirQualityData;
import com.example.anomaly.util.Thresholds;
import org.springframework.stereotype.Service;

@Service
public class AnomalyDetectorService {

    public boolean isAnomalous(AirQualityData data) {
        double threshold = Thresholds.getThreshold(data.getParameter());
        return data.getValue() > threshold;
    }
}
