'use client'
import { useEffect, useState } from 'react'
import styles from './Footer.module.css'
import { contactLinks } from '@/data'
import { T_ContactLink } from '@/types'
import Icon from '@/components/ui/Icon'

export default function Footer() {
   const [showScrollTop, setShowScrollTop] = useState(false)

   useEffect(() => {
      const handleScroll = () => {
         setShowScrollTop(window.scrollY > 500)
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      })
   }

   return <footer className={styles.footer}>
      {/* Top Section */}
      <div className={styles.topSection}>
         <div className={styles.logoSection}>
            <div className={styles.logo}>Baha Zlitni</div>
            <p className={styles.tagline}>
               The power of logic and art, <strong>in one mind.</strong>
            </p>
         </div>

         <div className={styles.navSection}>
            <div className={styles.navColumn}>
               <h4 className={styles.navTitle}>Navigation</h4>
               <ul className={styles.navLinks}>
                  <li><a href="/#home">Home</a></li>
                  <li><a href="/#projects">Projects</a></li>
                  <li><a href="/#about">About</a></li>
                  <li><a href="/#contact">Contact</a></li>
               </ul>
            </div>

            <div className={styles.navColumn}>
               <h4 className={styles.navTitle}>Projects</h4>
               <ul className={styles.navLinks}>
                  <li><a href="#">Eldara</a></li>
                  <li><a href="#">Ciccle</a></li>
                  <li><a href="#">Up-Xel</a></li>
                  <li><a href="#">Optica</a></li>
               </ul>
            </div>

            <div className={styles.navColumn}>
               <h4 className={styles.navTitle}>Connect</h4>
               <ul className={styles.navLinks}>
                  {contactLinks.map((link: T_ContactLink) => (
                     <li key={link.name} className={styles.socialLink}>
                        <a
                           href={link.url}
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           <Icon name={link.icon} className={styles.icon} />
                           {link.name}
                        </a>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>

      {/* Divider */}
      <div className={styles.divider}></div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
         <p className={styles.copyright}>
            © {new Date().getFullYear()} Baha Zlitni. All rights reserved.
         </p>

         <ul className={styles.legalLinks}>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
         </ul>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
         <button
            className={styles.scrollTopButton}
            onClick={scrollToTop}
            aria-label="Scroll to top"
         >
            <Icon name="arrow-up"/>
            <div className={styles.buttonGlow}></div>
         </button>
      )}
   </footer>
   
}