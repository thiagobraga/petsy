# Petsy API Reference

This document describes the HTTP API consumed by the Petsy client
(`src/api/`). The client is a thin wrapper around `fetch`
(`src/api/client.ts`) plus one module per resource.

> **Status:** The backend is not implemented yet (mock data still lives in
> `src/data.ts`). This document is the contract the client codes against and
> the backend must fulfil. The matching machine-readable spec lives in
> [`openapi.yaml`](./openapi.yaml).

## Base URL

```
${REACT_APP_API_URL:-http://localhost:3001/api}
```

The base URL is read from `process.env.REACT_APP_API_URL`; it falls back to
`http://localhost:3001/api`. All paths below are relative to this base.

## Conventions

- **Content type:** Requests and responses use `application/json`.
- **Timeout:** Requests abort after `30s` by default (`AbortController`).
- **Client envelope:** `client.ts` normalizes every call into an
  `ApiResponse<T>`:

  ```ts
  interface ApiResponse<T> {
    status: number; // HTTP status, or 0 on network/timeout error
    data?: T; // parsed JSON body
    error?: string; // response message or thrown error message
    ok: boolean; // response.ok (false on network/timeout error)
  }
  ```

  The server itself returns the resource payload directly (e.g. a `Pet` or
  `Pet[]`); the envelope is added client-side. On a non-2xx response the server
  SHOULD return `{ "message": "<reason>" }`, which the client surfaces as
  `error`.

## Authentication

See the dedicated section in [Authentication](#authentication-1) below.

All authenticated requests carry a bearer token:

```
Authorization: Bearer <token>
```

### How the client obtains the token

`ApiClient.getAuthToken()` reads `localStorage['auth_state']`, parses it as
JSON, and uses its `token` field:

```jsonc
// localStorage key: "auth_state"
{ "token": "<jwt-or-opaque-token>", "...": "other persisted auth state" }
```

If no token is present, the `Authorization` header is omitted. The header is
attached automatically by `ApiClient.buildHeaders()` for every request method
(GET/POST/PUT/DELETE/PATCH).

### Expected auth flow (backend contract)

1. Client `POST`s credentials to the auth endpoint (to be defined; current
   client uses mock auth in `src/stores/auth.ts`).
2. Server responds with a token; client persists it under `auth_state.token`.
3. Subsequent requests send `Authorization: Bearer <token>`.
4. Server returns `401 Unauthorized` for missing/expired tokens; the client
   maps this to `{ ok: false, status: 401, error }`.

## Resources

### Pets — `src/api/pets.ts`

| Method | Path                  | Body                      | Returns        | Client call           |
| ------ | --------------------- | ------------------------- | -------------- | --------------------- |
| GET    | `/pets`               | —                         | `Pet[]`        | `petsApi.getAll()`    |
| GET    | `/pets/{petId}`       | —                         | `Pet`          | `petsApi.getById`     |
| POST   | `/pets`               | `PetCreateInput`          | `Pet`          | `petsApi.create`      |
| PUT    | `/pets/{petId}`       | `Partial<PetCreateInput>` | `Pet`          | `petsApi.update`      |
| DELETE | `/pets/{petId}`       | —                         | `204`          | `petsApi.delete`      |
| POST   | `/pets/{petId}/photo` | `{ photoData }`           | `{ photoUrl }` | `petsApi.uploadPhoto` |

### Medicines — `src/api/medicines.ts`

| Method | Path                              | Body                           | Returns         | Client call                     |
| ------ | --------------------------------- | ------------------------------ | --------------- | ------------------------------- |
| GET    | `/pets/{petId}/medicines`         | —                              | `Medicine[]`    | `medicinesApi.getByPetId`       |
| GET    | `/medicines/{medicineId}`         | —                              | `Medicine`      | `medicinesApi.getById`          |
| POST   | `/pets/{petId}/medicines`         | `MedicineCreateInput`          | `Medicine`      | `medicinesApi.create`           |
| PUT    | `/medicines/{medicineId}`         | `Partial<MedicineCreateInput>` | `Medicine`      | `medicinesApi.update`           |
| DELETE | `/medicines/{medicineId}`         | —                              | `204`           | `medicinesApi.delete`           |
| POST   | `/medicines/{medicineId}/applied` | `{ appliedAt }`                | `{ appliedAt }` | `medicinesApi.markApplied`      |
| GET    | `/pets/{petId}/medicines/today`   | —                              | `Medicine[]`    | `medicinesApi.getTodaysByPetId` |

### Appointments — `src/api/appointments.ts`

| Method | Path                                  | Body                              | Returns         | Client call                   |
| ------ | ------------------------------------- | --------------------------------- | --------------- | ----------------------------- |
| GET    | `/pets/{petId}/appointments`          | —                                 | `Appointment[]` | `appointmentsApi.getByPetId`  |
| GET    | `/appointments/{appointmentId}`       | —                                 | `Appointment`   | `appointmentsApi.getById`     |
| POST   | `/pets/{petId}/appointments`          | `AppointmentCreateInput`          | `Appointment`   | `appointmentsApi.create`      |
| PUT    | `/appointments/{appointmentId}`       | `Partial<AppointmentCreateInput>` | `Appointment`   | `appointmentsApi.update`      |
| DELETE | `/appointments/{appointmentId}`       | —                                 | `204`           | `appointmentsApi.delete`      |
| GET    | `/pets/{petId}/appointments/upcoming` | —                                 | `Appointment[]` | `appointmentsApi.getUpcoming` |
| GET    | `/pets/{petId}/appointments/past`     | —                                 | `Appointment[]` | `appointmentsApi.getPast`     |

### Diary — `src/api/diary.ts`

| Method | Path                                      | Body                             | Returns        | Client call               |
| ------ | ----------------------------------------- | -------------------------------- | -------------- | ------------------------- |
| GET    | `/pets/{petId}/diary`                     | —                                | `DiaryEntry[]` | `diaryApi.getByPetId`     |
| GET    | `/diary/{entryId}`                        | —                                | `DiaryEntry`   | `diaryApi.getById`        |
| POST   | `/pets/{petId}/diary`                     | `DiaryEntryCreateInput`          | `DiaryEntry`   | `diaryApi.create`         |
| PUT    | `/diary/{entryId}`                        | `Partial<DiaryEntryCreateInput>` | `DiaryEntry`   | `diaryApi.update`         |
| DELETE | `/diary/{entryId}`                        | —                                | `204`          | `diaryApi.delete`         |
| GET    | `/pets/{petId}/diary?startDate=&endDate=` | —                                | `DiaryEntry[]` | `diaryApi.getByDateRange` |
| POST   | `/diary/{entryId}/photos`                 | `{ photoData }`                  | `{ photoUrl }` | `diaryApi.addPhoto`       |

### Media — `src/api/media.ts`

| Method | Path                                 | Body               | Returns       | Client call           |
| ------ | ------------------------------------ | ------------------ | ------------- | --------------------- |
| GET    | `/pets/{petId}/media`                | —                  | `MediaItem[]` | `mediaApi.getByPetId` |
| GET    | `/media/{mediaId}`                   | —                  | `MediaItem`   | `mediaApi.getById`    |
| POST   | `/pets/{petId}/media`                | `MediaCreateInput` | `MediaItem`   | `mediaApi.upload`     |
| DELETE | `/media/{mediaId}`                   | —                  | `204`         | `mediaApi.delete`     |
| GET    | `/pets/{petId}/media/albums/{album}` | —                  | `MediaItem[]` | `mediaApi.getByAlbum` |
| GET    | `/pets/{petId}/media/albums`         | —                  | `string[]`    | `mediaApi.getAlbums`  |
| POST   | `/media/{mediaId}/tags`              | `{ tags }`         | `MediaItem`   | `mediaApi.addTags`    |
| DELETE | `/media/{mediaId}/tags?tags=a,b`     | —                  | `MediaItem`   | `mediaApi.removeTags` |

## Schemas

Types mirror the interfaces declared in `src/api/*.ts`.

### Pet

```ts
interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'fish' | 'other';
  breed?: string;
  age?: number;
  weight?: number;
  tone?: string; // avatar color key (see tokens.ts)
  image?: string; // photo URL
}

interface PetCreateInput {
  name: string;
  species: Pet['species'];
  breed?: string;
  age?: number;
  weight?: number;
  tone?: string;
}
```

### Medicine

```ts
interface Medicine {
  id: string;
  petId: string;
  name: string;
  dosage: string;
  frequency: string;
  when: string[]; // times of day, e.g. ["08:00", "20:00"]
  days: number[]; // weekday indexes, 0=Sun .. 6=Sat
  status?: 'active' | 'inactive';
  notes?: string;
}

interface MedicineCreateInput {
  petId: string;
  name: string;
  dosage: string;
  frequency: string;
  when: string[];
  days: number[];
  notes?: string;
}
```

### Appointment

```ts
interface Appointment {
  id: string;
  petId: string;
  title: string;
  type: string;
  date: string; // ISO date
  time?: string;
  location?: string;
  veterinarian?: string;
  notes?: string;
  status: 'next' | 'past' | 'cancelled';
}

interface AppointmentCreateInput {
  petId: string;
  title: string;
  type: string;
  date: string;
  time?: string;
  location?: string;
  veterinarian?: string;
  notes?: string;
}
```

### DiaryEntry

```ts
interface DiaryEntry {
  id: string;
  petId: string;
  date: string; // ISO date
  mood: 'happy' | 'neutral' | 'sad' | 'excited' | 'sick';
  text: string;
  photos?: string[]; // photo URLs
  tags?: string[];
  createdAt: string; // ISO timestamp
}

interface DiaryEntryCreateInput {
  petId: string;
  date: string;
  mood: DiaryEntry['mood'];
  text: string;
  photos?: string[];
  tags?: string[];
}
```

### MediaItem

```ts
interface MediaItem {
  id: string;
  petId: string;
  url: string;
  thumbnailUrl?: string;
  album?: string;
  uploadedAt: string; // ISO timestamp
  tags?: string[];
}

interface MediaCreateInput {
  petId: string;
  photoData: string; // base64-encoded image
  album?: string;
  tags?: string[];
}
```

## Error handling

| Status | Meaning                         | Client behavior                     |
| ------ | ------------------------------- | ----------------------------------- |
| 2xx    | Success                         | `{ ok: true, data }`                |
| 400    | Validation error                | `{ ok: false, error: message }`     |
| 401    | Missing/expired token           | `{ ok: false, status: 401, error }` |
| 404    | Resource not found              | `{ ok: false, status: 404, error }` |
| 5xx    | Server error                    | `{ ok: false, error: message }`     |
| 0      | Network failure / timeout abort | `{ ok: false, status: 0, error }`   |

On non-2xx responses the server SHOULD include `{ "message": "<reason>" }`,
which becomes `ApiResponse.error`.

---

## Authentication

> Detailed reference for task **#90**.

Petsy uses **bearer-token** authentication over HTTPS.

### Request header

Every authenticated request includes:

```
Authorization: Bearer <token>
Content-Type: application/json
```

The header is injected centrally in `ApiClient.buildHeaders()`
(`src/api/client.ts`), so individual endpoint modules never deal with auth.

### Token storage

The token is persisted in `localStorage` under the `auth_state` key
(serialized by the Zustand auth store / persistence layer). Only the `token`
field is read by the API client:

```ts
const authData = localStorage.getItem('auth_state');
const token = authData ? JSON.parse(authData).token : null;
```

### Token format

The format is opaque to the client — any string the server issues works
(JWT recommended). The client does not decode or validate it; it forwards it
verbatim.

### Lifecycle & refresh

- **Login:** server issues a token in exchange for credentials; client stores
  it under `auth_state.token`.
- **Use:** token sent on every request via the `Authorization` header.
- **Expiry:** server returns `401`; the client surfaces `ok: false`. UI should
  redirect to `/login` and clear `auth_state`.
- **Refresh:** not yet implemented. A future `POST /auth/refresh` returning a
  new token is the intended mechanism; until then, expiry forces re-login.
- **Logout:** clear `auth_state` from `localStorage` (handled by the auth
  store's `logout()`); the next request goes out unauthenticated.
