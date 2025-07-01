import styles from "./Experience.module.css";
import { experiences } from "@/data"
import AnimH1 from "@/components/ui/AnimH1";

export default function Experience() {
  return <section id="experience" className={styles.section}>
      <AnimH1>Experience</AnimH1>
      <ul className={styles.timeline}>
        {experiences.map((exp, i) => (
          <li key={i} className={styles.entry}>
            <div className={styles.header}>
              <h2>{exp.title}</h2>
              <span className={styles.date}>{exp.date}</span>
            </div>
            <h3>{exp.company}</h3>
            <p>{exp.description}</p>
          </li>
        ))}
      </ul>
   </section>
}
