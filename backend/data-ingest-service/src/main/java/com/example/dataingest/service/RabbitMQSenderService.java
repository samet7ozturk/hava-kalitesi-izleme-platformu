package com.example.dataingest.service;

import com.example.dataingest.model.AirQualityReading;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQSenderService {

    private final RabbitTemplate rabbitTemplate;

    @Value("${app.queue.name}")
    private String queueName;

    public RabbitMQSenderService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void send(AirQualityReading reading) {
        rabbitTemplate.convertAndSend(queueName, reading);
    }
}
