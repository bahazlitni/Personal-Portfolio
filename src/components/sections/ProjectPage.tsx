import { T_Project } from "@/types"
import styles from "./ProjectPage.module.css"
import AnimH1 from "@/components/ui/AnimH1"

export default function ProjectPage({project, ...props}: {project: T_Project}) {
  return <section className={styles.section} {...props}>
      <h3 className={styles.warning}>I am actively trying to assemble the projects and clean them up.</h3>
      <AnimH1>{project.title}</AnimH1>
      <p>{project.description}</p>
   </section>
}