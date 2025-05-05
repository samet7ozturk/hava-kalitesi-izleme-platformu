# scripts/manual-input.sh

set -euo pipefail

if [ "$#" -ne 4 ]; then
  echo "Kullanım: $0 <latitude> <longitude> <parameter> <value>"
  echo "Örnek: $0 40.9 29.3 PM2.5 12.3"
  exit 1
fi

LAT="$1"
LNG="$2"
PARAM="$3"
VALUE="$4"
TS=$(date +%s)

PAYLOAD=$(cat <<EOF
{
  "latitude": $LAT,
  "longitude": $LNG,
  "parameter": "$PARAM",
  "value": $VALUE,
  "timestamp": $TS
}
EOF
)

curl -s -X POST http://localhost:8082/api/data \
     -H 'Content-Type: application/json' \
     -d "$PAYLOAD" \
  && echo "✅ Gönderildi: $PAYLOAD"
