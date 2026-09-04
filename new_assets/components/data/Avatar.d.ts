export interface AvatarProps { name?: string; src?: string; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }
export interface PersonCellProps { name?: string; /** One line of secondary identity — ID, department. */ meta?: string; src?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }
export interface AvatarStackProps { people?: (string | { name: string; src?: string })[]; max?: number }
/** Initials-first avatar; photographs are optional and never required for a record to look complete. */
export declare function Avatar(props: AvatarProps): JSX.Element;
/** The canonical employee table cell. */
export declare function PersonCell(props: PersonCellProps): JSX.Element;
/** Overlapping avatars with a +N overflow chip. */
export declare function AvatarStack(props: AvatarStackProps): JSX.Element;
