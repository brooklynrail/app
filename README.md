# The Brooklyn Rail

https://brooklynrail.org/

---

A modern, performant, and accessible website for The Brooklyn Rail, built with Next.js and Directus Cloud.

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

### Development Tools

- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [SASS](https://sass-lang.com/) - CSS preprocessor
- [Luxon](https://moment.github.io/luxon/) - Date/time handling

## Getting Started

### Prerequisites

- Node.js 18+
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

- `yarn dev` - Start development server
- `yarn build` - Build production bundle
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript type checking
- `yarn validate` - Run both linting and type checking

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

- Content categories (e.g., Art, Poetry, Fiction)
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

## Project Structure

```
app/
├── app/              # Next.js app directory
│   ├── api/         # API routes
│   ├── hooks/       # Custom React hooks
│   └── lib/         # Utility functions
├── components/      # React components
│   ├── ads/        # Advertisement components
│   ├── article/    # Article-related components
│   ├── banner/     # Banner components
│   ├── events/     # Event-related components
│   ├── footer/     # Footer components
│   ├── header/     # Header components
│   ├── menu/       # Menu components
│   ├── navBar/     # Navigation components
│   └── popups/     # Popup components
├── lib/            # Shared utilities
├── public/         # Static assets
├── styles/         # Global styles
└── types/          # TypeScript type definitions
```

## Deployment

The site is automatically deployed to Vercel when changes are pushed to the main branch. Preview deployments are created for pull requests.

### Environment Variables

All environment variables must be set in the Vercel project settings for production deployment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is proprietary and confidential. All rights reserved.

---

---

---

---

# LEGACY changes

## Redirects

**2024-09-07** — we made a series of redirects across the Rail to provide more flexibility around Issues, Special Issues, and Articles.

These changes will make it easier to

- Publish Issues that are out of the year/month model (like Special Issues)
- Make it easier to display Articles outside of the context of an Issue in the front-end site
- Greatly reduce the amount of logic in the code to support Special Issues

### Issue redirects

| Old Path                                                               | Redirects To                                                                       |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [https://brooklynrail.org/2024/09/](https://brooklynrail.org/2024/09/) | [https://brooklynrail.org/issues/2024-09](https://brooklynrail.org/issues/2024-09) |
| [https://brooklynrail.org/2024/08/](https://brooklynrail.org/2024/08/) | [https://brooklynrail.org/issues/2024-08](https://brooklynrail.org/issues/2024-08) |
| [https://brooklynrail.org/2024/06/](https://brooklynrail.org/2024/06/) | [https://brooklynrail.org/issues/2024-07](https://brooklynrail.org/issues/2024-07) |

### Issue Section Redirects

| Old Section Path                                                                       | Redirects To                                                                                       |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [https://brooklynrail.org/2024/09/artseen/](https://brooklynrail.org/2024/09/artseen/) | [https://brooklynrail.org/issues/2024-09/artseen](https://brooklynrail.org/issues/2024-09/artseen) |
| [https://brooklynrail.org/2024/09/art/](https://brooklynrail.org/2024/09/art/)         | [https://brooklynrail.org/issues/2024-09/art](https://brooklynrail.org/issues/2024-09/art)         |
| [https://brooklynrail.org/2024/09/poetry/](https://brooklynrail.org/2024/09/poetry/)   | [https://brooklynrail.org/issues/2024-09/poetry](https://brooklynrail.org/issues/2024-09/poetry)   |

### Special Section Redirects

| Old Path                                                                                                             | Redirects To                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [https://brooklynrail.org/special/River_Rail_Puerto_Rico/](https://brooklynrail.org/special/River_Rail_Puerto_Rico/) | [https://brooklynrail.org/issues/River_Rail_Puerto_Rico/](https://brooklynrail.org/issues/River_Rail_Puerto_Rico/) |
| [https://brooklynrail.org/special/River_Rail/](https://brooklynrail.org/special/River_Rail/)                         | [https://brooklynrail.org/issues/River_Rail/](https://brooklynrail.org/issues/River_Rail/)                         |
| [https://brooklynrail.org/special/I_Love_John_Giorno/](https://brooklynrail.org/special/I_Love_John_Giorno/)         | [https://brooklynrail.org/issues/I_Love_John_Giorno/](https://brooklynrail.org/issues/I_Love_John_Giorno/)         |
| [https://brooklynrail.org/special/River_Rail_Colby/](https://brooklynrail.org/special/River_Rail_Colby/)             | [https://brooklynrail.org/issues/River_Rail_Colby/](https://brooklynrail.org/issues/River_Rail_Colby/)             |
| [https://brooklynrail.org/special/Art_Crit_Europe/](https://brooklynrail.org/special/Art_Crit_Europe/)               | [https://brooklynrail.org/issues/Art_Crit_Europe/](https://brooklynrail.org/issues/Art_Crit_Europe/)               |
| [https://brooklynrail.org/special/Ad_Reinhardt/](https://brooklynrail.org/special/Ad_Reinhardt/)                     | [https://brooklynrail.org/issues/Ad_Reinhardt/](https://brooklynrail.org/issues/Ad_Reinhardt/)                     |

### Pages Redirects

| **Current Path**                                                                       | **Redirect Path**                                                                                  |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [https://brooklynrail.org/advertise](https://brooklynrail.org/advertise)               | [https://brooklynrail.org/about/advertise](https://brooklynrail.org/about/advertise)               |
| [https://brooklynrail.org/contact-us](https://brooklynrail.org/contact-us)             | [https://brooklynrail.org/about/contact-us](https://brooklynrail.org/about/contact-us)             |
| [https://brooklynrail.org/history](https://brooklynrail.org/history)                   | [https://brooklynrail.org/about/history](https://brooklynrail.org/about/history)                   |
| [https://brooklynrail.org/notefrompub](https://brooklynrail.org/notefrompub)           | [https://brooklynrail.org/about/notefrompub](https://brooklynrail.org/about/notefrompub)           |
| [https://brooklynrail.org/our-supporters](https://brooklynrail.org/our-supporters)     | [https://brooklynrail.org/about/our-supporters](https://brooklynrail.org/about/our-supporters)     |
| [https://brooklynrail.org/staff](https://brooklynrail.org/staff)                       | [https://brooklynrail.org/about/staff](https://brooklynrail.org/about/staff)                       |
| [https://brooklynrail.org/submissions](https://brooklynrail.org/submissions)           | [https://brooklynrail.org/about/submissions](https://brooklynrail.org/about/submissions)           |
| [https://brooklynrail.org/terms-of-service](https://brooklynrail.org/terms-of-service) | [https://brooklynrail.org/about/terms-of-service](https://brooklynrail.org/about/terms-of-service) |
| [https://brooklynrail.org/where-to-find-us](https://brooklynrail.org/where-to-find-us) | [https://brooklynrail.org/about/where-to-find-us](https://brooklynrail.org/about/where-to-find-us) |
