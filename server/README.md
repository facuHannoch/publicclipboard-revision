# Public Clipboard Server

Node.js WebSocket + REST server powering real-time collaboration.

## Requirements
- Node.js 18+
- Redis

## Quick Start
```bash
npm install
npm run dev
```

## Environment
- `PORT` (default: 8080)
- `REDIS_URL` (default: `redis://localhost:6379`)
- `IP_HASH_SALT` (default: `publicclipboard`)

## WebSocket Messages

Client → Server
```json
{ "type": "join_board", "payload": { "boardId": 92 } }
{ "type": "create_object", "payload": { "coordinates": { "x": 100, "y": 100 }, "size": { "width": 200, "height": 100 }, "content": "Hello" } }
{ "type": "update_object", "payload": { "id": "object-id", "content": "Updated" } }
{ "type": "delete_object", "payload": { "id": "object-id" } }
{ "type": "copy_content", "payload": { "id": "object-id" } }
{ "type": "ban_user", "payload": { "userId": "user-92-2", "durationMs": 86400000 } }
```

Server → Client
```json
{ "type": "board_state", "payload": { "board": {}, "user": { "userId": "user-92-1", "userLabel": "Anonymous #1" } } }
{ "type": "object_created", "payload": { "object": {} } }
{ "type": "object_updated", "payload": { "object": {} } }
{ "type": "object_deleted", "payload": { "id": "object-id" } }
{ "type": "user_joined", "payload": { "userId": "user-92-2", "userLabel": "Anonymous #2" } }
{ "type": "user_left", "payload": { "userId": "user-92-2", "userLabel": "Anonymous #2" } }
{ "type": "error", "payload": { "message": "..." } }
```

## REST Fallback
- `GET /api/boards/:id`
- `GET /api/boards/:id/history`
- `POST /api/boards/:id/actions`

Example:
```json
{ "type": "create_object", "payload": { "coordinates": { "x": 0, "y": 0 }, "size": { "width": 200, "height": 120 }, "content": "Hello" } }
```

## Notes
- Board IDs are validated as 0-199 per `DESIGN.md`.
- Rate limit: 10 actions per minute per IP.
- History entries include hashed IPs (SHA-256 + salt).
