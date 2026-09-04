import type { ReactNode, ButtonHTMLAttributes } from 'react';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Primary is a solid cobalt fill and there is at most one per view. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'quiet-danger';
  /** sm inside table rows and toolbars, md everywhere, lg on auth and wizard footers. */
  size?: 'sm' | 'md' | 'lg';
  /** Leading 16px Phosphor icon. Omitting children makes it a square icon button. */
  icon?: ReactNode;
  iconRight?: ReactNode;
  block?: boolean;
  children?: ReactNode;
}
export interface ButtonGroupProps { children?: ReactNode; className?: string }
/** An action. */
export declare function Button(props: ButtonProps): JSX.Element;
/** Joins buttons into one segmented action bar. */
export declare function ButtonGroup(props: ButtonGroupProps): JSX.Element;
