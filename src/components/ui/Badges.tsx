import styles from "./Badges.module.css"
import { T_Size } from "@/types"

interface BadgeProps {
   children: React.ReactNode
   size?: T_Size
   className?: string
   isImportant?: boolean
}

interface InfoBadgeProps {
   info: string | number
   color: 'cyan' | 'magenta' | 'black' | 'white'
   variant: 'glow' | 'outline'
   className?: string
}

export function Badge({ children, size, className, isImportant }: BadgeProps) {
   return <span className={`${styles.badge} ${size+"-badge"} ${className || ''} ${isImportant ? styles.important : ''}`}>
      {children}
   </span>
}

export function FlareBadge({ children, size, className, isImportant }: BadgeProps) {
   return <span className={`flare ${styles.badge} ${size+"-badge"} ${className || ''} ${isImportant ? styles.important : ''}`}>
      {children}
   </span>
}

export function InfoBadge({ info, className, color, variant = 'glow' }: InfoBadgeProps) {
   return <span className={`S-badge ${styles.infoBadge} ${styles[variant]} ${styles[color]} ${className || ''}`}>
      {info}
   </span>
}