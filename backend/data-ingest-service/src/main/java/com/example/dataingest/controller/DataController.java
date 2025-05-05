package com.example.dataingest.controller;

import com.example.dataingest.model.AirQualityReading;
import com.example.dataingest.service.RabbitMQSenderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/data")
public class DataController {

    private final RabbitMQSenderService rabbitMQSender;

    public DataController(RabbitMQSenderService rabbitMQSender) {
        this.rabbitMQSender = rabbitMQSender;
    }

    @PostMapping
    public ResponseEntity<?> ingestData(@RequestBody AirQualityReading data) {
        System.out.println("Received: " + data);
        rabbitMQSender.send(data);
        return ResponseEntity.ok().build();
    }
}
