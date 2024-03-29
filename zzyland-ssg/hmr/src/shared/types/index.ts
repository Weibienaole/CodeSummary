import { UserConfig as ViteConfiguration } from 'vite'

export type NavItemWithLink = {
  title: ''
  link: ''
}

export interface Sidebar {
  [path: string]: SidebarGroup[]
}

export interface SidebarGroup {
  text: string
  items: SidebarItem[]
}

export type SidebarItem = {
  text: string
  link?: string
  items?: SidebarItem[]
}

export interface Footer {
  message?: string
  copyright?: string
}

export interface ThemeConfig {
  nav?: NavItemWithLink[]
  sidebar?: Sidebar
  footer?: Footer
}

export interface UserConfig {
  title?: string
  description?: string
  themeConfig?: ThemeConfig
  vite?: ViteConfiguration
}

export interface SiteConfig {
  root: string
  configPath: string
  siteData: UserConfig
}
