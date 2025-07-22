'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from "./Carousel.module.css"
import { T_CarouselImage } from "@/types"
import Image from "next/image"
import Icon from "@/components/ui/Icon"

interface CarouselProps {
   images: T_CarouselImage[]
   autoPlay?: boolean
   interval?: number
   className?: string
}

export default function Carousel({ images, autoPlay = true, interval = 5000, className, ...props }: CarouselProps) {
   const [currentIndex, setCurrentIndex] = useState(0)
   const [isFullScreen, setIsFullScreen] = useState(false)
   const [isHovering, setIsHovering] = useState(false)
   const [direction, setDirection] = useState(0)
   const [controlsVisible, setControlsVisible] = useState(false)
   const isHoveringControls = useRef(false)
   const timerRef = useRef<NodeJS.Timeout | null>(null)
   const carouselRef = useRef<HTMLDivElement>(null)
   const controlsRef = useRef<HTMLDivElement>(null)
   const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null)

   // Handle image navigation
   const goToSlide = useCallback((index: number) => {
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)
   }, [currentIndex])

   const goNext = useCallback(() => {
      setDirection(1)
      setCurrentIndex(prev => (prev + 1) % images.length)
   }, [images.length])

   const goPrev = useCallback(() => {
      setDirection(-1)
      setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
   }, [images.length])

   // Auto-play functionality
   useEffect(() => {
      if (!autoPlay || images.length <= 1 || isHovering || isFullScreen) return

      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(goNext, interval)

      return () => {
         if (timerRef.current) clearTimeout(timerRef.current)
      }
   }, [autoPlay, images.length, isHovering, isFullScreen, interval, goNext])


   // Track mouse movement exclusively on the carousel to show/hide controls
   useEffect(() => {

      const handleMouseMove = (e: MouseEvent) => {
         if (!carouselRef.current) return
         setControlsVisible(true)            
         if (inactivityTimeoutRef.current)
            clearTimeout(inactivityTimeoutRef.current)
         if(!isHoveringControls.current)
            inactivityTimeoutRef.current = setTimeout(() => setControlsVisible(false), 2000)
      }

      const carouselEl = carouselRef.current
      if (carouselEl) {
         carouselEl.addEventListener('mousemove', handleMouseMove)
      }

      return () => {
         if (carouselEl) {
            carouselEl.removeEventListener('mousemove', handleMouseMove)
         }
         if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current)
      }
   }, [])


   // Handle full screen toggle
   const toggleFullScreen = () => {
      if (!carouselRef.current) return

      if (!document.fullscreenElement) {
         carouselRef.current.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`)
         })
         setIsFullScreen(true)
      } else {
         document.exitFullscreen()
         setIsFullScreen(false)
      }
   }

   // Handle full screen change events
   useEffect(() => {
      const handleFullScreenChange = () => {
         setIsFullScreen(!!document.fullscreenElement)
      }

      document.addEventListener('fullscreenchange', handleFullScreenChange)
      return () => document.removeEventListener('fullscreenchange', handleFullScreenChange)
   }, [])

   // Handle keyboard navigation
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (!isFullScreen) return

         switch (e.key) {
            case 'ArrowLeft':
               goPrev()
               break
            case 'ArrowRight':
               goNext()
               break
            case 'Escape':
               document.exitFullscreen()
               setIsFullScreen(false)
               break
            default:
               break
         }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
   }, [isFullScreen, goPrev, goNext])

   // Handle swipe gestures
   const [touchStart, setTouchStart] = useState(0)
   const [touchEnd, setTouchEnd] = useState(0)

   const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientX)
   }

   const handleTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX)
   }

   const handleTouchEnd = () => {
      if (touchStart - touchEnd > 50) {
         goNext()
      } else if (touchEnd - touchStart > 50) {
         goPrev()
      }
   }

   // Reset when images change
   useEffect(() => {
      setCurrentIndex(0)
      setDirection(0)
   }, [images])

   if (images.length === 0) {
      return (
         <div className={styles.carousel} ref={carouselRef} {...props}>
            <div className={styles.emptyState}>
               <Icon name="nothing" size={48} />
               <p>No images to display</p>
            </div>
         </div>
      )
   }

   const currentImage = images[currentIndex]

   return <div className={`${styles.carousel} ${isFullScreen ? styles.fullScreen : ''} ${className || ''}`}
      ref={carouselRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      {...props}
   >
      <AnimatePresence initial={false} custom={direction}>
         <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={styles.imageWrapper}
         >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
               <Image
                  onClick={toggleFullScreen}
                  src={currentImage.publicLink}
                  alt={currentImage.title || 'Carousel image'}
                  width={currentImage.width}
                  height={currentImage.height}
                  className={styles.image}
                  quality={100}
                  priority
               />
            </div>
         </motion.div>
      </AnimatePresence>

      {/* Info overlay - only shown when not fullscreen or when hovering */}
      <AnimatePresence>
         <motion.div
            className={styles.infoOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
         >
            {currentImage.title && (
               <h3 className={styles.title}>{currentImage.title}</h3>
            )}

            {currentImage.description && !isFullScreen && (
               <p className={styles.description}>{currentImage.description}</p>
            )}

            {currentImage.year && (
               <span className={styles.year}>{currentImage.year}</span>
            )}
         </motion.div>
      </AnimatePresence>

      {/* Navigation controls */}
      <AnimatePresence>
         {(isHovering && controlsVisible) && (
            <motion.div
            ref={controlsRef}
            className={`${styles.controls} ${isHovering ? styles.controlsVisible : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => isHoveringControls.current = true}
            onMouseLeave={() => isHoveringControls.current = false}
         >
            <button
               onClick={goPrev}
               className={styles.controlButton}
               aria-label="Previous image"
            >
               <Icon name="chevron-left" />
               </button>

               <div className={styles.dotsContainer}>
               {images.map((_, index) => (
                  <button
                     key={index}
                     className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                     onClick={() => goToSlide(index)}
                     aria-label={`Go to slide ${index + 1}`}
                  />
               ))}
               </div>

               <button
               onClick={goNext}
               className={styles.controlButton}
               aria-label="Next image"
               >
               <Icon name="chevron-right" />
               </button>
            </motion.div>
         )}
      </AnimatePresence>
   </div>

}