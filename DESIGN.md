# Public Clipboard - Design Document

## Project Overview

**Public Clipboard** is a web application that enables users to share text across devices without installing an app. Users access specific numbered boards (canvases) where they can create, position, and manage text objects in a spatial layout. The primary use case is quickly copying text from one device (e.g., desktop) to another (e.g., smartphone).

## Core Objective

Enable quick, temporary text sharing across devices through a simple, browser-based interface with real-time collaboration capabilities.

## Key Features

### 1. Spatial Canvas Interface
- Fixed-size canvas (1920x1080) per board
- Users can create text objects and position them anywhere on the canvas
- Visual organization similar to sticky notes on a whiteboard
- Mobile: Canvas scales proportionally to fit viewport with pinch-to-zoom and pan capabilities

### 2. Multiple Boards
- 200 public boards accessible via URL (0-199)
- URL structure: 
  - `/` - Landing page
  - `/[number]` or `/boards/[number]` - Board access (e.g., `/92` or `/boards/92`)
- No authentication required

### 3. Real-Time Collaboration
- WebSocket-based synchronous updates
- Multiple users can edit the same board simultaneously
- Changes appear instantly for all connected users

### 4. History & Moderation
- Change history showing "Anonymous #1", "Anonymous #2", etc.
- Ban button (!) next to each user in history
- IP-based user tracking for moderation
- Git-like commit history for transparency

## Architecture

### Infrastructure Stack

```
User → CloudFlare Pages → CloudFlare DNS → Traefik → Docker Compose
                                                        ├── Node.js (WebSocket Server)
                                                        └── Redis (with volume)
```

### Components

1. **Frontend (CloudFlare Pages)**
   - Static site hosting
   - Next.js
   - WebSocket client

2. **Backend (Node.js)**
   - WebSocket server with rooms/channels (one room per board)
   - REST API fallback for connection drops
   - In-memory active board management
   - Redis persistence

3. **Traefik**
   - Reverse proxy
   - SSL/TLS termination
   - Load balancing

4. **Redis**
   - Single persistence layer (DB + cache)
   - Volume-mounted for durability
   - Stores board states, history, banned IPs

### Project Structure

```
publicclipboard/
├── webapp/                # Frontend application (Next.js)
├── server/                # Backend Node.js WebSocket server
├── traefik/
│   ├── traefik.yml
│   └── acme.json
├── config/
├── docker-compose.yml
├── Dockerfile
├── backups/               # Redis backups
├── DESIGN.md
└── apps-hq/               # Submodule
```

## Data Structures

### Board

```javascript
{
  id: number,                    // Board number (0-199)
  objects: [Object],             // Array of text objects
  lastActivity: timestamp,       // Last interaction time
  history: [HistoryEntry]        // Change history
}
```

### Object

```javascript
{
  id: string,                    // Unique object identifier
  type: "text",                  // Object type (text only for now)
  coordinates: {
    x: number,                   // Top-left x position
    y: number                    // Top-left y position
  },
  size: {
    width: number,               // Object width in pixels
    height: number               // Object height in pixels
  },
  content: string,               // Text content
  createdBy: string,             // "Anonymous #N"
  createdAt: timestamp,          // Creation timestamp
  modifiedBy: string,            // "Anonymous #N"
  modifiedAt: timestamp          // Last modification timestamp
}
```

### HistoryEntry

```javascript
{
  action: string,                // "create", "edit", "delete", "move"
  objectId: string,              // Object affected
  user: string,                  // "Anonymous #N"
  userIp: string,                // IP address (hashed)
  timestamp: timestamp,
  details: object                // Action-specific details
}
```

## UI/UX Design

### Desktop Experience
- Full canvas view (1920x1080)
- Double-click empty space to create text object
- Floating Action Button (FAB) in bottom-left corner creates object in center of current view (if space available)
- Drag objects from perimeter only (10% width margin from edge) to move
- Click to edit text content
- Text objects are scrollable (content can exceed visible height)
- Context menu for delete/copy

### Mobile Experience
- Canvas scaled to fit viewport width
- Pinch-to-zoom for reading
- Pan to navigate
- Double-tap to create object
- FAB in bottom-left corner creates object in center of current view (if space available)
- Drag objects from perimeter only (10% width margin from edge) to move
- Text objects are scrollable
- Tap to edit

### Object Creation Rules
- Objects can only be created in empty spaces
- AABB (Axis-Aligned Bounding Box) collision detection
- Objects cannot overlap
- Optional: 10px minimum gap between objects (padding)

**Collision Detection Algorithm:**
```javascript
function objectsOverlap(obj1, obj2) {
  return !(obj1.x + obj1.width < obj2.x ||
           obj1.x > obj2.x + obj2.width ||
           obj1.y + obj1.height < obj2.y ||
           obj1.y > obj2.y + obj2.height);
}
```

### Visual Feedback
- Canvas boundaries shown with subtle grid or border
- Object selection highlights
- Drag handles for resize (future)
- Hover states for interactive elements

## Technical Specifications

### WebSocket Events

**Client → Server:**
- `join_board` - Join specific board room
- `create_object` - Create new text object
- `update_object` - Edit object content/position
- `delete_object` - Remove object
- `copy_content` - Track copy action

**Server → Client:**
- `board_state` - Initial board state on join
- `object_created` - New object added
- `object_updated` - Object modified
- `object_deleted` - Object removed
- `user_joined` - New user connected
- `user_left` - User disconnected

### Events to Track

For analytics and debugging purposes, the following events should be tracked:

- **Creation of object** - When a new text object is created on any board
- **Copy of object contents** - When a user copies text from an object
- **Translation to a specific board (landing page)** - When user navigates from landing page to a board
- **Translation to a specific board (app page)** - When user navigates from one board to another

### REST API Fallback

**Endpoints:**
- `GET /api/boards/:id` - Get board state
- `POST /api/boards/:id/actions` - Submit action when WS unavailable
- `GET /api/boards/:id/history` - Get change history

### Moderation

**Ban System:**
- IP-based tracking
- Ban scope: Per-board or global (TBD)
- Ban duration: 24 hours, 7 days, or permanent (TBD)
- Redis storage: `banned_ips` set with TTL
- Banned users receive error message on connection attempt

## Performance & Scalability

### Capacity Planning

**Per Board:**
- ~100 text objects comfortably fit 1920x1080 canvas
- Average object: 200x100px with ~500 characters
- 100 objects × 500 chars = ~50KB per board

**Total System:**
- 200 boards × 50KB = ~10MB for all boards
- WebSocket overhead: ~10KB per connection
- 100 concurrent connections: ~1MB
- Redis memory: ~50MB estimated
- Node.js runtime: 50-100MB

**Scalability Notes:**
- Current design handles 100-1000 concurrent users
- For higher scale: Multiple WS server instances with Redis pub/sub
- Board-level sharding possible

### TTL Strategy
- Active boards kept in memory indefinitely (until server restart)
- Inactive boards persist in Redis
- Future: Implement idle timeout (15-30 minutes) if memory becomes constraint

## Testing Strategy

### E2E Tests

#### Test 1: Basic Object Creation and Persistence
1. User enters `/` (landing page), goes to text field and inputs number 92
2. Should navigate to `/boards/92`
3. User creates new text object
4. Object appears on canvas
5. User edits object, sets text to "e2e test 549f"
6. Page reload preserves content
7. Only one object with content "e2e test 549f" exists

### Unit Tests
- `/` page renders correctly
- `/boards/[number]` returns 404 for negative numbers and 0
- Renders page for valid board numbers (1-200)
- Object creation succeeds in empty space
- Object creation fails when overlapping
- Object contents can be copied
- Object can be edited and deleted
- Collision detection works correctly

### Integration Tests
- WebSocket connection establishment
- Real-time sync across multiple clients
- REST fallback when WS unavailable
- Ban system functionality
- History tracking accuracy

## Security Considerations

1. **Content Validation:**
   - Sanitize all text input (XSS prevention)
   - Max object content length (e.g., 10,000 characters)
   - Rate limiting: Max 10 actions per minute per IP

2. **Abuse Mitigation:**
   - IP-based rate limiting
   - Ban system with history tracking
   - Monitor for spam patterns

3. **Privacy:**
   - Clear messaging that boards are PUBLIC
   - Warning on landing page
   - IP addresses hashed before storage

4. **DDoS Protection:**
   - CloudFlare DDoS protection
   - Connection limits per IP
   - Board access rate limiting

## Future Enhancements (Out of Scope for V1)

- Object resizing via drag handles
- Multiple object types (images, links, code blocks)
- Private boards with share codes
- Object export (download all as JSON/text)
- Undo/redo functionality
- Object styling (colors, fonts)
- Search within board
- User accounts (optional)
- Board templates
- Expiring boards (auto-delete after N days)

## Open Questions / TBD

1. Ban scope: Per-board or global?
2. Ban duration: Fixed 24h or configurable?
3. Default object size when created?
4. Maximum objects per board limit?
5. Idle board cleanup strategy?
6. Warning message UX when FAB cannot create object in center (no space available)?

## Success Metrics

- Average session duration
- Objects created per session
- Cross-device usage patterns
- Board utilization distribution
- Error rates and types
- User retention (return visits)
