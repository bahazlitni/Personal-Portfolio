import { T_Project } from "@/types"
import { projects } from "@/data"
import ProjectCard from "@/components/ui/ProjectCard"
import styles from "./Projects.module.css"
import AnimH1 from "@/components/ui/AnimH1"

export default function Projects(){
   
   return <section className={styles.projects}>
      <AnimH1>My Projects</AnimH1>
      <div className={styles.container}>
      {[...projects]
         .sort((a: T_Project, b: T_Project) => b.lastReleaseYear - a.lastReleaseYear)
         .map((project: T_Project, key: number) => 
         <ProjectCard project={project} key={key}/>
         )
      }
      </div>
   </section>
}