import type { SelectHTMLAttributes } from 'react';
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string; hint?: string; error?: string; required?: boolean;
  /** Plain strings or {value,label}. Role pickers pass the org's live role list. */
  options?: (string | { value: string; label: string })[];
  placeholder?: string;
}
/** A native single-select, for lists of six or more options. */
export declare function Select(props: SelectProps): JSX.Element;
