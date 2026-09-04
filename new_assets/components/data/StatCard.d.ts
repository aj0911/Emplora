import type { ReactNode } from 'react';
export interface StatCardProps {
  label: string;
  value: ReactNode;
  /** Change vs. the previous cycle, e.g. "3.2% vs Jul". */
  delta?: string;
  direction?: 'up' | 'down' | 'flat';
  hint?: string;
  className?: string;
}
/** One number with its label. Four across is the dashboard maximum; the value is always tabular mono. */
export declare function StatCard(props: StatCardProps): JSX.Element;
