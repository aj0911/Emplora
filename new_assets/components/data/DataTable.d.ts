import type { ReactNode } from 'react';
export interface Column {
  key: string;
  header: ReactNode;
  /** 'right' turns the column tabular mono and right-aligns it — use for every amount and count. */
  align?: 'left' | 'right';
  width?: number | string;
  sortable?: boolean;
  render?: (row: any) => ReactNode;
  sortValue?: (row: any) => any;
}
export interface DataTableProps {
  columns: Column[];
  rows: any[];
  selectable?: boolean;
  rowKey?: string;
  /** Left side of the toolbar — search, filters, actions. Replaced by the selection count when rows are picked. */
  toolbar?: ReactNode;
  footer?: ReactNode;
  /** Map of column key to rendered total; drawn as a pinned summary row. */
  totalRow?: Record<string, ReactNode>;
  emptyLabel?: string;
  onRowClick?: (row: any) => void;
  className?: string;
}
/** The workhorse of the product: sticky header, 44px rows, row selection with a count toolbar,
 *  client sort, and an optional totals row for payroll review. */
export declare function DataTable(props: DataTableProps): JSX.Element;
