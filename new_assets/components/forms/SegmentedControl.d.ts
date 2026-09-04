export interface SegmentedControlProps {
  options?: (string | { value: string; label: string })[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}
/** Two to four mutually exclusive options — a form control (Calendar days / Working days) or a view switch. */
export declare function SegmentedControl(props: SegmentedControlProps): JSX.Element;
