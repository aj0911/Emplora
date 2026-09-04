import type { ReactNode } from 'react';
export interface NavItem { label: string; href?: string; icon?: ReactNode; count?: number | string }
export interface NavGroup { label?: string; items: NavItem[] }
export interface AppShellProps {
  brand?: string;
  /** Second line under the brand — the tenant's name. Multi-tenancy is always visible. */
  org?: string;
  nav?: NavGroup[];
  /** Label of the active nav item. */
  active?: string;
  topbar?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
}
export interface PageHeaderProps { title: ReactNode; sub?: ReactNode; actions?: ReactNode; tabs?: ReactNode }
/** The org-scoped application frame: 236px sidebar with grouped nav, sticky 52px topbar, content well.
 *  Nav groups are role-filtered by the consuming app — the shell renders whatever it is given. */
export declare function AppShell(props: AppShellProps): JSX.Element;
/** Page title, subtitle, right-aligned actions, and an optional tab row. */
export declare function PageHeader(props: PageHeaderProps): JSX.Element;
