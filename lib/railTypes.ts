import {
  Articles,
  ArticlesContributors,
  Contributors,
  Events,
  EventsTypes,
  Exhibitions,
  Homepage,
  HomepageBanners,
  Issues,
  Pages,
  PagesQuotes,
  Sections,
  Tributes,
} from "./types"

export interface AboutPageProps {
  navData: Homepage
  quotes?: PagesQuotes[] | null
  pageData: Pages
  allPagesData: Pages[]
  permalink: string
}

export interface ArchivePageProps {
  navData: Homepage
  issues: Issues[]
  permalink: string
}

export interface ArticleProps {
  navData: Homepage
  articleData: Articles
  thisIssueData: Issues
  currentSection: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
}

export interface ContributorPageProps {
  navData: Homepage
  currentArticles: ArticlesContributors[]
  contributorData: Contributors
}

export interface ContributorsPageProps {
  navData: Homepage
  thisIssueData: Issues
  allContributors: Contributors[]
  permalink: string
}

export interface EventProps {
  navData: Homepage
  eventData: Events
  eventTypes: EventsTypes[]
  permalink: string
}

export interface EventsProps {
  navData: Homepage
  allEvents: Events[]
  initialEvents: Events[]
  eventTypes: EventsTypes[]
  permalink: string
}

export interface PastEventsProps {
  navData: Homepage
  initialEvents: Events[]
  eventTypes: EventsTypes[]
  permalink: string
  errorCode?: number
  errorMessage?: string
}

export interface ExhibitionProps {
  navData: Homepage
  exhibitionData: Exhibitions
  permalink: string
  previewURL?: string
}

export interface ExhibitionsProps {
  navData: Homepage
  allExhibitions: Exhibitions[]
  permalink: string
}

export interface IssuePageProps {
  navData: Homepage
  thisIssueData: Issues
  tributesData: Tributes[]
  allIssues: Issues[]
  issueSections: Sections[]
  permalink: string
  previewURL?: string
  currentSection?: Sections | null
}

export interface IssueSectionPageProps {
  navData: Homepage
  thisIssueData: Issues
  issueSections: Sections[]
  tributesData: Tributes[]
  currentSection: Sections
  allIssues: Issues[]
  previewURL?: string
  permalink: string
}

export interface MergePageProps {
  navData: Homepage
  previewPassword: string
}

// PREVIEW Props
export interface ArticlePreviewProps {
  navData: Homepage
  articleData: Articles
  thisIssueData: Issues
  currentSection: Sections
  permalink: string
  isEnabled: boolean
  previewPassword: string
  directusUrl: string
}

export interface EventPreviewProps {
  navData: Homepage
  eventData: Events
  eventTypes: EventsTypes[]
  permalink: string
  isEnabled: boolean
  previewPassword: string
  directusUrl: string
}

export interface ExhibitionPreviewProps {
  navData: Homepage
  exhibitionData: Exhibitions
  permalink: string
  errorCode?: number
  errorMessage?: string
  isEnabled: boolean
  previewPassword: string
  directusUrl: string
  previewURL: string
}

export interface HomePageProps {
  navData: Homepage
  homepageData: Homepage
  currentIssue: Issues
  homepageHeaderData: HomepageBanners[]
  permalink: string
  errorCode?: number
  errorMessage?: string
  previewURL?: string
}

export interface HomepagePreviewProps {
  navData: Homepage
  homepageData: Homepage
  homepageHeaderData: HomepageBanners[]
  currentIssue: Issues
  permalink: string
  isEnabled: boolean
  previewPassword: string
  directusUrl: string
}

export interface IssuePreviewProps {
  navData: Homepage
  thisIssueData: Issues
  issueSections: Sections[]
  allIssues: Issues[]
  tributesData: Tributes[]
  permalink: string
  isEnabled: boolean
  previewPassword: string
  directusUrl: string
  currentSection: Sections
  previewURL: string
}

export interface NotFoundProps {
  navData: Homepage
}

export interface TributePreviewProps {
  navData: Homepage
  tributeData: Tributes
  articleData: Articles
  permalink: string
  isEnabled: boolean
  previewPassword: string
  directusUrl: string
}

export interface SearchProps {
  navData: Homepage
  issues: Issues[]
  permalink: string
  errorCode?: number
  errorMessage?: string
}

// END Preview Props

export interface SectionPageProps {
  navData: Homepage
  sectionData: Sections
  articlesData: Articles[]
  permalink: string
}

export interface TributeArticleProps {
  navData: Homepage
  thisTributeData: Tributes
  articleData: Articles
  permalink: string
  currentArticleSlug: string
  previewURL?: string
}

export interface TributePageProps {
  navData: Homepage
  thisTributeData: Tributes
  articleData: Articles
  permalink: string
  previewURL?: string
}

export interface SiteMapProps {
  url: string
  lastModified: string
  changeFrequency: "monthly" | "weekly" | "daily"
  priority: number
}
