import type { ReactNode } from 'react';
export interface AlertProps {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}
/** An inline message tied to the block it sits in. Warning for statutory deadlines and missing data,
 *  danger for a failed run, info for consequences ("this changes access for 14 people immediately"). */
export declare function Alert(props: AlertProps): JSX.Element;
