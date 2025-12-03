# Brooklyn Rail — Project Handoff Documentation

> **Date:** December 2024  
> **Prepared by:** Jeremy Zilar  
> **Purpose:** Comprehensive handoff documentation for incoming development team

---

## Table of Contents

1. [Key Contacts](#key-contacts)
2. [Access & Credentials](#access--credentials)
3. [Domains & Infrastructure](#domains--infrastructure)
4. [Repositories](#repositories)
5. [Third-Party Services](#third-party-services)
6. [CMS Overview (Directus)](#cms-overview-directus)
7. [Development Workflow](#development-workflow)
8. [Ongoing Access & Collaboration](#ongoing-access--collaboration)
9. [Known Issues & Technical Debt](#known-issues--technical-debt)
10. [Onboarding Checklist](#onboarding-checklist)

---

## Key Contacts

| Role                      | Name               | Contact                                               | Notes                             |
| ------------------------- | ------------------ | ----------------------------------------------------- | --------------------------------- |
| **Technical/Development** | Jeremy Zilar       | jeremyzilar@gmail.com, 718-510-2236, Slack: #platform | Board member, original developer  |
| **Design**                | Jeremy Zilar       | (same as above)                                       | —                                 |
| **Design (Brand)**        | Juliette Cezzar    | juliette.cezzar@gmail.com, 917-747-2953               | Board member, brand strategy      |
| **Content/Editorial**     | Tyhe               | tyhe@brooklynrail.org, Slack: #platform               | Primary content editor            |
| **Day-to-day Operations** | Tyhe               | (same as above)                                       | —                                 |
| **Social Media**          | Elizabeth or Jorja | —                                                     | Ask about social scheduling tools |

---

## Access & Credentials

### Primary Credential Storage

**1Password** — All credentials are stored in the **PLATFORM** vault.

- 1Password is the **source of truth** for all service credentials
- If credentials are not in 1Password, they should be added there
- New team members should be granted access to the PLATFORM vault

### Service Account Email

**`platform@brooklynrail.org`** — This is a Google Group that receives:

- Service updates and outages
- Billing notifications
- Access requests
- Important platform communications

**⚠️ Important:** New development team members should be added to this Google Group to receive critical service notifications.

### Account Administration

- **Jeremy Zilar** is the primary admin on most accounts
- **Jorja** has admin access on select accounts
- Admin access can be transferred/shared as needed

---

## Domains & Infrastructure

### Domain Registration & DNS

| Service          | Provider             | Credentials          |
| ---------------- | -------------------- | -------------------- |
| Domain Registrar | **Namecheap**        | 1Password (PLATFORM) |
| DNS Hosting      | **Cloudflare**       | 1Password (PLATFORM) |
| Email            | **Google Workspace** | 1Password (PLATFORM) |

### Primary Domains

| Domain             | Purpose                       | Hosting             |
| ------------------ | ----------------------------- | ------------------- |
| `brooklynrail.org` | Main website                  | Vercel              |
| `brooklynrail.com` | Redirects to brooklynrail.org | Cloudflare redirect |

### Subdomains

| Subdomain                        | Purpose                   | Hosting             | Status                            |
| -------------------------------- | ------------------------- | ------------------- | --------------------------------- |
| `studio.brooklynrail.org`        | Directus CMS              | Directus Cloud      | ✅ Active                         |
| `shop.brooklynrail.org`          | Online store              | Shopify             | ✅ Active                         |
| `preview.brooklynrail.org`       | Staging/Preview           | Vercel              | ✅ Active (requires Vercel login) |
| `old.brooklynrail.org`           | Legacy site snapshot      | GoDaddy             | 📦 Archive                        |
| `intranslation.brooklynrail.org` | Literary translations     | GoDaddy (WordPress) | ⚠️ Legacy                         |
| `venice.brooklynrail.org`        | Venice Biennale microsite | GitHub Pages        | ⚠️ Needs redirect                 |

### Special Routes

| URL                       | Description   | Hosting                                                      |
| ------------------------- | ------------- | ------------------------------------------------------------ |
| `brooklynrail.org/donate` | Donation page | **Netlify** (separate server, routed via Cloudflare Workers) |

### Other Project Domains

| Domain                  | Project                               |
| ----------------------- | ------------------------------------- |
| `cometogethersandy.com` | Come Together Sandy (special project) |

### Legacy Site Access

**`old.brooklynrail.org`**

- This is the OLD site preserved exactly as it was before the 2024 migration
- Useful for reference and comparison
- **Login:** `staff` / `staff`

---

## Repositories

**GitHub Organization:** [github.com/brooklynrail](https://github.com/brooklynrail/)

**Admin Access:** Jeremy Zilar (can grant access to new team members)

### Active Repositories

| Repository                                                                                  | Description                 | Hosting        | Branch |
| ------------------------------------------------------------------------------------------- | --------------------------- | -------------- | ------ |
| [brooklynrail/app](https://github.com/brooklynrail/app)                                     | Main Next.js website        | Vercel         | `main` |
| [brooklynrail/brooklynrail-platform](https://github.com/brooklynrail/brooklynrail-platform) | Donate page (Hugo)          | Netlify        | `main` |
| [brooklynrail/studio](https://github.com/brooklynrail/studio)                               | Directus CMS configuration  | Directus Cloud | `main` |
| [brooklynrail/brooklynrail](https://github.com/brooklynrail/brooklynrail)                   | Legacy PHP/CodeIgniter site | GoDaddy        | —      |
| [brooklynrail/brooklynrail-venice](https://github.com/brooklynrail/brooklynrail-venice)     | Venice Biennale (Jekyll)    | GitHub Pages   | —      |

### Archived Repositories (Reference Only)

| Repository                         | Description                 |
| ---------------------------------- | --------------------------- |
| brooklynrail/singing-in-unison     | Archived microsite          |
| brooklynrail/brooklynrail-support  | Old donation site           |
| brooklynrail/brooklynrail-handbook | Guide to the Brooklyn Rail  |
| brooklynrail/next-test             | Next.js proof-of-concept    |
| brooklynrail/chrome                | Chrome extension experiment |
| brooklynrail/podcast-bot           | Podcast automation          |
| brooklynrail/fiction-DNA           | Fiction project             |

---

## Third-Party Services

All credentials are stored in **1Password (PLATFORM vault)**.

### Hosting & Infrastructure

| Service            | Purpose             | URL/Notes                              |
| ------------------ | ------------------- | -------------------------------------- |
| **Vercel**         | Main site hosting   | Auto-deploys from `main` branch        |
| **Netlify**        | Donate page hosting | Hugo-based site                        |
| **Directus Cloud** | Headless CMS        | `studio.brooklynrail.org`              |
| **Cloudflare**     | DNS, CDN, Workers   | Routes `/donate` to Netlify            |
| **GoDaddy**        | Legacy hosting      | `old.` and `intranslation.` subdomains |
| **GitHub Pages**   | Venice microsite    | `venice.brooklynrail.org`              |
| **Namecheap**      | Domain registrar    | —                                      |

### Content & Media

| Service            | Purpose                                |
| ------------------ | -------------------------------------- |
| **Directus Cloud** | Primary CMS for all content            |
| **Algolia**        | Search functionality                   |
| **Airtable**       | Data management (various uses)         |
| **Vimeo/YouTube**  | Video hosting                          |
| **Shopify**        | Online store (`shop.brooklynrail.org`) |

### Marketing & Communication

| Service               | Purpose                     |
| --------------------- | --------------------------- |
| **Mailchimp**         | Newsletter management       |
| **Google Workspace**  | Email (`@brooklynrail.org`) |
| **Slack**             | Team communication          |
| **Social scheduling** | Ask Elizabeth or Jorja      |

### Analytics & Payments

| Service              | Purpose                        |
| -------------------- | ------------------------------ |
| **PostHog**          | Analytics and user tracking    |
| **Google Analytics** | Additional analytics           |
| **Stripe**           | Payment processing (donations) |

### Essential Slack Channels

| Channel                | Purpose                            |
| ---------------------- | ---------------------------------- |
| `#platform`            | General platform discussion        |
| `#platform-updates`    | Platform updates and announcements |
| `#production-workflow` | Production workflow coordination   |
| `#production-notify`   | Production notifications           |

---

## CMS Overview (Directus)

### Access

- **URL:** https://studio.brooklynrail.org
- **Credentials:** 1Password (PLATFORM vault)

### Content Workflow

- **Draft → Review → Publish:** Yes, this workflow exists in Directus
- **Scheduled Publishing:** Not actively used
- **Primary Content Editors:** Contact Tyhe for content questions

### Key Collections

| Collection     | Description                            |
| -------------- | -------------------------------------- |
| `articles`     | All written content                    |
| `issues`       | Monthly and special issues             |
| `sections`     | Content categories (Art, Poetry, etc.) |
| `contributors` | Authors and contributors               |
| `events`       | The New Social Environment events      |
| `exhibitions`  | Art exhibitions                        |
| `people`       | Artist/writer profiles                 |
| `collections`  | Curated content groups                 |
| `pages`        | Static pages                           |

### Directus Support Contacts

Special thanks to the Directus team for ongoing support:

- William Friedman
- Alex van der Valk
- Jose Varela

---

## Development Workflow

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/brooklynrail/app.git
cd app
```

2. Install dependencies:

```bash
yarn install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Add credentials from 1Password to `.env.local`

5. Start development server:

```bash
yarn dev
```

6. Open https://localhost:3000

### Deployment

- **Production:** Push to `main` branch → auto-deploys to Vercel
- **Preview:** Create PR → Vercel creates preview deployment
- **Preview URL:** https://preview.brooklynrail.org (requires Vercel login)

### Code Standards

- TypeScript for all new code
- ESLint + Prettier for formatting
- Run `yarn validate` before committing

---

## Ongoing Access & Collaboration

### Jeremy's Continued Involvement

Jeremy Zilar will maintain limited access for:

1. **Repository Access** — Retain access to make hot fixes if needed
2. **Local Development** — Ability to build and run the site locally
3. **Knowledge Transfer** — Available for calls to walk through how things work
4. **Slack Access** — Available in `#platform` channel for questions

### Communication Process

To ensure smooth collaboration:

1. **New team should have access to `#platform` Slack channel**
2. **Establish a process for communicating changes** (major updates, deployments, etc.)
3. **Jeremy has no desire to actively maintain** — only available for emergencies and knowledge transfer

### Recommended Handoff Process

1. Add new team to 1Password PLATFORM vault
2. Add new team to `platform@brooklynrail.org` Google Group
3. Grant GitHub access to brooklynrail org
4. Add to relevant Slack channels

---

## Known Issues & Technical Debt

### 🔴 Critical: Caching & ISR Issues

**Problem:** Pages are being rebuilt via ISR (Incremental Static Regeneration) too often, causing high Vercel costs.

**Root Causes:**

- Inconsistent data fetching patterns throughout the codebase
  - Some routes use Directus SDK
  - Some use REST API directly
  - Multiple levels of caching at different layers
- No unified caching strategy across the application

**Current Workaround:**

- Manual refresh page at [brooklynrail.org/refresh/](https://brooklynrail.org/refresh/)
- Tyhe can revalidate pages by content type using this interface
- Uses Next.js `revalidateTag` option

**Recommendation:** Audit and standardize data fetching patterns; implement consistent caching strategy across all routes and API calls.

---

### 🟡 Medium: Homepage Performance

**Problem:** The homepage is very "heavy" with many data requests, making it expensive to render.

**Details:**

- Multiple API calls to Directus for various content sections
- High compute costs on Vercel due to complexity

**Recommendation:** Optimize homepage data fetching; consider consolidating API calls or implementing more aggressive caching for homepage components.

---

### 🟡 Medium: Search Index (Algolia)

**Problems:**

1. Search is not updating automatically with recent content
2. Requires manual script to update the search index
3. **Index contains 3x duplicate entries** — costing money unnecessarily

**Recommendation:**

- Rebuild the Algolia index from scratch to remove duplicates
- Set up automated index updates (e.g., webhook from Directus on content publish)
- Investigate and fix the source of duplication

---

### 🟡 Medium: Directus Monitoring

**Issue:** Hard to see logs on the Directus Cloud server.

**Action:** Check in with Directus team (William Friedman, Alex van der Valk, Jose Varela) about:

- Server load from the Rail's usage
- Improved logging visibility (they're working on this)

---

### 🟡 Medium: Legacy Sites

| Issue                  | Description                                                 | Recommendation                               |
| ---------------------- | ----------------------------------------------------------- | -------------------------------------------- |
| **InTranslation Site** | WordPress site on GoDaddy, not mobile-friendly, locked down | Convert to static pages                      |
| **Venice Microsite**   | Jekyll site on GitHub Pages, outdated                       | Redirect to new Exhibition page on main site |

---

### ✅ No Known Issues

- Page load speed is generally fine
- No browser-specific issues
- No mobile responsiveness problems

### 📊 Analytics & Monitoring

The site is being tracked through:

- **PostHog** — User analytics and event tracking
- **Google Analytics** — Additional traffic analytics

These can be used to monitor site performance, user behavior, and identify issues.

---

### To Be Documented

The following items need further documentation:

- [ ] Incomplete features or work in progress
- [ ] CMS workflow pain points
- [ ] Detailed Directus schema documentation
- [ ] API endpoint documentation

---

## Onboarding Checklist

### For New Development Team

- [ ] Request access to 1Password PLATFORM vault
- [ ] Get added to `platform@brooklynrail.org` Google Group
- [ ] Get added to GitHub `brooklynrail` organization
- [ ] Get added to Slack workspace and relevant channels
- [ ] Clone the `app` repository
- [ ] Set up local development environment
- [ ] Request Vercel team access
- [ ] Request Directus Cloud access
- [ ] Review this documentation and README.md
- [ ] Review [Brand Guidelines](https://www.figma.com/slides/qCMKnrG8mzGGlVGrsRXMGl/Brooklyn-Rail-Brand-Guidelines-2024)

### Credentials to Request

From 1Password PLATFORM vault:

- [ ] Directus Cloud API token
- [ ] Vercel access
- [ ] Algolia API keys
- [ ] Mailchimp API keys
- [ ] PostHog access
- [ ] Google Analytics access
- [ ] Cloudflare access (if needed for DNS/Workers)

---

## Questions?

Contact Jeremy Zilar:

- **Email:** jeremyzilar@gmail.com
- **Phone:** 718-510-2236
- **Slack:** `#platform` channel

---

_This document was prepared in December 2024 for the handoff of The Brooklyn Rail platform to a new development team._
