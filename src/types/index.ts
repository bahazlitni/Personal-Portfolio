export interface T_Badge  {
   isImportant: boolean,
   label: string,
}

export type T_ProjectStatus = "in development" | "completed"

export interface T_Project {
   hasIcon: boolean
   hasCover: boolean
   title: string
   description: string
   status: T_ProjectStatus
   lastReleaseYear: number
   lastVersion: string
   badges: T_Badge[]
   linkLabel: string
   isBig: boolean
   detailedDescription?: string
   githubUrl?: string
   liveUrl?: string
   technologies?: string[]
   imagesAvailable: number
}

export interface T_ContactLink {
   name: string,
   url: string,
   icon: string
}

export interface T_CarouselImage {
   title: string
   description?: string
   link: string
   width: number
   height: number
   brightness: number
}