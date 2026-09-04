import type { ReactNode } from 'react';
export interface ModalProps {
  open?: boolean;
  title?: ReactNode;
  children?: ReactNode;
  /** Footer actions, right-aligned; the confirming action is last and carries the verb. */
  actions?: ReactNode;
  onClose?: () => void;
  width?: number;
  className?: string;
}
/** A focused task over the current page — invite a user, confirm a destructive change.
 *  Anything longer than about six fields belongs on its own page instead. */
export declare function Modal(props: ModalProps): JSX.Element;
