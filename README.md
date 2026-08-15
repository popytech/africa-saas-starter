<div align="center">

<img src="./docs/cover.svg" alt="Africa SaaS Starter" width="100%" />

# Africa SaaS Starter

### A production-minded SaaS foundation built with Next.js, TypeScript and Supabase.

**Auth · Multi-tenancy · Roles · Dashboard · Billing model · Email · RLS · Docker · CI**

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-africa--saas--starter.vercel.app-2ea44f?style=for-the-badge&logo=vercel&logoColor=white)](https://africa-saas-starter.vercel.app/)
[![CI](https://github.com/popytech/africa-saas-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/popytech/africa-saas-starter/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-111111?style=for-the-badge)](./LICENSE)

**→ [Open the live demo](https://africa-saas-starter.vercel.app/)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpopytech%2Fafrica-saas-starter&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY&project-name=africa-saas-starter&repository-name=africa-saas-starter)

</div>

---

## Why this exists

Many SaaS projects begin by rebuilding the same foundation: authentication, protected routes, organizations, roles, database policies, settings, billing concepts, transactional email and deployment plumbing.

**Africa SaaS Starter** packages those building blocks into a clean reference implementation. It is designed for developers building products in Africa and elsewhere, with particular attention to pragmatic deployment, simple vendor boundaries and maintainable application architecture.

> This is an open-source starter, not a payment gateway, telecom integration or hosted SaaS product.

## Included

- Next.js 16 App Router + React 19
- TypeScript strict mode
- Tailwind CSS 4
- Supabase Auth using cookie-based SSR
- PostgreSQL schema + Row Level Security
- Organizations / workspaces
- Owner, admin and member roles
- Protected dashboard and admin routes
- SaaS plan model: Free / Pro / Business
- Transactional email adapter with console fallback
- Health and authenticated API routes
- Docker production image
- GitHub Actions CI
- Vitest example
- Security, architecture and deployment documentation

## Architecture

```mermaid
flowchart LR
    U[User] --> N[Next.js App Router]
    N --> A[Supabase Auth]
    N --> D[(Supabase Postgres)]
    N --> E[Email Adapter]
    A --> P[Proxy session refresh]
    D --> R[RLS Policies]
    R --> O[Organizations]
    O --> M[Memberships / Roles]
    N --> API[Route Handlers]
```

## Quick start

```bash
git clone https://github.com/popytech/africa-saas-starter.git
cd africa-saas-starter
npm install
cp .env.example .env.local
npm run dev
```

Create a Supabase project, add the values from the **Connect** dialog to `.env.local`, then apply the SQL migrations in order from `supabase/migrations/`.

Open `http://localhost:3000`.

## Project structure

```text
src/
├── app/
│   ├── (auth)/          # login + signup
│   ├── admin/           # owner/admin protected surface
│   ├── api/             # route handlers
│   ├── auth/callback/   # auth callback
│   └── dashboard/       # authenticated product surface
└── lib/
    ├── auth.ts
    ├── billing.ts
    ├── email/
    └── supabase/
supabase/
└── migrations/
docs/
.github/workflows/
```

## Authentication and authorization

Authentication is handled by Supabase Auth. Authorization is deliberately separated into two layers:

1. **Application checks** for route-level UX and role gates.
2. **Postgres RLS** as the data-access security boundary.

Never rely only on a client-side role check for protected data.

## Multi-tenancy

Each customer can belong to one or more organizations. Memberships carry one of three roles:

- `owner`
- `admin`
- `member`

The migrations provide private helper functions and RLS policies so organization data is visible only to authorized members.

## Security baseline

The reference Supabase schema has been validated with Supabase's database security advisors after deployment. `SECURITY DEFINER` helpers are isolated from the exposed `public` API schema and tenant tables use RLS.

See [`SECURITY.md`](./SECURITY.md) for production guidance.

## Billing

The starter includes a vendor-neutral plan model for product UI and entitlements. It intentionally does **not** ship with a live payment provider. Connect the billing provider appropriate to your market and compliance requirements.

## Email

`EMAIL_PROVIDER=console` works without external credentials and is ideal for local development. A Resend HTTP adapter is included and becomes active when `EMAIL_PROVIDER=resend` and `RESEND_API_KEY` are configured.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The same checks run in GitHub Actions. The current `main` branch passes the complete quality pipeline.

## Deployment

### Live demo

Production URL: **[https://africa-saas-starter.vercel.app/](https://africa-saas-starter.vercel.app/)**

The app can run on Vercel or any Node.js/Docker platform.

Use the **Deploy with Vercel** button above or see [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md).

Required production variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Optional email variables are documented in `.env.example`.

## Roadmap

- [ ] Organization invitations
- [ ] Audit log UI
- [ ] Feature flags
- [ ] Pluggable billing providers
- [ ] Object storage example
- [ ] Background jobs example
- [ ] i18n starter (FR / EN)
- [ ] Africa-focused phone-number utilities

## Contributing

Contributions are welcome. Read [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## License

MIT — use it, adapt it and build useful products with it.

---

<div align="center">

Built by **Popy Traoré** · Guinea 🇬🇳 → Africa 🌍

**Build useful things. Build for scale. Build for Africa.**

</div>
