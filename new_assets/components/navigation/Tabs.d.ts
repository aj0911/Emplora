export interface TabsProps {
  tabs?: (string | { value: string; label: string; count?: number | string })[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}
/** Underline tabs for views of one record (the employee profile) or one collection. Never for primary navigation. */
export declare function Tabs(props: TabsProps): JSX.Element;
