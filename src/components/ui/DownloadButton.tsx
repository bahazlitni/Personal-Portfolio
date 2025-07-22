// DownloadButton.tsx — keep SSR, move OS-dependent logic to the first client paint
'use client'
import { useEffect, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { detectOS, downloadURL } from '@/utils'
import { T_Size, T_Downloads, T_OS } from '@/types'

interface Props {
  size: T_Size
  downloads?: T_Downloads
}

export default function DownloadButton({ downloads, size }: Props) {
  const [href, setHref] = useState('')
  const [os, setOS] = useState<T_OS>('unknown')

  useEffect(() => {
    const detected = detectOS()
    setOS(detected)
    setHref(downloadURL(downloads, detected))
  }, [downloads])

  if (!href) return null

  return (
    <a href={href} className={`${size}-button cyan-flare`}>
      <Icon name={os} />
      Download
    </a>
  )
}
