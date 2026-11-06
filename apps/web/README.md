# Xchange One — startup marketplace (Next.js)

A mobile-responsive, online-ready platform for **buying, selling and swapping physical, pre-loved books across India**.

## Status

**Working product foundation (alpha, not a live transactional launch).**
- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, editorial component design.
- Public browse/search/filter/sort and individual listing details.
- Supabase Auth (email/password), seller profiles, and cookie-based SSR sessions.
- Protected listing creation with optional cover photo (up to 5 MB).
- Purchase and exchange **requests** (not checkouts), seller accept/decline with atomic book reservation.
- My Library dashboard, saved books, owner-only listing management.
- PostgreSQL with row-level security, seller-ownership enforcement, and a private requests table.
- Graceful *preview mode* without database environment variables; examples are **not** real sellers.

**Not yet implemented:** in-app payments, shipping label generation / tracking, buyer-seller messaging, moderation, dispute resolution, refunds, seller verification, notifications, and production anti-abuse controls. Do not accept payments based only on the alpha.

## Run locally

```bash
cd apps/web
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Without credentials, pages display safe mock books. Login, publishing and requests remain disabled.

## Activate shared data and authentication

1. Create a Supabase project in the intended deployment region.
2. Run `supabase/migrations/0001_marketplace.sql` and then `0002_transaction_integrity.sql` in Supabase SQL Editor (repository root).
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `apps/web/.env.local`. The key must be the **publishable/anon key**, never the service-role key.
4. In Supabase Auth URL Configuration, set Site URL to your deployed host and add `https://YOUR_HOST/auth/callback` plus `http://localhost:3000/auth/callback` to redirect URLs.
5. Enable email confirmations and a trustworthy email delivery provider before production.
6. Run `npm run typecheck` and `npm run build`; smoke-test sign-up, book listing, buy and swap offers using two test accounts.
7. For Vercel, create a **separate Vercel project** from this GitHub repository and set Root Directory to `apps/web`. Add the two environment variables and connect the feature branch for preview deployments.

The existing `site/` static app and its existing Vercel project are intentionally untouched.

## Architecture

```
apps/web/
  src/app/                App Router pages and authenticated server actions
  src/components/         Shared visual components and forms
  src/lib/                Catalog and typed domain models
  src/lib/supabase/       Browser + server Supabase clients
  src/proxy.ts            SSR session refresh
supabase/migrations/      PostgreSQL schema, RLS, transaction RPCs
.github/workflows/        TypeScript + production build CI
```

- The server validates user identity with Supabase Auth on every mutation; PostgreSQL RLS protects records if a user bypasses the UI.
- A purchase request reserves a listing only after the seller accepts. An accepted swap reserves **both** listings atomically.
- Requests are *intent messages* only. Never claim that accepting a request charged money or dispatched a courier.
- The first public catalog is capped at 60 latest books; add cursor pagination and database search indexes before growth.
- **Launch gate:** review RLS, add request rate-limiting, anti-spam, moderation, reliable payment/shipping workflow, audit logs, privacy policy and terms.

## Next milestones

1. **Beta reliability:** cover image moderation, listing edits, favorite status optimizations, pagination, automated integration and e2e tests.
2. **Transaction layer:** seller/buyer messaging with guarded contact disclosure; integrated payment provider with verified webhooks and refunds.
3. **Fulfillment:** courier quotes, pickup requests, shipment creation, tracking, claims and dispute process.
4. **Growth:** recommendations, follow alerts, ISBN lookup, SEO, notifications, analytics and admin panel.
