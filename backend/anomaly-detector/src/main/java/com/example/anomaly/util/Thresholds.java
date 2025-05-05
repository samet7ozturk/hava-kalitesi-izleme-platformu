package com.example.anomaly.util;

import java.util.HashMap;
import java.util.Map;

public class Thresholds {
    private static final Map<String, Double> thresholdMap = new HashMap<>();

    static {
        thresholdMap.put("PM2.5", 25.0);
        thresholdMap.put("PM10", 50.0);
        thresholdMap.put("NO2", 40.0);
        thresholdMap.put("SO2", 20.0);
        thresholdMap.put("O3", 100.0);
    }

    public static double getThreshold(String parameter) {
        return thresholdMap.getOrDefault(parameter.toUpperCase(), Double.MAX_VALUE);
    }
}
