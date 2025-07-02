'use client'
import { motion } from "framer-motion"
import { T_Size } from "@/types"

interface Props {
   children?: React.ReactNode;
   className?: string;
   href?: string;
   color: "cyan" | "magenta"
   size: T_Size
}

export default function FlaredLink({ color, size, children, className, href, ...props }: Props) {
   return (
      <motion.a
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         className={`${size}-button ${color}-flare " + ${className || ''}`}
         {...props}
      >
         {children}
      </motion.a>
   );
}