/* eslint max-lines: 0 */
export type Ads = {
  ad_type: string
  ad_url?: string | null
  date_created?: string | null
  date_updated?: string | null
  end_date: Date
  id: number
  tile_image?: DirectusFiles | null
  banner_image?: DirectusFiles | null
  banner_image_mobile?: DirectusFiles | null
  old_id?: number | null
  sort?: number | null
  start_date: Date
  status: string
  slug: string
  campaign_title: string
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type Articles = {
  id: string
  body: string
  body_code?: string | null
  body_text?: string | null
  body_type?: string | null
  byline_override?: string | null
  contributors: ArticlesContributors[]
  date_created: string
  date_updated: string
  deck?: string | null
  endnote: string
  excerpt: string
  featured: boolean
  featured_image?: DirectusFiles
  featured_artwork?: DirectusFiles
  header_type?: string | null
  images: any[] | ArticlesFiles[]
  in_print?: boolean | null
  issue: Issues
  kicker?: string | null
  hide_bylines: boolean
  hide_bylines_downstream: boolean
  hide_title?: boolean | null
  isbn?: number
  old_id?: number | null
  promo_banner?: DirectusFiles
  promo_thumb?: DirectusFiles
  section: Sections
  slideshow_image?: DirectusFiles | null
  slug: string
  sort?: number | null
  status: string
  tags: string
  title: string
  title_tag?: string
  tribute?: Tributes | null
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}
export interface Redirects {
  path: string
  articles: Articles
}

export type ArticlesContributors = {
  articles_contributors_id?: Articles | null
  contributors_id?: Contributors | null
  id: number
}

export type ArticlesFiles = {
  articles_files_id?: string | Articles | null
  directus_files_id?: DirectusFiles
  id: number
}

export type Collections = {
  date_created?: string | null
  date_updated?: string | null
  deck?: string | null
  homepage: any[] | HomepageCollections[]
  id: string
  limit?: number | null
  section?: Sections | null
  sort?: number | null
  status: string
  title: string
  tribute?: string | Tributes | null
  type: string
  banner_type?: string | null
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type Contributors = {
  articles: ArticlesContributors[]
  bio?: string | null
  date_created: string
  date_updated: string
  email?: string | null
  first_name?: string | null
  hidden?: boolean | null
  id: string
  last_name?: string | null
  old_id: number
  slug: string
  sort?: number | null
  status?: string | null
  url?: string | null
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type DirectusActivity = {
  action: string
  collection: string
  comment?: string | null
  id: number
  ip?: string | null
  item: string
  origin?: string | null
  revisions: any[] | DirectusRevisions[]
  timestamp: string
  user?: string | DirectusUsers | null
  user_agent?: string | null
}

export type DirectusCollections = {
  accountability?: string | null
  archive_app_filter: boolean
  archive_field?: string | null
  archive_value?: string | null
  collapse: string
  collection: string
  color?: string | null
  display_template?: string | null
  group?: string | DirectusCollections | null
  hidden: boolean
  icon?: string | null
  item_duplication_fields?: unknown | null
  note?: string | null
  preview_url?: string | null
  singleton: boolean
  sort?: number | null
  sort_field?: string | null
  translations?: unknown | null
  unarchive_value?: string | null
  versioning: boolean
}

export type DirectusDashboards = {
  color?: string | null
  date_created?: string | null
  icon: string
  id: string
  name: string
  note?: string | null
  panels: any[] | DirectusPanels[]
  user_created?: string | DirectusUsers | null
}

export type DirectusExtensions = {
  enabled: boolean
  name: string
}

export type DirectusFields = {
  collection: string | DirectusCollections
  conditions?: unknown | null
  display?: string | null
  display_options?: unknown | null
  field: string
  group?: string | DirectusFields | null
  hidden: boolean
  id: number
  interface?: string | null
  note?: string | null
  options?: unknown | null
  readonly: boolean
  required?: boolean | null
  sort?: number | null
  special?: unknown | null
  translations?: unknown | null
  validation?: unknown | null
  validation_message?: string | null
  width?: string | null
}

export type DirectusFiles = {
  ads: any[] | Ads[]
  articles: any[] | Articles[]
  caption?: string | null
  charset?: string | null
  description?: string | null
  duration?: number | null
  embed?: string | null
  filename_disk?: string | null
  filename_download: string
  filesize?: number | null
  focal_point_x?: number | null
  focal_point_y?: number | null
  folder?: string | DirectusFolders | null
  height: number
  id: string
  issues: any[] | Issues[]
  location?: string | null
  metadata?: unknown | null
  modified_by?: string | DirectusUsers | null
  modified_on: string
  old_path?: string | null
  shortcode_key?: string | null
  storage: string
  tags?: unknown | null
  title?: string | null
  type?: string | null
  uploaded_by?: string | DirectusUsers | null
  uploaded_on: string
  width: number
}

export type DirectusFlows = {
  accountability?: string | null
  color?: string | null
  date_created?: string | null
  description?: string | null
  icon?: string | null
  id: string
  name: string
  operation?: string | DirectusOperations | null
  operations: any[] | DirectusOperations[]
  options?: unknown | null
  status: string
  trigger?: string | null
  user_created?: string | DirectusUsers | null
}

export type DirectusFolders = {
  id: string
  name: string
  parent?: string | DirectusFolders | null
}

export type DirectusMigrations = {
  name: string
  timestamp?: string | null
  version: string
}

export type DirectusNotifications = {
  collection?: string | null
  id: number
  item?: string | null
  message?: string | null
  recipient: string | DirectusUsers
  sender?: string | DirectusUsers | null
  status?: string | null
  subject: string
  timestamp?: string | null
}

export type DirectusOperations = {
  date_created?: string | null
  flow: string | DirectusFlows
  id: string
  key: string
  name?: string | null
  options?: unknown | null
  position_x: number
  position_y: number
  reject?: string | DirectusOperations | null
  resolve?: string | DirectusOperations | null
  type: string
  user_created?: string | DirectusUsers | null
}

export type DirectusPanels = {
  color?: string | null
  dashboard: string | DirectusDashboards
  date_created?: string | null
  height: number
  icon?: string | null
  id: string
  name?: string | null
  note?: string | null
  options?: unknown | null
  position_x: number
  position_y: number
  show_header: boolean
  type: string
  user_created?: string | DirectusUsers | null
  width: number
}

export type DirectusPermissions = {
  action: string
  collection: string
  fields?: unknown | null
  id: number
  permissions?: unknown | null
  presets?: unknown | null
  role?: string | DirectusRoles | null
  validation?: unknown | null
}

export type DirectusPresets = {
  bookmark?: string | null
  collection?: string | null
  color?: string | null
  filter?: unknown | null
  icon?: string | null
  id: number
  layout?: string | null
  layout_options?: unknown | null
  layout_query?: unknown | null
  refresh_interval?: number | null
  role?: string | DirectusRoles | null
  search?: string | null
  user?: string | DirectusUsers | null
}

export type DirectusRelations = {
  id: number
  junction_field?: string | null
  many_collection: string
  many_field: string
  one_allowed_collections?: unknown | null
  one_collection?: string | null
  one_collection_field?: string | null
  one_deselect_action: string
  one_field?: string | null
  sort_field?: string | null
}

export type DirectusRevisions = {
  activity: number | DirectusActivity
  collection: string
  data?: unknown | null
  delta?: unknown | null
  id: number
  item: string
  parent?: number | DirectusRevisions | null
  version?: string | DirectusVersions | null
}

export type DirectusRoles = {
  admin_access: boolean
  app_access: boolean
  description?: string | null
  enforce_tfa: boolean
  icon: string
  id: string
  ip_access?: unknown | null
  name: string
  users: any[] | DirectusUsers[]
}

export type DirectusSessions = {
  expires: string
  ip?: string | null
  origin?: string | null
  share?: string | DirectusShares | null
  token: string
  user?: string | DirectusUsers | null
  user_agent?: string | null
}

export type DirectusSettings = {
  auth_login_attempts?: number | null
  auth_password_policy?: string | null
  basemaps?: unknown | null
  custom_aspect_ratios?: unknown | null
  custom_css?: string | null
  default_appearance: string
  default_language: string
  default_theme_dark?: string | null
  default_theme_light?: string | null
  id: number
  mapbox_key?: string | null
  module_bar?: unknown | null
  project_color: string
  project_descriptor?: string | null
  project_logo?: string | DirectusFiles | null
  project_name: string
  project_url?: string | null
  public_background?: string | DirectusFiles | null
  public_favicon?: string | DirectusFiles | null
  public_foreground?: string | DirectusFiles | null
  public_note?: string | null
  storage_asset_presets?: unknown | null
  storage_asset_transform?: string | null
  storage_default_folder?: string | DirectusFolders | null
  theme_dark_overrides?: unknown | null
  theme_light_overrides?: unknown | null
  theming_group: string
}

export type DirectusShares = {
  collection: string | DirectusCollections
  date_created?: string | null
  date_end?: string | null
  date_start?: string | null
  id: string
  item: string
  max_uses?: number | null
  name?: string | null
  password?: string | null
  role?: string | DirectusRoles | null
  times_used?: number | null
  user_created?: string | DirectusUsers | null
}

export type DirectusTranslations = {
  id: string
  key: string
  language: string
  value: string
}

export type DirectusUsers = {
  appearance?: string | null
  auth_data?: unknown | null
  avatar?: string | DirectusFiles | null
  description?: string | null
  email?: string | null
  email_notifications?: boolean | null
  external_identifier?: string | null
  first_name?: string | null
  id: string
  language?: string | null
  last_access?: string | null
  last_name?: string | null
  last_page?: string | null
  location?: string | null
  password?: string | null
  provider: string
  role?: string | DirectusRoles | null
  status: string
  tags?: unknown | null
  tfa_secret?: string | null
  theme_dark?: string | null
  theme_dark_overrides?: unknown | null
  theme_light?: string | null
  theme_light_overrides?: unknown | null
  title?: string | null
  token?: string | null
}

export type DirectusVersions = {
  collection: string | DirectusCollections
  date_created?: string | null
  date_updated?: string | null
  hash?: string | null
  id: string
  item: string
  key: string
  name?: string | null
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type DirectusWebhooks = {
  actions: unknown
  collections: unknown
  data: boolean
  headers?: unknown | null
  id: number
  method: string
  name: string
  status: string
  url: string
}

export type Events = {
  body_text?: string | null
  date_created: string
  date_updated: string
  deck?: string | null
  end_date: string
  event_id?: string | null
  event_organizers: EventsOrganizations[]
  event_producers: EventsOrganizations1[]
  excerpt: string
  id: string
  people: EventsPeople[]
  poets: EventsPeople1[]
  section: Sections
  series?: string | null
  slug: string
  soldout: boolean
  sort?: number | null
  start_date: string
  status: string
  title: string
  title_tag?: string | null
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
  youtube_id?: string | null
}

export type EventsOrganizations = {
  events_id?: Events | null
  id: number
  organizations_id?: Organizations | null
}

export type EventsOrganizations1 = {
  events_id?: Events | null
  id: number
  organizations_id?: string | Organizations | null
}

export type EventsPeople = {
  events_id?: Events | null
  id: number
  people_id?: People | null
}

export type EventsPeople1 = {
  events_id?: Events | null
  id: number
  people_id?: People | null
  sort?: number | null
}

export type GlobalSettings = {
  preview_password: string
  current_issue: Issues
  date_created?: string | null
  date_updated?: string | null
  id: string
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
  navigation: any[] | GlobalSettingsNavigation[]
}

export type GlobalSettingsNavigation = {
  collection?: string | null
  global_settings_id?: string | GlobalSettings | null
  id: number
  item?: string | any | null
  sort?: number | null
}

export type Homepage = {
  collections: HomepageCollections[]
  date_created?: string | null
  date_updated?: string | null
  id: string
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type HomepageCollections = {
  collections_id?: Collections | null
  homepage_id?: Homepage | null
  id: number
  sort?: number | null
}

export type Issues = {
  articles: Articles[]
  cover_1?: DirectusFiles
  cover_2?: DirectusFiles
  cover_3?: DirectusFiles
  cover_4?: DirectusFiles
  cover_5?: DirectusFiles
  cover_6?: DirectusFiles
  current_issue: any[] | GlobalSettings[]
  date_created: string
  date_updated: string
  id: string
  month: number
  slug: string
  sort?: number | null
  special_issue: boolean | null
  old_id: number
  status: string
  title: string
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
  year: number
  issue_number: number
  summary: string
  credits: string
}

export type Organizations = {
  address?: string | null
  address2?: string | null
  city?: string | null
  country?: string | null
  date_created?: string | null
  date_updated?: string | null
  email?: string | null
  events: any[] | EventsOrganizations1[]
  id: string
  instagram?: string | null
  name: string
  phone?: string | null
  short_description?: string | null
  slug: string
  sort?: number | null
  state?: string | null
  status: string
  type: string
  url?: string | null
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type Pages = {
  date_created?: string | null
  date_updated?: string | null
  slug: string
  sort?: number | null
  status: string
  title: string
  body_text?: string | null
  map_key?: string | null
  images: any[] | ArticlesFiles[]
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type People = {
  id: string
  bio: string
  date_created: string
  date_updated: string
  email?: string | null
  display_name: string
  first_name?: string | null
  last_name?: string | null
  pronouns?: string | null
  slug: string
  sort?: number | null
  status?: string | null
  website?: string | null
  instagram?: string | null
  portrait?: DirectusFiles
  linkedin?: string | null
  twitter?: string | null
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type Sections = {
  articles: Articles[]
  date_created?: string | null
  date_updated?: string | null
  id: number
  name: string
  description?: string | null
  old_id: number
  featured: boolean
  slug: string
  sort?: number | null
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type Tributes = {
  id: string
  articles: Articles[]
  date_created?: string | null
  date_updated?: string | null
  title: string
  deck: string
  title_tag?: string | null
  slug: string
  blurb?: string | null
  summary?: string | null
  excerpt: string
  featured_image?: DirectusFiles
  published?: string | null
  sort?: number | null
  editors: TributesContributors[]
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type TributesContributors = {
  tributes_id?: Tributes | null
  contributors_id?: Contributors | null
  id: number
}

export type CustomDirectusTypes = {
  ads: Ads[]
  articles: Articles[]
  articles_contributors: ArticlesContributors[]
  articles_files: ArticlesFiles[]
  collections: Collections[]
  contributors: Contributors[]
  directus_activity: DirectusActivity[]
  directus_collections: DirectusCollections[]
  directus_dashboards: DirectusDashboards[]
  directus_extensions: DirectusExtensions[]
  directus_fields: DirectusFields[]
  directus_files: DirectusFiles[]
  directus_flows: DirectusFlows[]
  directus_folders: DirectusFolders[]
  directus_migrations: DirectusMigrations[]
  directus_notifications: DirectusNotifications[]
  directus_operations: DirectusOperations[]
  directus_panels: DirectusPanels[]
  directus_permissions: DirectusPermissions[]
  directus_presets: DirectusPresets[]
  directus_relations: DirectusRelations[]
  directus_revisions: DirectusRevisions[]
  directus_roles: DirectusRoles[]
  directus_sessions: DirectusSessions[]
  directus_settings: DirectusSettings
  directus_shares: DirectusShares[]
  directus_translations: DirectusTranslations[]
  directus_users: DirectusUsers[]
  directus_versions: DirectusVersions[]
  directus_webhooks: DirectusWebhooks[]
  events: Events[]
  events_organizations: EventsOrganizations[]
  events_organizations1: EventsOrganizations1[]
  events_people: EventsPeople[]
  events_people1: EventsPeople1[]
  global_settings: GlobalSettings
  homepage: Homepage
  homepage_collections: HomepageCollections[]
  global_settings_navigation: GlobalSettingsNavigation
  issues: Issues[]
  pages: Pages[]
  people: People[]
  sections: Sections[]
  tributes: Tributes[]
  redirects: Redirects[]
}
