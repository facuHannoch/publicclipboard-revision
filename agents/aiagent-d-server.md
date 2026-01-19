## Plan
- Survey repo and confirm server requirements from DESIGN.md (APIs, WS events, data models, infra assumptions).
- Draft server architecture: project structure, dependencies, runtime, config/env, Redis schema, WS rooms, REST fallback.
- Define core workflows: join board, create/update/delete object, history, moderation/ban, analytics events, rate limiting.
- Identify persistence strategy (Redis keys/TTL) and in-memory caching rules.
- Plan tests (unit/integration) and dev scripts; note open questions/TBDs.

## LOG
- Created initial server build plan based on DESIGN.md requirements.
