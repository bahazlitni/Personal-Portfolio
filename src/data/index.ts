import { T_Project, T_ContactLink } from "@/types"

export const navbarLinks = [
   { href: "/#home", label: "Home" },
   { href: "/#projects", label: "Projects" },
   { href: "/#about", label: "About Me" },
   { href: "/#experience", label: "Experience" },
   { href: "/#contact", label: "Contact" },
]

// Badge strings
const Python = "Python"
const Cpp = "C/C++"
const Js = "Javascript"
const Ts = "Typescript"
const NextJs = "Next.js"
const GameDev = "Game Dev"
const WebDev = "Web Dev"
const WebDesign = "Web Design"
const Pygame = "Pygame"
const Platformer2D = "Platformer 2D"
const Software = "Software"
const Qt = "Qt"
const Simulation = "Simulation"
const Prototype = "Prototype"

export const projects: T_Project[] = [
   {
      iconPublicLink: "/projects/up-xel/icon.png",
      coverPublicLink: "/projects/up-xel/cover.png",
      githubUrl: "https://github.com/bahazlitni/Up-Xel",
      downloads: {windows: "/projects/up-xel/release/0.0.1.zip"},
      detailedDescription: "My first game ever. This game was a big educational journey. It is here where I started understand a lot about game loops, graphics, performance, file loading/reading, failure management, versioning... I also took time to give my artistic touch with some skins and designs that I did myself. Download the Zip file, extract it, run .exe, and there you go!",
      title: "Up-Xel",
      description: "My first ever 2D platformer video game.",
      status: "completed",
      lastReleaseYear: 2019,
      lastVersion: "0.0.1",
      badges: [Pygame, Python, GameDev, Platformer2D],
      linkLabel: "up-xel",
      isBig: false,
      images: []
   },
   {
      iconPublicLink: "/projects/ciccle/icon.png",
      coverPublicLink: "/projects/ciccle/cover.png",
      title: "Ciccle",
      description: "A 2D rythm game inspired by OSU.",
      status: "completed",
      lastReleaseYear: 2020,
      lastVersion: "1.0",
      badges: [GameDev, Pygame, Python, Platformer2D],
      linkLabel: "ciccle",
      isBig: false,
      images: []
   },
   {
      iconPublicLink: "/projects/optica/icon.png",
      coverPublicLink: "/projects/optica/cover.png",
      downloads: {windows: "/projects/optica/release/0.0.3.zip"},
      title: "Optica",
      description: "A simulation software of geometric optics designed for educational purposes.",
      detailedDescription: "A software designed for educational purposes to help professors or students visually represent a geometric optics scene with the useful elements: lenses, spherical mirrors, walls, plane mirrors. They can adjust, stylize, drag/move and iteract with those objects. This project was too much fun to make and I learnt here a lot about software design, UI/UX, Command Patterns, Zoom, Drag, and other mechanics that you can discover in the app! The app is a plain html-css-js project, no packages needed or weird installation steps, Plug-And-Play!",
      status: "completed",
      lastReleaseYear: 2023,
      lastVersion: "0.0.3",
      badges: [Simulation, Js],
      linkLabel: "optica",
      isBig: true,
      images: [
         {
            title: "Optica",
            description: "A screenshot of Optica software.",
            publicLink: "/projects/optica/image-0.png",
            width: 1600,
            height: 900,
            brightness: 0.2
         },
         {
            publicLink: "/projects/optica/image-1.png",
            width: 1600,
            height: 900,
            brightness: 0.2
         },
         {
            publicLink: "/projects/optica/image-2.png",
            width: 1600,
            height: 900,
            brightness: 0.2
         }
      ],
      demoUrl: "/demos/optica/0.0.3/main.html"
   },
   {
      iconPublicLink: "/projects/eldara/icon.png",
      coverPublicLink: "/projects/eldara/cover.png",
      title: "Eldara",
      downloads: {windows: "/projects/eldara/release/0.0.3.zip"},
      description: "A simulation software of electric circuits.",
      detailedDescription: "A powerful and intuitive circuit simulator designed for both beginners and advanced users. Featuring a user-friendly interface and highly optimized algorithms, it enables near real-time simulation of both simple and complex circuits. Ideal for educational purposes and rapid circuit prototyping.",
      status: "in development",
      lastReleaseYear: 2025,
      lastVersion: "0.0.3 Beta",
      badges: [Simulation, Qt],
      linkLabel: "eldara",
      isBig: true,
      githubUrl: "https://github.com/bahazlitni/Eldara",
      images: [
         {
            title: "Eldara Circuit Simulation",
            description: "A screenshot of the Eldara circuit simulation software.",
            publicLink: "/projects/eldara/image-0.png",
            width: 1600,
            height: 854,
            brightness: 0.2
         },
         {
            publicLink: "/projects/eldara/image-1.png",
            width: 1600,
            height: 854,
            brightness: 0.2
         },
         {
            publicLink: "/projects/eldara/image-2.png",
            width: 1600,
            height: 854,
            brightness: 0.2
         },
         {
            publicLink: "/projects/eldara/image-3.png",
            width: 1600,
            height: 854,
            brightness: 0.2
         },
         {
            publicLink: "/projects/eldara/image-4.png",
            width: 1600,
            height: 854,
            brightness: 0.2
         },
         {
            publicLink: "/projects/eldara/image-5.png",
            width: 1600,
            height: 854,
            brightness: 0.2
         }
      ]
   },
   {
      iconPublicLink: "/projects/imperial-japan/icon.png",
      coverPublicLink: "/projects/imperial-japan/cover.png",
      visitUrl: "https://imperial-japan-55qo.vercel.app/",
      githubUrl: "https://github.com/bahazlitni/ImperialJapan",
      title: "Imperial Japan",
      description: "A prototype web page with the goal of learning more design ideas.",
      status: "completed",
      lastReleaseYear: 2024,
      lastVersion: "",
      badges: [Prototype, WebDev],
      linkLabel: "imperial-japan",
      isBig: false,
      images: []
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
   { url: "https://www.instagram.com/baha_zlitni", name: "Instagram", icon: "instagram" },
   { url: "https://www.linkedin.com/in/baha-zlitni", name: "LinkedIn", icon: "linkedin" },
   { url: "https://www.github.com/BahaZlitni", name: "Github", icon: "github" },
   { url: "mailto:bahazlitni989@gmail.com", name: "bahazlitni989@gmail.com", icon: "email" }
]
