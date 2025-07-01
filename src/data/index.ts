import { T_Project, T_Badge, T_ContactLink } from "@/types"

export const navbarLinks = [
   { href: "/#home", label: "Home" },
   { href: "/#projects", label: "Projects" },
   { href: "/#about", label: "About Me" },
   { href: "/#experience", label: "Experience" },
   { href: "/#contact", label: "Contact" },
]



const Python: T_Badge = {
   label: "Python",
   isImportant: true
}
const Cpp: T_Badge = {
   label: "C/C++",
   isImportant: true
}
const Js: T_Badge = {
   label: "Javascript",
   isImportant: true
}
const Ts: T_Badge = {
   label: "Typescript",
   isImportant: true
}
const NextJs: T_Badge = {
   label: "Next.js",
   isImportant: true
}
const GameDev: T_Badge = {
   label: "Game Dev",
   isImportant: true
}
const WebDev: T_Badge = {
   label: "Web Dev",
   isImportant: true
}
const WebDesign: T_Badge = {
   label: "Web Design",
   isImportant: true
}

const Pygame: T_Badge = {
   label: "Pygame",
   isImportant: false
}
const Platformer2D: T_Badge = {
   label: "Platformer 2D",
   isImportant: false
}
const Software: T_Badge = {
   label: "Software",
   isImportant: false
}
const Qt: T_Badge = {
   label: "Qt",
   isImportant: false
}
const Simulation: T_Badge = {
   label: "Simulation",
   isImportant: true
}
const Prototype: T_Badge = {
   label: "Prototype",
   isImportant: false
}


export const projects: T_Project[] = [
   {
      hasIcon: false,
      hasCover: false,
      title: "Up-Xel",
      description: "My first ever 2D platformer video game.",
      status: "completed",
      lastReleaseYear: 2019,
      lastVersion: "1.0",
      badges: [Pygame, Python, GameDev, Platformer2D],
      linkLabel: "up-xel",
      isBig: false,
      imagesAvailable: 0
   },
   {
      hasIcon: false,
      hasCover: false,
      title: "Ciccle",
      description: "A 2D rythm game inspired by OSU.",
      status: "completed",
      lastReleaseYear: 2020,
      lastVersion: "1.0",
      badges: [GameDev, Pygame, Python, Platformer2D],
      linkLabel: "ciccle",
      isBig: false,
      imagesAvailable: 0
   },
   {
      hasIcon: false,
      hasCover: false,
      title: "Optica",
      description: "A simulation software of geometric optics designed for educational purposes.",
      status: "completed",
      lastReleaseYear: 2023,
      lastVersion: "1.2",
      badges: [Simulation, Js],
      linkLabel: "optica",
      isBig: true,
      imagesAvailable: 0
   },
   {
      hasIcon: true,
      hasCover: false,
      title: "Eldara",
      description: "A simulation software of electric circuits.",
      detailedDescription: "A powerful and intuitive circuit simulator designed for both beginners and advanced users. Featuring a user-friendly interface and highly optimized algorithms, it enables near real-time simulation of both simple and complex circuits. Ideal for educational purposes and rapid circuit prototyping.",
      status: "in development",
      lastReleaseYear: 2025,
      lastVersion: "0.0.3 Beta",
      badges: [Simulation, Qt],
      linkLabel: "eldara",
      isBig: true,
      githubUrl: "https://github.com/bahazlitni/Eldara",
      imagesAvailable: 0
   },
   {
      hasIcon: false,
      hasCover: false,
      githubUrl: "",
      title: "Imperial Japan",
      description: "A prototype web page with the goal of learning more design ideas.",
      status: "completed",
      lastReleaseYear: 2024,
      lastVersion: "",
      badges: [Prototype, WebDev],
      linkLabel: "imperial-japan",
      isBig: false,
      imagesAvailable: 0
   }
]


export const experiences = [
   {
   title: "Engineering Intern",
   company: "M&C IT Consulting",
   date: "Jul – Aug 2024",
   description: "Completed a worker internship, gaining foundational experience in IT operations and consulting practices.",
   },
   {
   title: "Elobooster / Coach",
   company: "Gameboost.com",
   date: "Jun – Sep 2023",
   description: "Grandmaster-tier League of Legends player, provided high-ELO boosting and personalized coaching services.",
   },
   {
   title: "Poster Designer",
   company: "Almutaheda International Catering Services",
   date: "Jul 2022",
   description: "Created advertising materials and posters, applying graphic design principles to support event marketing.",
   },
   {
   title: "Private Tutor (NSI)",
   company: "Self-employed",
   date: "Dec 2022",
   description: "Taught computer science (NSI) to high school seniors, focusing on algorithms and programming logic.",
   },
   {
   title: "Competitive Programmer",
   company: "ICPC Tunisia",
   date: "Oct 2021",
   description: "Participated in the International Collegiate Programming Contest (ICPC), solving algorithmic problems under time pressure.",
   },
   {
   title: "Logo Designer",
   company: "Tunisian International KITEAM",
   date: "Oct 2020",
   description: "Designed official logos for team branding and visibility in international kiteboarding events.",
   },
]


export const contactLinks: T_ContactLink[] = [
   { url: "https://www.linkedin.com/in/baha-zlitni/", name: "LinkedIn", icon: "linkedin" },
   { url: "https://www.github.com/BahaZlitni", name: "Github", icon: "github" },
   { url: "mailto:bahazlitni989@gmail.com", name: "bahazlitni989@gmail.com", icon: "email" }
]