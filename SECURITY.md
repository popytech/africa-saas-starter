# Security Policy

## Reporting

Please report security issues privately to the repository maintainer rather than opening a public issue with exploit details.

## Production checklist

- Keep `.env*` files out of Git.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` through `NEXT_PUBLIC_*` variables.
- Keep Row Level Security enabled on tenant tables.
- Verify authenticated identity server-side before privileged operations.
- Treat organization roles as authorization data, not presentation data.
- Use HTTPS in production.
- Rotate keys immediately if credentials are committed or logged.
- Configure provider webhooks with signature verification before accepting billing events.
- Review database policies when adding tables or relationships.

This starter is a reference implementation and must still be security-reviewed for the requirements of each production application.
