#!/bin/bash
# FragBase API Test Suite
API="https://fragbase-api.warlet-invest.workers.dev"
PASS=0
FAIL=0
TOKEN=""

test_endpoint() {
  local method=$1
  local endpoint=$2
  local expected=$3
  local data=$4
  local use_auth=$5

  if [ "$method" = "GET" ]; then
    if [ "$use_auth" = "auth" ] && [ -n "$TOKEN" ]; then
      STATUS=$(curl -s -o /tmp/fb_resp.json -w "%{http_code}" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $TOKEN" \
        "$API$endpoint")
    else
      STATUS=$(curl -s -o /tmp/fb_resp.json -w "%{http_code}" \
        -H "Content-Type: application/json" \
        "$API$endpoint")
    fi
  else
    if [ "$use_auth" = "auth" ] && [ -n "$TOKEN" ]; then
      STATUS=$(curl -s -o /tmp/fb_resp.json -w "%{http_code}" \
        -X "$method" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $TOKEN" \
        -d "$data" \
        "$API$endpoint")
    else
      STATUS=$(curl -s -o /tmp/fb_resp.json -w "%{http_code}" \
        -X "$method" \
        -H "Content-Type: application/json" \
        -d "$data" \
        "$API$endpoint")
    fi
  fi

  if [ "$STATUS" = "$expected" ]; then
    echo "  PASS: $method $endpoint ($STATUS)"
    PASS=$((PASS+1))
  else
    echo "  FAIL: $method $endpoint (expected $expected, got $STATUS)"
    BODY=$(cat /tmp/fb_resp.json 2>/dev/null | head -c 200)
    echo "        Response: $BODY"
    FAIL=$((FAIL+1))
  fi
}

echo "=== FragBase API Tests ==="
echo ""

# --- Public endpoints ---
echo "--- Public Endpoints ---"
test_endpoint GET "/api/perfumes" "200"
test_endpoint GET "/api/perfumes?q=sauvage&limit=5" "200"
test_endpoint GET "/api/perfumes/trending" "200"
test_endpoint GET "/api/perfumers" "200"
test_endpoint GET "/api/search?type=perfumes&q=dior" "200"

# --- Auth ---
echo ""
echo "--- Auth ---"
RAND=$RANDOM
test_endpoint POST "/api/auth/login" "401" '{"email":"wrong@test.com","password":"wrong"}'
test_endpoint POST "/api/auth/register" "201" "{\"email\":\"testbot_${RAND}@test.com\",\"password\":\"test1234\",\"name\":\"Test Bot $RAND\"}"

# Extract token
TOKEN=$(cat /tmp/fb_resp.json 2>/dev/null | grep -o '"token":"[^"]*"' | head -1 | cut -d'"' -f4)
if [ -n "$TOKEN" ]; then
  echo "  (Token obtained: ${TOKEN:0:20}...)"
else
  echo "  WARNING: No token obtained, auth tests will skip"
fi

# --- Authenticated endpoints ---
echo ""
echo "--- Authenticated Endpoints ---"
test_endpoint GET "/api/auth/me" "401"
test_endpoint GET "/api/auth/me" "200" "" "auth"
test_endpoint GET "/api/posts?page=1&limit=5" "200" "" "auth"
test_endpoint GET "/api/wishlists/me" "200" "" "auth"
test_endpoint GET "/api/notifications" "200" "" "auth"
test_endpoint GET "/api/messages/conversations" "200" "" "auth"
test_endpoint GET "/api/gamification/badges" "200" "" "auth"
test_endpoint GET "/api/gamification/leaderboard" "200" "" "auth"
test_endpoint GET "/api/discovery/explore" "200" "" "auth"
test_endpoint GET "/api/sotd/me" "200" "" "auth"

# --- Perfume detail ---
echo ""
echo "--- Perfume Detail ---"
curl -s "$API/api/perfumes?limit=1" -o /tmp/fb_perfumes.json
PERFUME_ID=$(cat /tmp/fb_perfumes.json 2>/dev/null | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -n "$PERFUME_ID" ]; then
  echo "  (Testing with perfume: $PERFUME_ID)"
  test_endpoint GET "/api/perfumes/$PERFUME_ID" "200"
  test_endpoint GET "/api/perfumes/$PERFUME_ID/reviews" "200"
  test_endpoint GET "/api/perfumes/$PERFUME_ID/notes/votes" "200"
  test_endpoint GET "/api/perfumes/$PERFUME_ID/accords/votes" "200"
  test_endpoint GET "/api/perfumes/$PERFUME_ID/performance/votes" "200"
  test_endpoint GET "/api/perfumes/$PERFUME_ID/season/votes" "200"
  test_endpoint GET "/api/perfumes/$PERFUME_ID/similar" "200"
  test_endpoint GET "/api/perfumes/$PERFUME_ID/statements" "200"
  test_endpoint GET "/api/perfumes/$PERFUME_ID/noses" "200"
  test_endpoint GET "/api/perfumes/$PERFUME_ID/recommendations" "200"
  test_endpoint GET "/api/perfumes/$PERFUME_ID/wishlist-status" "200" "" "auth"
else
  echo "  SKIP: No perfume ID available"
fi

# --- Summary ---
echo ""
echo "=============================="
echo "Results: $PASS passed, $FAIL failed out of $((PASS+FAIL)) tests"
echo "=============================="

rm -f /tmp/fb_resp.json /tmp/fb_perfumes.json
exit $FAIL
