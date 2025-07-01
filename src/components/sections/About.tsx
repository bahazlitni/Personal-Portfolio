'use client'

import styles from "./About.module.css"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaGraduationCap, FaCode, FaPalette, FaGamepad, FaLightbulb } from "react-icons/fa"
import AnimH1 from "@/components/ui/AnimH1"

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.sectionGlow}></div>
      <AnimH1>About Me</AnimH1>

      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className={styles.content}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className={styles.imageWrapper}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className={styles.imageGlow}></div>
            <Image
              src="/pfp.png"
              alt="Baha Zlitni Portrait"
              width={280}
              height={280}
              className={styles.image}
              priority
            />
          </motion.div>

          <article className={styles.text}>
            <div className={styles.nameCard}>
              <FaGraduationCap className={styles.nameIcon} />
              <p><strong>Baha Zlitni</strong> — Engineering student at INSA Toulouse</p>
            </div>
            
            <p className={styles.paragraph}>
              I build software products with a designer's eye and an engineer's discipline.
              I specialize in <strong>web development</strong>, <strong>UI/UX</strong>,
              and <strong>interactive tools</strong>.
            </p>
            
            <div className={styles.passionGrid}>
              <div className={styles.passionCard}>
                <FaCode className={styles.passionIcon} />
                <span>Code</span>
              </div>
              <div className={styles.passionCard}>
                <FaGamepad className={styles.passionIcon} />
                <span>Game Mechanics</span>
              </div>
              <div className={styles.passionCard}>
                <FaPalette className={styles.passionIcon} />
                <span>Digital Aesthetics</span>
              </div>
            </div>
            
            <p className={styles.paragraph}>
              Actively working on projects like <em className={styles.projectHighlight}>Eldara</em>, 
              <em className={styles.projectHighlight}> Wordery.io</em>, and more.
            </p>
          </article>
        </motion.div>

        <motion.div
          className={styles.badgesContainer}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className={`${styles.importantBadge} ${styles.tooltipWrapper}`}>
            <FaGraduationCap className={styles.badgeIcon} />
            INSA Toulouse
            <div className={styles.tooltip}>
              INSA Toulouse is one of France's top engineering schools.
            </div>
          </div>
          
          <div className={styles.badge}>
            <FaCode className={styles.badgeIcon} />
            Web Developer
          </div>
          
          <div className={styles.badge}>
            <FaPalette className={styles.badgeIcon} />
            UI/UX Designer
          </div>
          
          <div className={styles.badge}>
            <FaCode className={styles.badgeIcon} />
            React & Next.js
          </div>
          
          <div className={styles.badge}>
            <FaLightbulb className={styles.badgeIcon} />
            Creative Technologist
          </div>
          
          <div className={styles.badge}>
            <FaPalette className={styles.badgeIcon} />
            Digital Artist
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}