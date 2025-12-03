# The Brooklyn Rail

https://brooklynrail.org/

---

A modern, performant, and accessible website for The Brooklyn Rail, built with Next.js and Directus Cloud.

**🏆 2025 Webby Honoree** — Best Visual Design - Function ([Webby Awards](https://winners.webbyawards.com/winners/websites-and-mobile-sites/features-design/best-visual-design-function?years=0))

---

## Credits & Recognition

This site was completely re-platformed and re-designed in 2024 to consolidate and make accessible the Rail's vast archive of articles and videos chronicling art and culture since 2000.

### Team

| Role                     | Person                                                                                    |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| Digital & Brand Strategy | [Juliette Cezzar](https://juliettecezzar.com/) & [Jeremy Zilar](https://jeremyzilar.com/) |
| Site Design              | [Juliette Cezzar](https://juliettecezzar.com/) & [Jeremy Zilar](https://jeremyzilar.com/) |
| Site Development         | [Jeremy Zilar](https://jeremyzilar.com/)                                                  |

**About the team:**

- **Juliette Cezzar** — Designer, educator, and writer. Former Director of Communication Design at Parsons School of Design and President of AIGA NY. Board member of The Brooklyn Rail since 2018.
- **Jeremy Zilar** — Designer, strategist, and engineer. Board member of The Brooklyn Rail. Formerly oversaw blogs at The New York Times and served as Director of Digital.gov.

### Typography

Set in [Untitled Sans](https://klim.co.nz/retail-fonts/untitled-sans/) and [Untitled Serif](https://klim.co.nz/retail-fonts/untitled-serif/) by [Klim Type Foundry](https://klim.co.nz/).

### Special Thanks

- William Friedman, Alex van der Valk, and Jose Varela at [Directus](https://directus.io/) for their continuing technical guidance and support towards managing and migrating our archive data.

### Brand Guidelines

- [Brooklyn Rail Brand Guidelines 2024](https://www.figma.com/slides/qCMKnrG8mzGGlVGrsRXMGl/Brooklyn-Rail-Brand-Guidelines-2024?node-id=1-34&t=JDkVSz1P7qrJqND1-1) (Figma)

---

## Technology Stack

### Core Technologies

- [Next.js 15](https://nextjs.org/) - React framework for server-rendered applications
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Directus Cloud](https://directus.io/) - Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vercel](https://vercel.com/) - Hosting and deployment platform

### Additional Services

- [Algolia](https://www.algolia.com/) - Search functionality
- [Mailchimp](https://mailchimp.com/) - Newsletter management
- [PostHog](https://posthog.com/) - Analytics and user tracking
- [Google Analytics](https://analytics.google.com/) - Additional analytics
- [Stripe](https://stripe.com/) - Payment processing for donations
- [Airtable](https://airtable.com/) - Data management

### Development Tools

- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [SASS](https://sass-lang.com/) - CSS preprocessor
- [Luxon](https://moment.github.io/luxon/) - Date/time handling

---

## Architecture Overview

### System Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLOUDFLARE                                   │
│                    (DNS + Workers + CDN)                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   VERCEL     │  │   NETLIFY    │  │   GODADDY    │              │
│  │              │  │              │  │              │              │
│  │ brooklynrail │  │   /donate    │  │  old.        │              │
│  │ .org (Next)  │  │   (Hugo)     │  │  intrans.    │              │
│  └──────┬───────┘  └──────────────┘  └──────────────┘              │
│         │                                                           │
│         ▼                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  DIRECTUS    │  │   ALGOLIA    │  │  MAILCHIMP   │              │
│  │   CLOUD      │  │   (Search)   │  │ (Newsletter) │              │
│  │   (CMS)      │  │              │  │              │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   SHOPIFY    │  │   STRIPE     │  │   POSTHOG    │              │
│  │   (Store)    │  │  (Payments)  │  │  (Analytics) │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Integration Points

- **Directus Cloud** (`studio.brooklynrail.org`) — Primary content management system. All articles, issues, events, contributors, and media are managed here.
- **Vercel** — Hosts the main Next.js application with automatic deployments from the `main` branch.
- **Cloudflare Workers** — Routes `/donate` traffic to Netlify-hosted Hugo site.
- **Algolia** — Provides search functionality across all content types.

---

## Getting Started

### Prerequisites

- Node.js 20+
- Yarn package manager
- Access to Directus Cloud instance
- Environment variables (see `.env.example`)

### Local Development Setup

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

4. Update `.env.local` with your credentials:

- `DIRECTUS_URL` - Your Directus Cloud instance URL
- `DIRECTUS_TOKEN` - Your Directus API token
- `ALGOLIA_APP_ID` - Algolia application ID
- `ALGOLIA_SEARCH_KEY` - Algolia search API key
- `ALGOLIA_ADMIN_KEY` - Algolia admin API key
- `MAILCHIMP_API_KEY` - Mailchimp API key
- `MAILCHIMP_API_SERVER` - Mailchimp server prefix
- `MAILCHIMP_AUDIENCE_ID` - Mailchimp audience/list ID

5. Start the development server:

```bash
yarn dev
```

6. Open [https://localhost:3000](https://localhost:3000) in your browser

### Development Scripts

- `yarn dev` - Start development server (with HTTPS)
- `yarn build` - Build production bundle
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript type checking
- `yarn validate` - Run both linting and type checking

---

## Content Types

The Brooklyn Rail website manages several types of content through Directus:

### Articles

- Core content type for all written pieces
- Includes fields for title, body, excerpt, contributors, images
- Connected to issues and sections
- Supports featured articles and artwork

### Issues

- Monthly and special issues
- Contains articles, sections, and metadata
- Supports both regular monthly issues and special editions

### Sections

- Content categories (e.g., Art, Poetry, Fiction, ArtSeen, Critics Page)
- Organizes articles by topic
- Includes metadata and sorting

### Contributors

- Authors and contributors to the Rail
- Manages biographical information and contributions

### Events

- The New Social Environment events
- Includes event details, participants, and scheduling

### Exhibitions

- Art exhibitions featured in the Rail
- Includes location, dates, and related information

### People

- Profiles of artists, writers, and other figures
- Connected to articles and events

### Collections

- Curated groups of content
- Used for homepage features and special sections

### Pages

- Static content pages
- Includes about pages, contact information, etc.

---

## Project Structure

```
app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── article/       # Article endpoints
│   │   ├── collections/   # Collections endpoints
│   │   ├── events/        # Events endpoints
│   │   ├── issues/        # Issues endpoints
│   │   ├── preview/       # Preview mode endpoints
│   │   ├── refresh/       # Cache refresh endpoints
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   ├── providers/         # Context providers (PostHog, etc.)
│   ├── [year]/            # Dynamic year routes (legacy redirects)
│   ├── about/             # About pages
│   ├── contributor/       # Contributor pages
│   ├── events/            # Events listing and detail
│   ├── exhibitions/       # Exhibitions
│   ├── issues/            # Issue pages
│   ├── preview/           # Preview mode pages
│   ├── search/            # Search page
│   ├── section/           # Section pages
│   ├── tribute/           # Tribute pages
│   └── ...
├── components/            # React components
│   ├── ads/              # Advertisement components
│   ├── article/          # Article-related components
│   ├── banner/           # Homepage banner
│   ├── collections/      # Collection displays
│   ├── events/           # Event components
│   ├── header/           # Site header
│   ├── footer/           # Site footer
│   ├── issuePage/        # Issue page components
│   ├── search/           # Search components
│   └── ...
├── lib/                   # Shared utilities
│   ├── directus.tsx      # Directus client configuration
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.tsx         # Utility functions
│   └── utils/            # Additional utilities
├── public/               # Static assets
│   ├── images/           # Static images
│   └── pdf/              # PDF files
├── styles/               # Global styles
│   ├── globals.scss      # Global CSS
│   ├── fonts.scss        # Font definitions
│   ├── themes.scss       # Theme variables
│   └── ...
└── types/                # Additional TypeScript types
```

---

## Deployment

### Production (Vercel)

The site is automatically deployed to Vercel when changes are pushed to the `main` branch. Preview deployments are created for pull requests.

**Production URL:** https://brooklynrail.org  
**Preview URL:** https://preview.brooklynrail.org (requires Vercel login)

### Environment Variables

All environment variables must be set in the Vercel project settings for production deployment. See `.env.example` for required variables.

### Deployment Workflow

1. Create a feature branch from `main`
2. Make changes and test locally
3. Push branch and create a Pull Request
4. Vercel creates a preview deployment automatically
5. Review and test the preview deployment
6. Merge to `main` to deploy to production

---

## URL Structure & Redirects

### Current URL Patterns

| Content Type | URL Pattern                            | Example                          |
| ------------ | -------------------------------------- | -------------------------------- |
| Issue        | `/issues/[issueSlug]`                  | `/issues/2024-09`                |
| Article      | `/issues/[issueSlug]/[section]/[slug]` | `/issues/2024-09/art/my-article` |
| Section      | `/section/[slug]`                      | `/section/artseen`               |
| Contributor  | `/contributor/[slug]`                  | `/contributor/john-smith`        |
| Event        | `/event/[year]/[month]/[day]/[slug]`   | `/event/2024/09/15/my-event`     |
| Exhibition   | `/exhibition/[slug]`                   | `/exhibition/gallery-show`       |
| Tribute      | `/tribute/[tributeSlug]`               | `/tribute/artist-name`           |

### Legacy Redirects

The site maintains redirects from the old URL structure for backwards compatibility:

| Old Pattern            | New Pattern               |
| ---------------------- | ------------------------- |
| `/2024/09/`            | `/issues/2024-09`         |
| `/2024/09/artseen/`    | `/issues/2024-09/artseen` |
| `/special/River_Rail/` | `/issues/River_Rail/`     |

See `vercel.json` and the legacy redirect middleware for complete redirect rules.

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure your code follows the project's coding standards and includes appropriate tests.

---

## License

This project is proprietary and confidential. All rights reserved.

---

## Related Documentation

- [HANDOFF.md](./HANDOFF.md) - Handoff documentation for new development team
- [Directus Documentation](https://docs.directus.io/) - CMS documentation
- [Next.js Documentation](https://nextjs.org/docs) - Framework documentation
