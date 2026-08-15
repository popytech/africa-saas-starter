# Deployment

Africa SaaS Starter is designed to run on Vercel or any Node.js/Docker-compatible platform.

## Vercel — one-click deployment

Use the repository's **Deploy with Vercel** button or import:

`https://github.com/popytech/africa-saas-starter`

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

Optional email configuration:

```env
EMAIL_PROVIDER=console
RESEND_API_KEY=
EMAIL_FROM=
```

### Setup sequence

1. Create a Supabase project.
2. Apply every migration in `supabase/migrations/` in filename order.
3. Add the Supabase URL and publishable key to Vercel.
4. Deploy the application.
5. In Supabase Auth, add the deployed application URL to the allowed redirect URLs.
6. Test signup, email confirmation, login, logout and protected dashboard access.
7. Test organization creation with two separate users to validate tenant isolation.

The auth callback derives its origin from the incoming request, so the same code supports localhost, preview deployments and production domains without hardcoding a site URL.

## Supabase security baseline

The included migrations:

- enable Row Level Security on tenant-facing tables;
- isolate authorization helper functions in a non-exposed private schema;
- restrict access by authenticated user membership and role;
- create user profiles automatically from Supabase Auth.

After applying migrations, run Supabase Security Advisors and resolve any new warnings before production use.

Never expose a Supabase service-role key in browser-accessible environment variables.

## Docker

Build:

```bash
docker build -t africa-saas-starter .
```

Run:

```bash
docker run --env-file .env.local -p 3000:3000 africa-saas-starter
```

Or:

```bash
docker compose up --build
```

## Production verification

Before calling a deployment production-ready:

- `npm run lint` passes;
- `npm run typecheck` passes;
- `npm test` passes;
- `npm run build` passes;
- all database migrations are applied;
- Supabase Security Advisors report no unresolved security findings;
- RLS is tested with separate tenant users;
- auth redirect URLs are configured;
- production email credentials are configured if email delivery is enabled;
- backups and monitoring are configured;
- secrets have never been committed to Git history.

## Vercel permission troubleshooting

If Vercel returns `403 Forbidden` while creating or listing deployments, the problem is account/team authorization rather than application code. Confirm that the connected Vercel identity has permission to create deployments and projects in the target team, or import the GitHub repository directly from the Vercel dashboard.
