# 🌍 Hava Kalitesi İzleme Platformu

Gerçek zamanlı hava kalitesi verilerini izlemek, görselleştirmek ve anormallikleri tespit etmek için geliştirilmiş tam yığın (full-stack) bir web platformudur. Proje; sensör verilerini işler, harita üzerinde gösterir ve belirli eşiklere göre anomalileri tespit eder.

## 📑 İçindekiler

- [Özellikler](#özellikler)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [API Dökümantasyonu](#api-dökümantasyonu)
- [Test ve Scriptler](#test-ve-scriptler)
- [Veri Yönetimi](#veri-yönetimi)
- [Geliştirici Notları](#geliştirici-notları)
- [Lisans](#lisans)

---

## 🚀 Özellikler

- Gerçek zamanlı hava kalitesi izleme (PM2.5, PM10, CO2)
- Anomali tespiti (eşik bazlı)
- Harita üzerinde ısı haritası gösterimi
- Sensör bazlı zaman serisi grafikleri
- Docker ile tam yığın yapılandırma
- TimescaleDB ile zaman serisi veri yönetimi

---

## ⚙️ Kurulum

### 1. Gereksinimler

- Docker & Docker Compose
- Node.js (geliştirme için)
- Java 17+ (backend geliştirme için)

### 2. Başlatma

```bash
git clone https://github.com/kullaniciadi/proje-adi.git
cd proje-adi
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
