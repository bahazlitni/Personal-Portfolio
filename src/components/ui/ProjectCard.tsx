'use client'
import { T_Project, T_ProjectStatus } from "@/types"
import styles from "./ProjectCard.module.css"
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

function getStatusClassName(status: T_ProjectStatus) {
   return styles.status + " " + (status == "completed" ? styles.completedStatus : styles.underDevelopmentStatus)
}

export default function ProjectCard({ project, ...props }: { project: T_Project }) {
   return (
      <motion.div 
         id="projects" 
         className={`${styles.card} ${project.isBig ? styles.bigProjectCard : ''}`}
         whileHover={{ y: -10 }}
         transition={{ duration: 0.3 }}
      >
         <div className={styles.cardGlow}></div>
         <div className={styles.cardContent}>
            <div className={styles.cardHeader} {...props}>
               <div className={styles.titleRow}>
                 <h2 className={styles.title}>{project.title}</h2>
                 <div className={styles.icons}>
                   {project.githubUrl && (
                     <a href={project.githubUrl} className={styles.iconLink} aria-label="GitHub repository">
                       <FaGithub />
                     </a>
                   )}
                   {project.liveUrl && (
                     <a href={project.liveUrl} className={styles.iconLink} aria-label="Live project">
                       <FaExternalLinkAlt />
                     </a>
                   )}
                 </div>
               </div>
               <div className={styles.metaRow}>
                 <p className={styles.year}>{project.lastReleaseYear}</p>
                 <p className={getStatusClassName(project.status)}>
                   {project.status === "completed" ? "Completed" : "In Development"}
                 </p>
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
            
            <a href={"/projects/" + project.linkLabel} className={styles.viewProjectButton}>
              View Project
              <div className={styles.buttonGlow}></div>
            </a>
         </div>
      </motion.div>
   )
}