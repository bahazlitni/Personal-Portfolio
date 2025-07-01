export interface T_Badge  {
   isImportant: boolean,
   label: string,
}

export type T_ProjectStatus = "in development" | "completed"

export interface T_Project {
   icon: string,
   title: string,
   description: string,
   status: T_ProjectStatus,
   lastReleaseYear: number,
   version: string,
   badges: T_Badge[],
   link: string,
   isBig: boolean,
   githubUrl?: string,
   liveUrl?: string,
   technologies?: string[]
}

export interface T_ContactLink {
   name: string,
   url: string,
   icon: string
}