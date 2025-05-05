package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.example.dataingest")
public class DataIngestServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(DataIngestServiceApplication.class, args);
    }
}
