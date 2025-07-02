import styles from '@/shared-css-modules/privacy-terms.module.css'

export default function PrivacyTerms() {
  return <div className={styles.container}>
      <div className={styles.content}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Privacy Policy</h2>
              <p className={styles.effectiveDate}>Effective: July 1, 2025</p>
              
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>No Data Collection Policy</h3>
                <p>
                  I want to be perfectly clear: <strong>I do not collect any personal information</strong> through this website. 
                  There is no database storing user information, no analytics tracking, and no cookies 
                  collecting your browsing data.
                </p>
              </div>
              
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>What I Don't Know About You</h3>
                <p>
                  When you visit this website:
                </p>
                <ul className={styles.list}>
                  <li><span className={styles.listBullet}>-</span> I <strong>do not know</strong> who you are</li>
                  <li><span className={styles.listBullet}>-</span> I <strong>do not know</strong> when you visited</li>
                  <li><span className={styles.listBullet}>-</span> I <strong>do not know</strong> where you're visiting from</li>
                  <li><span className={styles.listBullet}>-</span> I <strong>do not know</strong> what pages you viewed</li>
                  <li><span className={styles.listBullet}>-</span> I <strong>do not know</strong> how long you stayed</li>
                </ul>
                <p>
                  This website contains no tracking mechanisms whatsoever. Your visit is completely private.
                </p>
              </div>
              
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Email Communication</h3>
                <p>
                  If you choose to contact me through the contact form:
                </p>
                <ul className={styles.list}>
                  <li><span className={styles.listBullet}>-</span> The email is sent directly to my personal inbox</li>
                  <li><span className={styles.listBullet}>-</span> I can see the information you voluntarily provide in the email</li>
                  <li><span className={styles.listBullet}>-</span> This information is <strong>not stored</strong> in any database</li>
                  <li><span className={styles.listBullet}>-</span> I <strong>do not share</strong> this information with anyone</li>
                  <li><span className={styles.listBullet}>-</span> I treat emails as private correspondence</li>
                </ul>
                <p>
                  Once I respond to your email, you can ask me to delete the conversation from my inbox. I do not maintain 
                  archives of email correspondence.
                </p>
              </div>
              
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>No Cookies, No Tracking</h3>
                <p>
                  This website does not use:
                </p>
                <ul className={styles.list}>
                  <li><span className={styles.listBullet}>-</span> Cookies of any kind</li>
                  <li><span className={styles.listBullet}>-</span> Analytics tracking</li>
                  <li><span className={styles.listBullet}>-</span> Third-party scripts</li>
                  <li><span className={styles.listBullet}>-</span> Advertising trackers</li>
                  <li><span className={styles.listBullet}>-</span> Social media widgets</li>
                </ul>
                <p>
                  Your visit remains completely anonymous and untracked.
                </p>
              </div>
              
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Website Technology</h3>
                <p>
                  This is a static website built with:
                </p>
                <ul className={styles.list}>
                  <li><span className={styles.listBullet}>-</span> Next.js for frontend rendering</li>
                  <li><span className={styles.listBullet}>-</span> Vercel for hosting</li>
                </ul>
                <p>
                  The hosting provider (Vercel) may collect standard server logs, but these contain no 
                  personally identifiable information and are automatically deleted after 30 days. I do not 
                  have access to these logs.
                </p>
              </div>
              
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Your Privacy is Respected</h3>
                <p>
                  I believe privacy is a fundamental right. This website is designed to respect your privacy 
                  by collecting absolutely nothing about you. You can browse freely knowing that no 
                  information about your visit is being recorded or stored.
                </p>
              </div>
            </div>
      </div>
   </div>
}