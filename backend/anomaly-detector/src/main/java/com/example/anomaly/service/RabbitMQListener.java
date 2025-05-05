package com.example.anomaly.service;

import com.example.anomaly.entity.AirQualityReading;
import com.example.anomaly.model.AirQualityData;
import com.example.anomaly.repository.AirQualityRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQListener {

    private final AnomalyDetectorService anomalyService;
    private final AirQualityRepository airQualityRepository;
    private final SimpMessagingTemplate ws;

    public RabbitMQListener(AnomalyDetectorService anomalyService,
                            AirQualityRepository airQualityRepository,
                            SimpMessagingTemplate ws) {
        this.anomalyService = anomalyService;
        this.airQualityRepository = airQualityRepository;
        this.ws = ws;
    }

    @RabbitListener(queues = "air-quality")
    public void receiveMessage(AirQualityData data) {
        boolean isAnomaly = anomalyService.isAnomalous(data);

        AirQualityReading reading = new AirQualityReading();
        reading.setLatitude(data.getLatitude());
        reading.setLongitude(data.getLongitude());
        reading.setParameter(data.getParameter());
        reading.setValue(data.getValue());
        reading.setTimestamp(data.getTimestamp());
        reading.setAnomalous(isAnomaly);

        airQualityRepository.save(reading);

        if (isAnomaly) {
            ws.convertAndSend("/topic/anomalies", reading);
            System.out.println("🚨 ANOMALİ TESPİT EDİLDİ ve yayınlandı!");
        } else {
            System.out.println("✅ Normal değer kaydedildi.");
        }
    }
}
