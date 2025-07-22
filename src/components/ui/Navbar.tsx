// components/ui/Navbar.jsx
'use client'
import { useState, useEffect } from 'react'
import styles from "./Navbar.module.css"
import { navbarLinks } from "@/data"
import Burger from "@/components/ui/Burger"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return <nav id="__nav__" className={styles.navbar}>
    <div className={styles.logo}>Baha Zlitni</div>
    <Burger className={styles.burger} onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />

    <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
      {navbarLinks.map(link => (
        <li
          key={link.href}
          onClick={() => setIsOpen(false)}
        >
          <a className="M-navLink navLink" href={link.href}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
}