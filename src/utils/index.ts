import { T_OS, T_Downloads } from "@/types"

export function detectOS(): T_OS {
   const userAgent = typeof window !== "undefined" ? window.navigator.userAgent : ""
   if (/windows phone/i.test(userAgent)) return 'windows'
   if (/win/i.test(userAgent)) return 'windows'
   if (/android/i.test(userAgent)) return 'android'
   if (/iPad|iPhone|iPod/.test(userAgent)) return 'ios'
   if (/mac/i.test(userAgent)) return 'mac'
   if (/linux/i.test(userAgent)) return 'linux'
   return 'unknown'
}

export function downloadURL(downloads: T_Downloads | undefined, os: T_OS): string {
   if(!downloads) return ""
   switch(os){
      case 'windows':
         return downloads.windows || ""
      case 'mac':
         return downloads.mac || ""
      case 'linux':
         return downloads.linux || ""
      case 'android':
         return downloads.android || ""
      case 'ios':
         return downloads.ios || ""
      default:
         return ""
   }
}