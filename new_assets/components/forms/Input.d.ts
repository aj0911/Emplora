import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** Replaces the hint and turns the border red. */
  error?: string;
  required?: boolean;
  /** Static prefix inside the border, e.g. the rupee sign or a code mask. */
  prefix?: string;
  /** Right-aligned tabular mono — use for every currency amount. */
  money?: boolean;
}
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string; hint?: string; error?: string; required?: boolean;
}
/** A labelled text field: label above, one line of hint or error below — never both. */
export declare function Input(props: InputProps): JSX.Element;
/** Multi-line text for override reasons and role descriptions. */
export declare function Textarea(props: TextareaProps): JSX.Element;
