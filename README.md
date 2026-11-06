> **Live local-first app:** [Xchange Campus](https://hulax-xchange-campus.vercel.app) · Vercel production deployment is READY. User-entered records stay in this browser, not a shared database.

# Xchange — Pass the story on

This is a functioning campus book-exchange application, not only a project description. The new self-contained version lives in `site/` and the original React/Express implementation remains intact for reference.

## Features
- Browse, search and filter illustrative second-hand textbook listings.
- Sort by price and condition; add, save or delete your own listings.
- Create copyable exchange-request drafts. No seller is messaged automatically.
- Validation and HTML escaping for user entries; changes persist in the browser.

**Demo boundary:** This is local browser storage, not a shared database. Accounts, verified sellers, payments and real multi-user messaging have not been implemented. Please don't enter private contact information.

## Run & test
```bash
python -m http.server 4173 --directory site
node --test tests/model.test.mjs
```
Open http://localhost:4173.

## Deploy
The `vercel.json` builds the complete static `site/` app. A standalone Vercel project is available as `hulax-xchange-campus`; currently deploys are made from source files. GitHub → Vercel auto-deploy requires an additional Vercel GitHub Login Connection.

## Production roadmap
Shared database, university identities, seller authorization, moderation, abuse reporting and secure messaging.

By Rahul Khanke / HuLaX.