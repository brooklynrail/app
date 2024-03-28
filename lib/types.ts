/* eslint max-lines: 0 */
export type Ads = {
  ad_type: string
  ad_url?: string | null
  date_created?: string | null
  date_updated?: string | null
  end_date: string
  id: number
  tile_image?: DirectusFiles | null
  banner_image?: DirectusFiles | null
  banner_image_mobile?: DirectusFiles | null
  old_id?: number | null
  sort?: number | null
  start_date: string
  status: string
  title: string
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type Articles = {
  body: string
  body_code?: string | null
  body_text?: string | null
  body_type?: string | null
  contributors: Contributors | ArticlesContributors[]
  date_created: string
  date_updated: string
  deck?: string | null
  excerpt: string
  featured: boolean
  featured_image?: DirectusFiles
  header_type?: string | null
  images: ArticlesFiles[]
  Images: string
  in_print?: boolean | null
  issues: ArticlesIssues[]
  kicker?: string | null
  old_id?: number | null
  promo_banner?: DirectusFiles
  promo_thumb?: DirectusFiles
  sections: ArticlesSections[]
  slideshow_image?: DirectusFiles | null
  slug: string
  sort?: number | null
  status: string
  title: string
  title_tag?: string
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type ArticlesContributors = {
  articles_slug?: string | Articles | null
  contributors_id?: string | Contributors | null
  id: number
}

export type ArticlesFiles = {
  articles_slug?: string | Articles | null
  directus_files_id?: string | DirectusFiles | null
  id: number
}

export type ArticlesIssues = {
  articles_slug?: string | Articles | null
  id: number
  issues_id?: number | Issues | null
}

export type ArticlesSections = {
  articles_slug?: string | Articles | null
  id: number
  sections_id?: number | Sections | null
}

export type Contributors = {
  articles: ArticlesContributors[]
  bio?: string | null
  date_created?: string | null
  date_updated?: string | null
  email?: string | null
  first_name?: string | null
  hidden?: boolean | null
  id: string
  last_name?: string | null
  old_id?: number | null
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
  revisions: DirectusRevisions[]
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
  panels: DirectusPanels[]
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
  ads: Ads[]
  articles: Articles[]
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
  height?: number | null
  id: string
  issues: Issues[]
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
  width?: number | null
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
  operations: DirectusOperations[]
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
  users: DirectusUsers[]
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

export type GlobalSettings = {
  current_issue: string | Issues
  date_created?: string | null
  date_updated?: string | null
  id: string
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type Issues = {
  articles: Articles | ArticlesIssues[]
  cover_1?: DirectusFiles
  cover_2?: DirectusFiles
  cover_3?: DirectusFiles
  cover_4?: DirectusFiles
  cover_5?: DirectusFiles
  cover_6?: DirectusFiles
  current_issue: GlobalSettings[]
  date_created?: string | null
  date_updated?: string | null
  id: number
  month: number
  slug: string
  sort?: number | null
  special_issue?: boolean | null
  status: string
  title: string
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
  year: number
  issue_number: number
}

export type Pages = {
  body: string
  body_code?: string | null
  body_text?: unknown | null
  date_created?: string | null
  date_updated?: string | null
  slug: string
  sort?: number | null
  status: string
  title: string
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type Sections = {
  articles: ArticlesSections[]
  date_created?: string | null
  date_updated?: string | null
  id: number
  name: string
  old_id?: number | null
  slug: string
  sort?: number | null
  user_created?: string | DirectusUsers | null
  user_updated?: string | DirectusUsers | null
}

export type CustomDirectusTypes = {
  ads: Ads[]
  articles: Articles[]
  articles_contributors: ArticlesContributors[]
  articles_files: ArticlesFiles[]
  articles_issues: ArticlesIssues[]
  articles_sections: ArticlesSections[]
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
  global_settings: GlobalSettings
  issues: Issues[]
  pages: Pages[]
  sections: Sections[]
}
