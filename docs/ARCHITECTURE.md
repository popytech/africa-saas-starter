# Architecture

Africa SaaS Starter uses a deliberately small architecture.

## Web layer

Next.js App Router owns pages, server components, server actions and route handlers. Server components are preferred for authenticated data reads where appropriate.

## Identity

Supabase Auth stores the user identity. Cookie-based SSR keeps the authenticated session available to server rendering. `proxy.ts` refreshes auth cookies; authorization remains in server/data-layer checks.

## Tenancy

`organizations` represent customer workspaces. `memberships` join users to organizations and carry the role `owner`, `admin` or `member`.

## Data security

Postgres Row Level Security is the authoritative tenant boundary. Helper functions are `SECURITY DEFINER` and explicitly set `search_path` to reduce policy ambiguity.

## Billing boundary

Plan definitions and entitlements live in application code. A payment provider is intentionally not hardwired into the starter.

## Email boundary

Email is exposed through one `sendEmail` function. Local development defaults to console output; production can use a provider adapter.
