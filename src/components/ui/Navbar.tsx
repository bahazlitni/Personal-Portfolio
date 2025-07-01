// components/ui/Navbar.jsx
'use client'
import { useState, useEffect } from 'react'
import styles from "./Navbar.module.css"
import { navbarLinks } from "@/data"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
      const handleScroll = () => {
         let closestSectionId = ''
         let minDistance = Infinity
         const middleY = window.innerHeight / 2

         for (const link of navbarLinks) {
            const id = link.href.substring(1)
            const section = document.getElementById(id)
            if (!section) continue
            const rect = section.getBoundingClientRect()
            const sectionMiddle = rect.top + rect.height / 2
            const distance = Math.abs(sectionMiddle - middleY)
            if (distance < minDistance) {
               minDistance = distance
               closestSectionId = id
            }
         }
         setActiveLink(closestSectionId)
      }

      window.addEventListener('scroll', handleScroll)
      handleScroll()

      return () => window.removeEventListener('scroll', handleScroll)

   }, [])

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Baha Zlitni</div>

      <div
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>

      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
        {navbarLinks.map(link => (
          <li
            key={link.href}
            onClick={() => setIsOpen(false)}
            // Add active class if the link's ID matches the activeLink state
            className={activeLink === link.href.substring(1) ? styles.active : ''}
         >
            <a href={link.href}>
              <span className={styles.linkText}>{link.label}</span>
              <span className={styles.linkGlow}></span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}