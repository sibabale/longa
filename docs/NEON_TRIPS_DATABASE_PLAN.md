# Longa Neon Database Plan

## Overview

Create a Neon Postgres database to support:

1. **Driver-posted trips** – Drivers post available trips (`booked = false` initially).
2. **Rider requests** – When no matching trip exists, persist the rider's trip so they can be matched when a driver later posts.
3. **Bookings** – Link driver trips to rider trips when a match is found.

---

## Neon Setup Options

### Option A: Neon CLI
```bash
npm install -g neonctl
neonctl auth
neonctl projects create longa
```
Then create databases/branches as needed.

### Option B: Neon MCP (if installed)
Configure `@neondatabase/mcp-server-neon` in Cursor MCP settings, then use natural language:
- "Create a new project called longa"
- "Create tables for users, trips, bookings"

### Option C: Neon Console (Manual)
1. Go to [console.neon.tech](https://console.neon.tech)
2. Create project "longa"
3. Run migration SQL via SQL Editor or connect from longa-server

---

## Data Model

### Entities

| Entity     | Purpose |
|-----------|---------|
| `users`   | Drivers and riders; our GUID + identifierForVendor for device identity |
| `trips`   | Both driver offers and rider requests (unified with `role`) |
| `bookings`| Links a driver trip to a rider trip when matched (1:1) |
| `push_tokens` | One token per user for "Notify me" |
| `idempotency_keys` | Prevents duplicate POST /trips on retry |

### Schema

```sql
-- Users: our own GUID + identifierForVendor (iOS) / Android equivalent
-- Created on app launch. Device fingerprint for identity.
CREATE TABLE users (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier_for_vendor TEXT NOT NULL,  -- iOS: identifierForVendor; Android: similar stable ID
  device_model        TEXT,            -- e.g. "iPhone 16 Plus" (optional, for debugging)
  device_make         TEXT,            -- e.g. "Apple" (optional)
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_users_identifier_for_vendor ON users(identifier_for_vendor);

-- Trips: both driver posts and rider requests
-- role = 'driver' | 'rider'
-- status = 'open' | 'booked' (no cancellation in MVP)
CREATE TABLE trips (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES users(id),
  role             TEXT NOT NULL CHECK (role IN ('driver', 'rider')),
  status           TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'booked')),

  -- Locations (from Mapbox flow)
  pickup_address   TEXT NOT NULL,
  pickup_lat       DECIMAL(10, 7) NOT NULL,
  pickup_lng       DECIMAL(10, 7) NOT NULL,
  destination_address TEXT NOT NULL,
  destination_lat  DECIMAL(10, 7) NOT NULL,
  destination_lng  DECIMAL(10, 7) NOT NULL,

  -- Time
  departure_at     TIMESTAMPTZ NOT NULL,

  -- Driver-only: price (MVP: 1 driver, 1 rider; no seats)
  price_cents      INT,           -- null for rider requests

  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT driver_price_check CHECK (
    (role = 'driver' AND price_cents IS NOT NULL) OR
    (role = 'rider')
  )
);

CREATE INDEX idx_trips_role_status ON trips(role, status);
CREATE INDEX idx_trips_departure_at ON trips(departure_at);
CREATE INDEX idx_trips_pickup_destination ON trips(pickup_lat, pickup_lng, destination_lat, destination_lng);

-- Bookings: links driver trip to rider trip
CREATE TABLE bookings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_trip_id  UUID NOT NULL REFERENCES trips(id),
  rider_trip_id   UUID NOT NULL REFERENCES trips(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(driver_trip_id),
  UNIQUE(rider_trip_id)
);

CREATE INDEX idx_bookings_driver_trip ON bookings(driver_trip_id);
CREATE INDEX idx_bookings_rider_trip ON bookings(rider_trip_id);

-- Push tokens for "Notify me" (rider requests)
CREATE TABLE push_tokens (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id),
  token         TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_push_tokens_user ON push_tokens(user_id);

-- Idempotency for POST /trips (24h TTL; optionally store response for replay)
CREATE TABLE idempotency_keys (
  key             UUID PRIMARY KEY,
  user_id         UUID NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_idempotency_created ON idempotency_keys(created_at);
```

---

## Flows

### 1. Driver posts a trip
1. Driver completes: pickup, destination, datetime, (optionally) price.
2. API: `POST /trips` with `role: 'driver'`, `status: 'open'`.
3. **Match check**: Query `trips` where `role = 'rider'`, `status = 'open'`, similar route and time.
4. If match found → create `booking`, set both trips to `status = 'booked'`, notify rider.

### 2. Rider searches, finds a match
1. Rider completes: pickup, destination, datetime.
2. API: `GET /trips?role=driver&status=open&...` (filter by route + time).
3. Return matching driver trips.
4. Rider selects one → `POST /bookings` (or `POST /trips` with rider trip + booking in one transaction).

### 3. Rider searches, no match
1. Rider completes: pickup, destination, datetime. Lands on select-ride.
2. API: `GET /trips?role=driver&...` returns empty.
3. UI shows "No matching rides" + "Notify me" button.
4. Rider taps "Notify me" → see Notify Me flow below (persist rider trip + register token only if permission granted).
5. When a driver later posts a matching trip → matching runs in that request, creates booking, sends push to rider.

### 4. Matching logic
- **Route**: Pickup and destination within X km of each other (default 10 km).
- **Time**: Departure within Y minutes of each other.
- **Config** (appsettings):
  ```json
  "Matching": {
    "PickupRadiusKm": 10,
    "DestinationRadiusKm": 10,
    "DepartureWindowMinutes": 120
  }
  ```
- **When**: Matching runs only when unbooked trips occur—no background jobs or cron.
  - On driver post → persist trip → run match (find open rider requests) in same request.
  - On rider "no match" submit → persist trip → run match (find open driver trips) in same request.
- **Concurrency**: Use DB row locks (`SELECT ... FOR UPDATE`) in a transaction; first-come-first-served; no race conditions or double-booking.

---

## Implementation Phases

### Phase 1: Neon + schema
- Create Neon project (CLI or Console).
- Run migration to create `users`, `trips`, `bookings`.
- Add connection string to longa-server (env / User Secrets).

### Phase 2: EF Core / Dapper
- Add `Npgsql` (or EF Core with PostgreSQL) to longa-server.
- Create entities and DbContext (or raw SQL with Dapper).
- Add repository/service layer for trips and bookings.

### Phase 3: Trips API
- `POST /trips` – Create driver or rider trip; accepts `Idempotency-Key` header; after persist, run match synchronously in same request.
- `GET /trips` – List driver trips (filter by route, time, status).
- No background jobs: matching only when `POST /trips` creates an unbooked trip.

### Phase 4: Rider flow integration
- Select-ride: fetch real driver trips from API instead of static JSON.
- No match: persist rider request via `POST /trips` (role=rider); matching runs immediately.
- "Notify me" → store push token / user for later notification when a match is created.

### Phase 5: Driver flow
- Driver flow: pickup → destination → datetime → price → post trip via `POST /trips`.
- On post, matching runs synchronously against pending rider requests.

### Phase 6: Notifications
- When match created, send push to rider (and optionally driver).
- Use expo-notifications or similar.

---

## User identity (device-based)

- **Our GUID**: Each user has `id` (UUID)—our primary identifier.
- **identifierForVendor**: iOS `identifierForVendor`; Android equivalent (e.g. `expo-application.androidId` or similar). Uniquely ties user to device.
- **User creation**: On app launch—call API to ensure user exists (create if not). User is created before any trip or "Notify me" action.
- **No phone, no auth**: Device fingerprint only; no phone number or traditional auth for V1.

---

## Idempotency

- **POST /trips** accepts `Idempotency-Key` header (client-generated UUID).
- If same key seen within TTL (e.g. 24h) for same user → return stored response; do not create duplicate trip.
- Prevents double submission on retry or double-tap.

---

## Notify Me flow

1. Rider has no match (GET /trips empty). Rider taps "Notify me".
2. **Request permission**: Call `Notifications.requestPermissionsAsync` (shows system dialog on first use).
3. **Loading state**: Show loading on button while permission is being resolved.
4. **If granted**: In background: (a) `POST /trips` with rider trip (pickup, dest, datetime from nav params), (b) get push token, (c) `PUT /users/me/push-token`. On success → remove loading, show confirmation.
5. **If denied**: Do not call API. Remove loading. Show descriptive error (e.g. "Notification permission is required to notify you when a matching ride is posted").
6. Rider trip is persisted only when permission is granted; no persistence on deny.

---

## Push token updates

- Expo push tokens can change (reinstall, app update, etc.).
- **On app launch**: Call `getExpoPushTokenAsync()`; if token differs from last known (e.g. in AsyncStorage), call `PUT /users/me/push-token` to upsert.
- **When registering**: Same flow—get token, upsert to server. One row per user in `push_tokens`; `UPDATE` on token change.

---

## Distance calculation

- **Haversine** for ~10 km radius—no PostGIS needed for MVP.

---

## MVP scope summary

- 1 driver, 1 rider per booking; no multi-seat.
- No cancellation flow.
- User created on app launch.
- identifierForVendor for device identity.
- Idempotency on POST /trips.
- Notify Me: permission first, then API; loading state; descriptive error on deny.

---

## Next steps

1. Create Neon project (pick CLI, MCP, or Console).
2. Run schema migration.
3. Add `longa-server` DB connection and migrations setup.
4. Implement Phase 2 (data access) and Phase 3 (Trips API).
