import { T_Project } from "@/types"
import styles from "./ProjectPage.module.css"
import AnimH1 from "@/components/ui/AnimH1"
import Carousel from "@/components/ui/Carousel"
import Image from "next/image"
import Icon from "@/components/ui/Icon"
import { motion } from "framer-motion"
import { InfoBadge, FlareBadge } from "@/components/ui/Badges"
import CoverImage from "@/components/ui/CoverImage"

export default function ProjectPage({project, ...props}: {project: T_Project}) {
  return <>
  	{project.coverPublicLink &&
		<CoverImage
			className={styles.cover}
			src={project.coverPublicLink}
			width={1920}
			height={1080}
		/>
	}
  <section className={styles.section} {...props}>
		  <div className={styles.hero}>
				{project.iconPublicLink && (
					<motion.div
						className={styles.iconWrapper}
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<Image
							className={styles.icon}
							src={project.iconPublicLink}
							alt={project.title + " icon"}
							width={120}
							height={120}
						/>
					</motion.div>
				)}
				<div className={styles.heroContent}>
					<AnimH1>{project.title}</AnimH1>
					<div className={styles.badgesContainer}>
						<motion.span
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						>
							<InfoBadge variant="outline" info={project.status} color="magenta"/>
						</motion.span>

						{project.lastReleaseYear && (
						<motion.span
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.35 }}
						>
							<InfoBadge variant="glow" info={project.lastReleaseYear} color="black"/>
						</motion.span>
						)}

						{project.lastVersion && (
						<motion.span
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
						>
							<InfoBadge variant="glow" info={`v${project.lastVersion}`} color="white"/>
						</motion.span>
						)}
					</div>
				</div>
      </div>
								{(project.githubUrl || project.liveUrl) && 
				<div className={styles.githubAndDownloadButtonsConainter}>
					{project.githubUrl && (
						<motion.a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="L-button cyan-flare"
						>
						<Icon name="github" />
						<span>View on GitHub</span>
						</motion.a>
					)}

					{project.liveUrl && (
					<motion.a
						href={project.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="L-button magenta-flare"
					>
						<Icon name="download" />
						<span>Download v-{project.lastVersion}</span>
					</motion.a>
					)}
				</div>}

          <motion.p
            className={styles.detailedDescription}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
				{project.detailedDescription}
			</motion.p>

      {/* Badges Section */}
      {project.badges && project.badges.length > 0 && (
        <motion.div
          className={styles.badgesSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className={styles.badgesContainer}>
            {project.badges.map((badge, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.65 + (index * 0.05) }}
					>
						<FlareBadge size="M">{badge}</FlareBadge>
						<div className={styles.badgeGlow}></div>
					</motion.div>
				))}
          </div>
        </motion.div>
      )}

      {/* Carousel */}
      {project.images && project.images.length > 0 && 
			<Carousel className={styles.carousel} images={project.images} />
		}

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <motion.div
          className={styles.techSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className={styles.sectionTitle}>Technologies Used</h2>
          <div className={styles.techContainer}>
            {project.technologies.map((tech, index) => (
              <motion.div
                key={index}
                className={styles.techBadge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.85 + (index * 0.05) }}
              >
                {tech}
                <div className={styles.techGlow}></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Links */}
      <motion.div
        className={styles.linksSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className={styles.linksContainer}>


          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="external-link" />
              <span>Visit Live Project</span>
            </motion.a>
          )}
        </div>
      </motion.div>
   </section>
	</>
}