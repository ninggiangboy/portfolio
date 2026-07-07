## Local development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

This project deploys to Cloudflare Workers at [https://portfolio.nigb.dev](https://portfolio.nigb.dev).

Manual deploy:

```bash
pnpm run deploy
```

## GitHub auto-deploy

The workflow in `.github/workflows/deploy.yml` deploys automatically on every push to `main`.

Before it can work in GitHub Actions, add these repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`: your Cloudflare account ID
- `CLOUDFLARE_API_TOKEN`: API token with permission to deploy Workers and manage the target zone

After adding the secrets, push to `main` or run the workflow manually from the Actions tab.

## Learn more

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
