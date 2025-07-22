import React from 'react'
import { MdEmail, MdSend, MdOutlineQuestionMark, MdOutlineMaximize, MdOutlineMinimize } from 'react-icons/md'
import { FaFileDownload, FaLinkedin, FaWindows, FaGithub, FaArrowUp, FaChevronRight, FaChevronLeft, FaInstagram, FaApple, FaLinux, FaAndroid, FaExternalLinkAlt } from 'react-icons/fa'

type IconProps = { name: string } & React.ComponentProps<typeof MdEmail>

export default function Icon({ name, ...props }: IconProps) {
   switch (name) {
      case "instagram": return <FaInstagram {...props} />
      case "email"    : return <MdEmail {...props} />
      case "linkedin" : return <FaLinkedin {...props} />
      case "github"   : return <FaGithub {...props} />
      case "arrow-up" : return <FaArrowUp {...props} />
      case "send"     : return <MdSend {...props} />
      case "chevron-right" : return <FaChevronRight {...props} />
      case "chevron-left"  : return <FaChevronLeft {...props} />
      case "maximize"      : return <MdOutlineMaximize {...props} />
      case "minimize"      : return <MdOutlineMinimize {...props} />
      case "windows"       : return <FaWindows {...props} />
      case "mac-os"        : 
      case "ios"           : return <FaApple {...props} />
      case "linux"         : return <FaLinux {...props} />
      case "android"       : return <FaAndroid {...props}/>
      case "external-link" : return <FaExternalLinkAlt {...props} />
      case "download"      : return <FaFileDownload {...props} />
      default: return <MdOutlineQuestionMark {...props} />
   }
}