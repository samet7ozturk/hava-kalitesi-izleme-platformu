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
```

Frontend arayüzü: http://localhost:3000

Backend API: http://localhost:8080/api

---

## 🧪 Kullanım

Uygulama çalıştıktan sonra:

- Harita ve grafik arayüzü üzerinden verileri görebilirsiniz.
- Test amaçlı örnek veri göndermek için aşağıdaki scriptleri kullanabilirsiniz:

```bash
bash scripts/manual-input.sh
bash scripts/auto-test.sh
```

---

## 📡 API Dökümantasyonu

GET /api/air-quality
Açıklama: Belirli konumda güncel hava kalitesini döner.

Parametre    Tip    Açıklama
lat	         Float	Enlem
lng	         Float	Boylam

GET /api/heatmap
Açıklama: Verilen konum ve yarıçapta ölçüm verilerini döner.

Parametre    Tip    Açıklama
lat	         Float	Merkez enlem
lng	         Float	Merkez boylam
radius	     Number	(opsiyonel) metre

GET /api/anomalies
Açıklama: Zaman aralığına göre anomali verilerini döner.

Parametre    Tip    Açıklama
from         Unix   Başlangıç zaman damgası
to           Unix   Bitiş zaman damgası

---

## 🛠️ Test ve Scriptler

- scripts/manual-input.sh: Elle test verisi gönderimi
- scripts/auto-test.sh: Otomatik, rastgele verili test senaryosu
- ChartPage: PM2.5, PM10, CO2 için dropdown seçimli zaman serisi grafiği

---

## 🗃️ Veri Yönetimi

- TimescaleDB Hypertable: Performanslı zaman serisi verisi saklama
- Retention Policy: Eski verilerin otomatik olarak silinmesi (örneğin 30 gün)
- Spring Boot Actuator: Uygulama sağlık ve metrik izleme endpoint'leri
- SLF4J + Logback: Gelişmiş loglama altyapısı

---

## 🧑‍💻 Geliştirici Notları

- Backend: Java + Spring Boota
- Frontend: React + TypeScript
- Veritabanı: PostgreSQL + TimescaleDB eklentisi
- CI/CD Önerisi: GitHub Actions (build, test ve deploy)
- Test: JUnit, Mockito, Testcontainers ile birim ve entegrasyon testleri
- Docker Healthcheck: Servis sağlığı için healthcheck tanımları
