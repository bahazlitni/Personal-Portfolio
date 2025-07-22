'use client'
import { T_Project, T_ProjectStatus } from "@/types"
import styles from "./ProjectCard.module.css"
import { motion } from 'framer-motion'
import {InfoBadge} from "@/components/ui/Badges"
import CoverImage from "@/components/ui/CoverImage"
import ViewOnGithubButton from "@/components/ui/ViewOnGithubButton"
import dynamic from 'next/dynamic'
import VisitButton from "./VisitButton"
const DownloadButton = dynamic(
  () => import('@/components/ui/DownloadButton'),
  { ssr: false }
)



export default function ProjectCard({ project, ...props }: { project: T_Project }) {
   return (
      <motion.div 
         id="projects" 
         className={`${styles.card} ${project.isBig ? styles.bigProjectCard : ''}`}
         whileHover={{ y: -10 }}
         transition={{ duration: 0.3 }}
      >
          {project.coverPublicLink &&
          <CoverImage
            className={styles.cover}
            src={project.coverPublicLink}
            width={1280}
            height={720}
            brightness={60}
          />
        }
         <div className={styles.cardGlow}></div>
         <div className={styles.cardContent}>
            <div className={styles.cardHeader} {...props}>
                <h2 className={styles.title}>{project.title}</h2>
                <div className={styles.metaRow}>
                  <InfoBadge variant="glow" info={project.lastReleaseYear} color="black" />
                  <InfoBadge variant="glow" info={project.status} color={project.status === "completed" ? "cyan" : "magenta"} />
                </div>
            </div>
            
            <div className={styles.tags}>
              {project.technologies && project.technologies.slice(0, 4).map((tech, index) => (
                <span key={index} className={styles.tag}>{tech}</span>
              ))}
              {project.technologies && project.technologies.length > 4 && (
                <span className={styles.tag}>+{project.technologies.length - 4}</span>
              )}
            </div>
            
            <p className={styles.description}>{project.description}</p>
            
            <div className={styles.buttonsContainer}>
              <a className="saturated-flare M-button" href={"/projects/" + project.linkLabel}>
                View Project
              </a>
              {<DownloadButton size="M" downloads={project.downloads} />}
              {(project.isBig || !project.downloads) && <VisitButton href={project.visitUrl} size="M"/>}
              {(project.isBig || !project.downloads && !project.visitUrl) && <ViewOnGithubButton href={project.githubUrl} size="M"/>}
            </div>
         </div>
      </motion.div>
   )
}