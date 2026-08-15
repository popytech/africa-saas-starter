# Deployment

## Vercel

1. Import the GitHub repository.
2. Configure all required environment variables.
3. Deploy.
4. Set the production site URL in Supabase Auth redirect configuration.

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

## Before production

- run database migrations;
- validate RLS policies with separate test users;
- configure auth redirect URLs;
- use production email credentials;
- configure monitoring and backups;
- review the security checklist.
