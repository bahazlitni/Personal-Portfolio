'use client'
import { motion } from "framer-motion"

export default function AnimH1({ children, ...props }: { children: React.ReactNode }) {
  return <motion.h1
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...props}
   >
      {children}
   </motion.h1>
}