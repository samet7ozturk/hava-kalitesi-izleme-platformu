package com.example.anomaly.model;

import java.io.Serializable;

public class AirQualityData implements Serializable {
    private static final long serialVersionUID = 1L;

    private double latitude;
    private double longitude;
    private String parameter;
    private double value;
    private long timestamp;

    public AirQualityData() {}

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
}
