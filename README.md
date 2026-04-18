This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Contact Form Email Setup (Resend)

This project includes a server-side contact API route at `src/app/api/contact/route.ts`.

1. Create a `.env.local` file in the project root.
2. Copy values from `.env.example`.
3. Add your Resend API key:

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
CONTACT_TO_EMAIL="subhash09468@gmail.com"
CONTACT_RATE_LIMIT_WINDOW_MS=600000
CONTACT_RATE_LIMIT_MAX=5
CONTACT_ERROR_WEBHOOK=
```

Notes:

- `CONTACT_FROM_EMAIL` must be a sender allowed by your Resend account.
- If `CONTACT_TO_EMAIL` is not set, messages are sent to the email in `siteConfig.email`.
- `CONTACT_RATE_LIMIT_WINDOW_MS` and `CONTACT_RATE_LIMIT_MAX` control anti-spam throttling.
- A hidden honeypot field and form age check are used for basic bot protection.
- `CONTACT_ERROR_WEBHOOK` is optional and can be used to forward server-side send failures to your logging system.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
