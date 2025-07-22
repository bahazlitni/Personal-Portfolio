'use client'
import React, { useRef, useEffect } from 'react'

interface Props extends React.IframeHTMLAttributes<HTMLIFrameElement> {
   children?: React.ReactNode
}

export default function DemoFrame({ children, ...props }: Props) {
   const Navbar = useRef<HTMLElement | null>(null)
   const preventDefault = (e: Event) => e.preventDefault()

   const mouseEnter = () => {
      if(!window || !document) return
      if(Navbar.current) Navbar.current.style.display = 'none'
      document.documentElement.style.overflowY = 'hidden'
      window.addEventListener('wheel', preventDefault, { passive: false })
      window.addEventListener('touchmove', preventDefault, { passive: false })
      window.addEventListener('keydown', preventDefault, { passive: false })
   }

   const mouseLeave = () => {
      if(!window || !document) return
      if(Navbar.current) Navbar.current.style.display = 'flex'
      document.documentElement.style.overflowY = 'scroll'
      window.removeEventListener('wheel', preventDefault)
      window.removeEventListener('touchmove', preventDefault)
      window.removeEventListener('keydown', preventDefault)
   }

   useEffect(() => {
      if(document)
         Navbar.current = document.getElementById('__nav__')
      return mouseLeave
   }, [])

   return <iframe
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      className="demo-frame"
      tabIndex={0} // make iframe focusable
      {...props}
   >
      {children}
   </iframe>
}
