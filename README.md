Hava Kalitesi İzleme Platformu

İçindekiler

Projenin Amacı

Mimari

Teknolojiler

Kurulum

Kullanım

Backend

Frontend

Scriptler

API Dokümantasyonu

Diagramlar

Troubleshooting

İletişim

Projenin Amacı

Bu proje, dünya genelindeki hava kirlilik verilerini toplayan, analiz eden ve görselleştiren web tabanlı bir platform geliştirmeyi amaçlamaktadır. Anomali tespiti ile kullanıcılar, kritik kirlilik seviyelerinden anında haberdar olur.

Mimari

Data Ingest Service: Hava kalitesi verilerini REST API aracılığıyla alır ve RabbitMQ kuyruğuna gönderir.

Anomaly Detector Service: Mesaj kuyruklarından beslenerek veri işleme ve anomali tespiti gerçekleştirir. Sonuçları TimescaleDB'ye kaydeder ve WebSocket üzerinden abonelere iletir.

API Gateway: Tüm servisleri tek çatı altında sunar, veritabanına erişim sağlar ve REST/WebSocket endpoint’lerini yönetir.

Frontend: React + Leaflet/Chart.js tabanlı kullanıcı arayüzü.

Teknolojiler

Backend: Spring Boot (Java 17), RabbitMQ, TimescaleDB

Frontend: React, Leaflet, Chart.js, STOMP/SockJS

Containerization: Docker, docker-compose

Diğer: GitHub Actions (CI), JUnit/Mockito (Test)

Kurulum

Depoyu klonlayın:

git clone <repo_url>
cd air-quality-monitoring

Ortam değişkenlerini ayarlayın:

.env dosyasına API URL ve diğer ayarları ekleyin.

Tüm servisi ayağa kaldırın:

docker-compose up --build

Frontend http://localhost:3000, API http://localhost:8080 adreslerinde çalışacaktır.

Kullanım

Backend

Veri Besleme (Manual):

./manual-input.sh <latitude> <longitude> <parameter> <value>

Otomatik Test:

./auto-test.sh --duration=60 --rate=5 --anomaly-chance=10

Frontend

Tarayıcıda http://localhost:3000 adresini açın.

Menüden Anomaliler, Harita ve Grafik sayfalarına erişin.

Scriptler

manual-input.sh: Elle veri gönderme

auto-test.sh: Rastgele veri ve anomali simülasyonu

API Dokümantasyonu

Endpoint

Metod

Açıklama

Örnek URL

/api/readings

GET

Tüm okumaları getirir

/api/readings

/api/readings/{id}

GET

Belirli ID ile okuma

/api/readings/123

/api/anomalies

GET

Zaman aralığındaki anomalileri listeler

/api/anomalies?from=TS&to=TS

/api/heatmap

GET

Koordinat ve yarıçapa göre ısı haritası verisi

/api/heatmap?lat=..&lng=..&radius=..

/api/air-quality

GET

Belirli konumun en son değerini getirir

/api/air-quality?lat=..&lng=..

Diagramlar



Troubleshooting

Bağlantı Hataları: Servislerin port ve CORS ayarlarını kontrol edin.

Veri Gelmeme: RabbitMQ ve TimescaleDB log’larını inceleyin.

İletişim

Sorumlu: Samet Emre