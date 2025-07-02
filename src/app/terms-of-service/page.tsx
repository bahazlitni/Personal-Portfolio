import styles from '@/shared-css-modules/privacy-terms.module.css'

export default function PrivacyTerms() {

  return <div className={styles.container}>
      <div className={styles.content}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Terms of Service</h2>
              <p className={styles.effectiveDate}>Effective: July 1, 2025</p>
              
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Acceptance of Terms</h3>
                <p>
                  By accessing or using this website, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use this website.
                </p>
              </div>
              
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Website Usage</h3>
                <p>
                  This is my personal portfolio website. You may:
                </p>
                <ul className={styles.list}>
                  <li><span className={styles.listBullet}>-</span> View all content freely</li>
                  <li><span className={styles.listBullet}>-</span> Share the website link with anyone</li>
                  <li><span className={styles.listBullet}>-</span> Use the HTML/CSS as inspiration for your own projects</li>
                </ul>
                <p>
                  You may <strong>not</strong>:
                </p>
                <ul className={styles.list}>
                  <li><span className={styles.listBullet}>-</span> Modify any content on this website</li>
                  <li><span className={styles.listBullet}>-</span> Monetize or commercially exploit this website's content</li>
                  <li><span className={styles.listBullet}>-</span> Abuse the website through excessive requests or malicious activities</li>
                </ul>
              </div>
              
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Email Communication</h3>
                <p>
                  When contacting me through the website's contact form:
                </p>
                <ul className={styles.list}>
                  <li><span className={styles.listBullet}>-</span> Do <strong>not</strong> spam or send unsolicited commercial emails</li>
                  <li><span className={styles.listBullet}>-</span> You may use a pseudonym or fake email address</li>
                  <li><span className={styles.listBullet}>-</span> I will respond to the email address you provide</li>
                  <li><span className={styles.listBullet}>-</span> I do not store or share your email content</li>
                </ul>
                <p>
                  All email communications are treated as private correspondence. I reserve the right to 
                  ignore or block emails that violate these terms.
                </p>
              </div>
              
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Intellectual Property</h3>
                <p>
                  All content on this website, including text, graphics, logos, and code, is my intellectual 
                  property unless otherwise noted.
                </p>
                <p>
                  You are granted a limited license to:
                </p>
                <ul className={styles.list}>
                  <li><span className={styles.listBullet}>-</span> View and share the content</li>
                  <li><span className={styles.listBullet}>-</span> Use the code as inspiration for learning purposes</li>
                </ul>
                <p>
                  You are <strong>not</strong> permitted to:
                </p>
                <ul className={styles.list}>
                  <li><span className={styles.listBullet}>-</span> Copy large portions of code for commercial use</li>
                  <li><span className={styles.listBullet}>-</span> Claim my work as your own</li>
                  <li><span className={styles.listBullet}>-</span> Create derivative works without permission</li>
                </ul>
                <p>
                  Specific projects may have their own licenses - please check individual project pages for details.
                </p>
              </div>
              
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Prohibited Activities</h3>
                <p>
                  You agree not to engage in any of the following activities:
                </p>
                <ul className={styles.list}>
                  <li><span className={styles.listBullet}>-</span> Attempting to disrupt or compromise website security</li>
                  <li><span className={styles.listBullet}>-</span> Sending automated queries or excessive requests</li>
                  <li><span className={styles.listBullet}>-</span> Using the website for illegal activities</li>
                  <li><span className={styles.listBullet}>-</span> Impersonating others in communications</li>
                  <li><span className={styles.listBullet}>-</span> Harassing or threatening behavior</li>
                </ul>
              </div>
              
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>No Warranty</h3>
                <p>
                  This website is provided "as is" without any warranties of any kind. I make no guarantees 
                  regarding:
                </p>
                <ul className={styles.list}>
                  <li><span className={styles.listBullet}>-</span> Website availability or uptime</li>
                  <li><span className={styles.listBullet}>-</span> Accuracy of information</li>
                  <li><span className={styles.listBullet}>-</span> Freedom from errors or bugs</li>
                </ul>
              </div>
              
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Changes to Terms</h3>
                <p>
                  I reserve the right to modify or replace these Terms at any time. Changes will be effective 
                  immediately upon posting to the website.
                </p>
              </div>
            </div>
      </div>
   </div>
}