## Local development

Run the development server:

```bash
cp .env.example .env.local
cp .dev.vars.example .dev.vars
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Contact form setup

The contact form uses:

- a Next.js Route Handler at `/api/contact`
- Cloudflare Turnstile for bot protection
- Resend for email delivery from `contact@portfolio.nigb.dev`

Required local files:

- `.env.local`
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `.dev.vars`
  - `CONTACT_FROM_EMAIL`
  - `RESEND_API_KEY`
  - `TURNSTILE_SECRET_KEY`

Cloudflare and Resend setup:

1. Create a Turnstile widget for `portfolio.nigb.dev`.
2. Add `localhost` and `127.0.0.1` to the Turnstile widget for local development.
3. Copy the Turnstile site key into `.env.local` and your deployment build environment.
4. Copy the Turnstile secret key into `.dev.vars` for local development and into a Worker secret for deployed environments.
5. In Resend, add and verify the sending domain used by `contact@portfolio.nigb.dev`.
6. Create a Resend API key with permission to send emails.
7. Store the API key as `RESEND_API_KEY` in `.dev.vars` and as a Worker secret in deployed environments.

Notes:

- The Turnstile site key is public and safe to expose to the client.
- The Turnstile secret key must stay server-only.
- Resend will reject mail if `CONTACT_FROM_EMAIL` is not part of a verified sender domain.

## Deploy

This project deploys to Cloudflare Workers at [https://portfolio.nigb.dev](https://portfolio.nigb.dev).

Manual deploy:

```bash
pnpm run deploy
```

Before deploying the contact form, make sure:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is available during the Next.js build in your local shell or CI environment.
- `CONTACT_FROM_EMAIL`, `RESEND_API_KEY`, and `TURNSTILE_SECRET_KEY` are stored as Worker secrets.

## GitHub auto-deploy

The workflow in `.github/workflows/deploy.yml` deploys automatically on every push to `main`.

Before it can work in GitHub Actions, add these repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`: your Cloudflare account ID
- `CLOUDFLARE_API_TOKEN`: API token with permission to deploy Workers and manage the target zone
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: the public Turnstile site key used by the client bundle
- `RESEND_API_KEY`: the API key used to send contact emails

After adding the secrets, push to `main` or run the workflow manually from the Actions tab.

## Learn more

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
