export type T_Size = "S" | "M" | "L" | "XL"
export type T_OS = 'windows' | 'mac' | 'linux' | 'android' | 'ios' | 'unknown'
export type T_ProjectStatus = "in development" | "completed"

export interface T_Downloads {
   windows?: string
   mac?: string
   android?: string
   linux?: string
   ios?: string
}

export interface T_CarouselImage {
   title?: string
   description?: string
   publicLink: string
   width: number
   height: number
   brightness: number
   year?: number
}

export interface T_Project {
   iconPublicLink?: string
   coverPublicLink?: string
   visitUrl?: string
   demoUrl?: string
   title: string
   description: string
   status: T_ProjectStatus
   lastReleaseYear: number
   lastVersion: string
   badges: string[]
   linkLabel: string
   isBig: boolean
   detailedDescription?: string
   githubUrl?: string
   downloads?: T_Downloads
   technologies?: string[]
   images: T_CarouselImage[]
}

export interface T_ContactLink {
   name: string,
   url: string,
   icon: string
}

