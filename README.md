# The Brooklyn Rail

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

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
