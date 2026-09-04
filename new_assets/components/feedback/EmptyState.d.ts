import type { ReactNode } from 'react';
export interface EmptyStateProps { title: string; children?: ReactNode; action?: ReactNode; className?: string }
/** What a collection shows before it has anything in it. Always names the next action —
 *  an empty employee list is the most common first screen in this product. */
export declare function EmptyState(props: EmptyStateProps): JSX.Element;
