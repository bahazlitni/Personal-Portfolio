import styles from './Hero.module.css'
import AnimH1 from '@/components/ui/AnimH1'

export default function Hero() {
  return <section id="home" className={styles.hero}>
      <div className={styles.textContainer}>
         <AnimH1>Hello, I'm <span className="specialText">Baha</span>.</AnimH1>

         <h3>An <strong>engineering student</strong> with an innovative and artistic energy.</h3>
      </div>
      <div className={styles.buttonsContainer}>
         <a className="saturated-flare L-button" href="#projects">View My Projects</a>
         <a className="outline-button L-button" href="#contact">Get in Touch</a>
      </div>
   </section>
}
