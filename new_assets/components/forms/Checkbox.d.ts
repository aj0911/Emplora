import type { InputHTMLAttributes } from 'react';
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Second line under the label. */
  description?: string;
  type?: 'checkbox' | 'radio';
}
/** Checkbox or radio with an optional second line. Used heavily by the role permission checklist. */
export declare function Checkbox(props: CheckboxProps): JSX.Element;
