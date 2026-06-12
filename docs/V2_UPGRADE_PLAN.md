# TootClaw V2 Upgrade Plan

Created from the 2026-06-12 continuous improvement audit.

## Current verified state

- TootClaw is a kid-friendly soundboard app with React, TypeScript, Vite, Express, Socket.io, local custom media, and a Gemini-backed Sommelier endpoint.
- The shipped sound library contains 50 pre-generated MP3 sounds under `client/public/sounds/`.
- Parental controls include a math-gated entry, master volume, surprise toggle, Sommelier toggle, and mute-voice toggle.
- `/api/sommelier` sanitizes/truncates input and has an in-memory per-IP rate limiter.
- Sneak Attack remote sessions use Socket.io rooms and QR/link-based `/fire/:sessionId`.
- Custom image and recording data live in IndexedDB/localStorage on the device.
- No GitHub Actions workflow or V2 upgrade plan existed before this audit pass.

## Linear tracking

- Portfolio parent: not linked in this repair pass.
- TootClaw V2 follow-up: not created in this repair pass.

## V2 scope

1. Add PR CI for dependency install, TypeScript check, and production build.
2. Preserve kid-safe defaults: PG-only Sommelier output, parental setting persistence, surprise-sound controls, volume control, and mute controls.
3. Harden AI cost and abuse controls before any broader public launch: provider configuration checks, tighter rate-limit tests, and graceful no-key behavior.
4. Add remote-trigger safety for Sneak Attack: session expiry, clear pairing state, and host-side visibility for connected peers.
5. Add automated coverage for sound manifest integrity, custom recording limits, local storage migrations, parental gate behavior, and Socket.io remote fire flow.
6. Promote `replit.md` content into a normal README before distribution.

## Done means

- Default branch has a green CI gate.
- Missing media, TypeScript errors, or build failures block release.
- AI and remote-trigger features remain gated, rate-limited, and honest when backing services are unavailable.
- Local custom media remains local unless a reviewed sync/export design is added.
