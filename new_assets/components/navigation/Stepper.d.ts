export interface StepperProps {
  steps?: (string | { label: string })[];
  /** Zero-based index of the current step. */
  current?: number;
  className?: string;
}
/** Progress through a linear flow — registration (5 steps) and the payroll run (3 steps).
 *  Completed steps go green, the current step cobalt, later steps stay outlined. */
export declare function Stepper(props: StepperProps): JSX.Element;
