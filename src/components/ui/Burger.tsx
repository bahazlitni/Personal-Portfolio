'use client'
import styles from "./Burger.module.css"
import React from "react"

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
   className?: string
   isOpen?: boolean
}

export default function Burger({className, isOpen, ...props}: Props){
   return <button className={`${styles.burger} ${isOpen? styles.open : ''} ${className || ''}`} {...props}>
      <span className={styles.bar}/>
      <span className={styles.bar}/>
      <span className={styles.bar}/>
   </button>
}
