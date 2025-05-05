package com.example.dataingest.model;

import java.io.Serializable;

public class AirQualityReading implements Serializable {
    private double latitude;
    private double longitude;
    private String parameter;
    private double value;

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getParameter() {
        return parameter;
    }

    public void setParameter(String parameter) {
        this.parameter = parameter;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    @Override
    public String toString() {
    return "AirQualityReading{" +
            "latitude=" + latitude +
            ", longitude=" + longitude +
            ", parameter='" + parameter + '\'' +
            ", value=" + value +
            '}';
    }
}
