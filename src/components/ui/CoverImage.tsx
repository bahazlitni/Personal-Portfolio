'use client'
import styles from "./CoverImage.module.css"
import React from "react"
import Image from "next/image"

interface Props extends React.HTMLAttributes<HTMLImageElement> {
   className?: string
   width: number
   height: number
   src: string
   brightness?: number
}

export default function CoverImage({brightness, src, width, height, className, ...props}: Props){
   return <div className={styles.coverWrapper}>
      <Image style={brightness ? {filter: `brightness(${brightness}%)`} : {}} className={`${styles.cover} ${className || ''}`} 
         alt="Cover Image" 
         width={width} 
         height={height} 
         src={src}
         {...props}
      />
      <div className={styles.coverVeil} />
   </div>
}