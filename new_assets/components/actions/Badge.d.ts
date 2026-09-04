import type { ReactNode } from 'react';
export interface BadgeProps {
  /** Tones are semantic, never decorative. */
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  /** Leading status dot. On for states, off for taxonomy labels. */
  dot?: boolean;
  square?: boolean;
  children?: ReactNode;
  className?: string;
}
/** A small tinted label for taxonomy — department, plan, role type. */
export declare function Badge(props: BadgeProps): JSX.Element;
