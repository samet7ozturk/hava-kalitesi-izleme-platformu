package com.example.gateway.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "air_quality_readings")
public class AirQualityReading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double latitude;
    private double longitude;
    private String parameter;
    private double value;
    private long timestamp;
    private boolean anomalous;

    public AirQualityReading() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public String getParameter() { return parameter; }
    public void setParameter(String parameter) { this.parameter = parameter; }

    public double getValue() { return value; }
    public void setValue(double value) { this.value = value; }

    public long getTimestamp() { return timestamp; }
    public void setTimestamp(long timestamp) { this.timestamp = timestamp; }

    public boolean isAnomalous() { return anomalous; }
    public void setAnomalous(boolean anomalous) { this.anomalous = anomalous; }
}
