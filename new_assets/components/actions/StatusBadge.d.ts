export interface StatusBadgeProps {
  status: 'draft' | 'processing' | 'pending' | 'approved' | 'paid' | 'failed' | 'generated' | 'sent'
    | 'active' | 'notice' | 'exited' | 'verified' | 'unverified' | 'locked' | 'system' | 'custom'
    | 'trial' | 'suspended' | 'overdue' | 'rejected';
  /** Overrides the canonical label. Use sparingly. */
  label?: string;
  className?: string;
}
/** The product's shared vocabulary of states — payroll cycle, payslip delivery, employment,
 *  statutory verification, tenancy, roles. Use this instead of hand-tinting a Badge. */
export declare function StatusBadge(props: StatusBadgeProps): JSX.Element;
export declare const STATUSES: string[];
