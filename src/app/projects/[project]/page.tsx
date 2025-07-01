'use client'
import styles from "./page.module.css"
import { T_Project } from "@/types"
import ProjectPage from "@/components/sections/ProjectPage"
import { projects } from "@/data"
import { useParams } from "next/navigation"

export default function Project() {
  const { project: projectParam } = useParams<{ project: string }>()
  const project: T_Project | undefined = projects.find((p: T_Project) => p.linkLabel === projectParam.toLowerCase())

  if (!project) return <section><h1>404 | Project not found.</h1></section>
   
  return <ProjectPage project={project} />
}