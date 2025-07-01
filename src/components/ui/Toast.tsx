import { motion, AnimatePresence } from 'framer-motion'
import styles from './Toast.module.css'
import { useEffect } from 'react'

interface T_ToastProps {
   message: string
   type?: 'success' | 'error' | 'info'
   onClose: () => void
   duration?: number
}

export default function Toast({message, type = 'info', onClose, duration = 3000 }: T_ToastProps) {
   useEffect(() => {
      const timer = setTimeout(() => {
         onClose()
      }, duration)
      
      return () => clearTimeout(timer)
   }, [duration, onClose])
   
   const typeStyles = {
      success: styles.success,
      error: styles.error,
      info: styles.info,
   }
   
   return <AnimatePresence>
      <motion.div
         initial={{ y: 50, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         exit={{ y: -50, opacity: 0 }}
         transition={{ type: 'spring', damping: 25 }}
         className={`${styles.toast} ${typeStyles[type]}`}
      >
         <div className={styles.toastContent}>
            {message}
         </div>
      </motion.div>
   </AnimatePresence>
}