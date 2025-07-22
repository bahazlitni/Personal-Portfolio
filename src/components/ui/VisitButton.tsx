import React from "react"
import { T_Size } from "@/types"
import Icon from "@/components/ui/Icon"

interface Props {
   size: T_Size
   href?: string
}

export default function VisitButton({size, href}: Props){
   return href ? <a href={href} className={`${size}-button outline-button`}>
      Visit
      <Icon name="external-link" style={{width: "12px", height: "12px"}} />
   </a> : null
}