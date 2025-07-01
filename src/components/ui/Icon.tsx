import React from 'react'
import { MdEmail } from 'react-icons/md'
import { FaLinkedin, FaGithub, FaArrowUp } from 'react-icons/fa'
import { MdOutlineQuestionMark } from 'react-icons/md'
const { MdSend } = require('react-icons/md');

type IconProps = { name: string } & React.ComponentProps<typeof MdEmail>;

export default function Icon({ name, ...props }: IconProps) {
   switch (name) {
      case "email"    : return <MdEmail {...props} />
      case "linkedin" : return <FaLinkedin {...props} />
      case "github"   : return <FaGithub {...props} />
      case "arrow-up" : return <FaArrowUp {...props} />
      case "send"     : return <MdSend {...props} />
      default         : return <MdOutlineQuestionMark {...props} />
   }
}