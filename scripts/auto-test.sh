# scripts/auto-test.sh

set -euo pipefail

# Default değerler
DURATION=60          # saniye
RATE=1               # saniyede istek
ANOMALY_CHANCE=10    # yüzde

# Eşik değerleri
declare -A TH
TH["PM2.5"]=25
TH["PM10"]=50
TH["NO2"]=40
TH["SO2"]=20
TH["O3"]=100

usage(){
  echo "Kullanım: $0 [--duration=<saniye>] [--rate=<req/s>] [--anomaly-chance=<yüzde>]"
  exit 1
}

# Argüman parsing
for arg in "$@"; do
  case $arg in
    --duration=*)       DURATION="${arg#*=}" ;;
    --rate=*)           RATE="${arg#*=}" ;;
    --anomaly-chance=*) ANOMALY_CHANCE="${arg#*=}" ;;
    *) usage ;;
  esac
done

end=$(( $(date +%s) + DURATION ))
interval=$(awk -v r="$RATE" 'BEGIN{printf "%.3f", 1/r}')

echo "▶️ Başlıyor: duration=${DURATION}s, rate=${RATE}/s, anomaly_chance=${ANOMALY_CHANCE}%"

while [ "$(date +%s)" -lt "$end" ]; do
  # Rastgele konum
  LAT=$(awk 'BEGIN{srand(); print -90 + rand()*180}')
  LNG=$(awk 'BEGIN{srand(); print -180 + rand()*360}')
  # Parametre seç
  PARAMS=("PM2.5" "PM10" "NO2" "SO2" "O3")
  PARAM=${PARAMS[RANDOM % ${#PARAMS[@]}]}
  THR=${TH[$PARAM]}
  # Anomali mi?
  if (( RANDOM % 100 < ANOMALY_CHANCE )); then
    # Anomali değeri: eşik üstü
    VALUE=$(awk -v t="$THR" 'BEGIN{srand(); print t*(1 + rand())}')
  else
    # Normal değer: 0 - eşik arası
    VALUE=$(awk -v t="$THR" 'BEGIN{srand(); print rand()*t}')
  fi
  TS=$(date +%s)

  # İstek
  PAYLOAD=$(cat <<EOF
{"latitude":$LAT,"longitude":$LNG,"parameter":"$PARAM","value":$VALUE,"timestamp":$TS}
EOF
)
  curl -s -X POST http://localhost:8082/api/data \
       -H 'Content-Type: application/json' \
       -d "$PAYLOAD" >/dev/null

  sleep "$interval"
done

echo "✅ auto-test tamamlandı."
