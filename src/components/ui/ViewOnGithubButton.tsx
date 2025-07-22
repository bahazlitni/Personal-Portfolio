import React from "react"
import { T_Size } from "@/types"
import Icon from "@/components/ui/Icon"

interface Props {
   size: T_Size
   href?: string
}

export default function ViewOnGithubButton({size, href}: Props){
   return href ? <a href={href} className={`${size}-button magenta-flare`}>
      <Icon name="github" />
      View On Github
   </a> : null
}