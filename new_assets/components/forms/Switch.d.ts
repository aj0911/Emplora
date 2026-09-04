import type { InputHTMLAttributes } from 'react';
export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}
/** A binary setting that applies immediately (PF applicable, ESIC applicable, carry-forward).
 *  For choices that only take effect on save, use Checkbox. */
export declare function Switch(props: SwitchProps): JSX.Element;
