export interface MoneyProps {
  value: number;
  /** Two decimals. Payslips and deduction lines have them; dashboards and totals do not. */
  paise?: boolean;
  symbol?: boolean;
  tone?: 'default' | 'positive' | 'negative';
  className?: string;
}
export interface FormatMoneyOptions { paise?: boolean; symbol?: boolean }
/** Every rupee amount goes through this: Indian digit grouping (12,34,567), tabular mono,
 *  right-aligned in tables so decimal points stack. */
export declare function Money(props: MoneyProps): JSX.Element;
export declare function formatMoney(value: number, opts?: FormatMoneyOptions): string;
