'use client'
import { useState, useEffect } from 'react'
import styles from "./Contact.module.css"
import { contactLinks } from "@/data"
import { T_ContactLink } from "@/types"
import Select from '@/components/ui/Select'
import Icon from '@/components/ui/Icon'
import AnimH1 from '../ui/AnimH1'
import Toast from '@/components/ui/Toast'
import FlaredLink from '@/components/ui/FlaredLink'

// Options for custom select
const subjectOptions = [
   { value: '', label: 'Select a subject' },
   { value: 'recruiting', label: 'Recruiting & Business' },
   { value: 'invitation', label: 'Invitation' },
   { value: 'feedback', label: 'Feedback or Bug Report' },
   { value: 'question', label: 'General Question' },
   { value: 'custom', label: 'Custom' }
]

const projectTypeOptions = [
   { value: '', label: 'Select project' },
   { value: 'this-website', label: 'This website' },
   { value: 'eldara', label: 'Eldara' },
   { value: 'ciccle', label: 'Ciccle' },
   { value: 'up-xel', label: 'Up-Xel' },
   { value: 'optica', label: 'Optica' },
   { value: 'imperial-japan', label: 'Imperial Japan' },
   { value: 'other', label: 'Other' }
]

const roleTypeOptions = [
   { value: '', label: 'Select your role' },
   { value: 'individual', label: 'Individual' },
   { value: 'recruiter', label: 'Recruiter' },
   { value: 'hiring-manager', label: 'Hiring Manager' },
   { value: 'hr', label: 'HR Professional' },
   { value: 'founder', label: 'Founder / Startup Owner' },
   { value: 'agency', label: 'Agency Representative' },
   { value: 'colleague', label: 'Colleague / Peer' },
   { value: 'other', label: 'Other' }
]

function ContactForm(){
   const [formData, setFormData] = useState({
      fullName: '',
      omitName: false,
      subject: '',
      customSubject: '',
      projectType: '',
      roleType: '',
      message: '',
      email: ''
   })

   const [messagePlaceholder, setMessagePlaceholder] = useState('Start typing your message here...')
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null)

   // Show toast message
   const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      setToast({message, type})
      setTimeout(() => setToast(null), 3000)
   }

   // Update placeholder based on selections
   useEffect(() => {
      let placeholder = 'Start typing your message here...'
      
      switch(formData.subject) {
         case 'recruiting':
            placeholder = `Hi Baha, I'm contacting you regarding a position...`
            break
         case 'invitation':
            placeholder = `Hi Baha, I'd like to invite you to...`
            break
         case 'feedback':
            placeholder = `Regarding your project, I wanted to share my thoughts...`
            break
         case 'question':
            placeholder = `Hi Baha, I have a question about... `
            break
         case 'custom':
            placeholder = `Hi Baha, regarding...`
            break
      }
      
      setMessagePlaceholder(placeholder)
   }, [formData.subject, formData.roleType, formData.projectType, formData.customSubject])

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target
      const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
      
      setFormData(prev => ({
         ...prev,
         [name]: type === 'checkbox' ? checked : value
      }))
   }

   // Handler for custom select component
   const handleSelectChange = (field: string) => (value: string) => {
      setFormData(prev => ({
         ...prev,
         [field]: value
      }))
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      showToast('Sending your message...', 'info')

      try {
        // Prepare data for API
        const payload = {
          ...formData,
          // Don't send fullName if omitted
          fullName: formData.omitName ? 'Anonymous' : formData.fullName
        }

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        const result = await response.json()

        if (result.success) {
          showToast('Message sent successfully!', 'success')
          // Reset form
          setFormData({
            fullName: '',
            omitName: false,
            subject: '',
            customSubject: '',
            projectType: '',
            roleType: '',
            message: '',
            email: ''
          })
        } else {
          showToast(result.message || 'Failed to send message', 'error')
        }
      } catch (error) {
        showToast('Network error. Please try again.', 'error')
      } finally {
        setIsSubmitting(false)
      }
   }

   return (
      <>
      <form onSubmit={handleSubmit} className={styles.form}>
         <div className={styles.labelGroup}>
            <label htmlFor="fullName">Full Name</label>
            {formData.omitName && (
               <span className={styles.omitWarning}>Not shared</span>
            )}
         </div>
         <div className={styles.inputGroup}>
            <input
               type="text"
               id="fullName"
               name="fullName"
               value={formData.fullName}
               onChange={handleChange}
               disabled={formData.omitName}
               placeholder="Please specify your full name"
               className={`${styles.input} ${formData.omitName ? styles.disabledInput : ''}`}
            />
            <div className={styles.checkboxContainer}>
               <input
                  type="checkbox"
                  id="omitName"
                  name="omitName"
                  checked={formData.omitName}
                  onChange={handleChange}
                  className={styles.checkbox}
               />
               <label htmlFor="omitName">Abstentiate</label>
            </div>
         </div>

         <div className={styles.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input
               type="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               placeholder="Your email address"
               className={styles.input}
               required
            />
         </div>

         <div className={styles.formGroup}>
            <label htmlFor="subject">Subject</label>
            <Select
               options={subjectOptions}
               value={formData.subject}
               onChange={handleSelectChange('subject')}
               placeholder="Select a subject"
               className={styles.select}
               triggerClassName={styles.selectTrigger}
               required
            />
         </div>

         {/* Conditional Fields */}
         {formData.subject === 'custom' && (
            <div className={styles.formGroup}>
               <label htmlFor="customSubject">Custom Subject</label>
               <input
                  type="text"
                  id="customSubject"
                  name="customSubject"
                  value={formData.customSubject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  maxLength={64}
                  className={styles.input}
                  required
               />
            </div>
         )}

         {formData.subject === 'feedback' && (
            <div className={styles.formGroup}>
               <label htmlFor="projectType">Specify Project</label>
               <Select
                  options={projectTypeOptions}
                  value={formData.projectType}
                  onChange={handleSelectChange('projectType')}
                  placeholder="Select project"
                  className={styles.select}
                  triggerClassName={styles.selectTrigger}
                  required
               />
            </div>
         )}

         {formData.subject === 'recruiting' && (
            <div className={styles.formGroup}>
               <label htmlFor="roleType">Your Role</label>
               <Select
                  options={roleTypeOptions}
                  value={formData.roleType}
                  onChange={handleSelectChange('roleType')}
                  placeholder="Select your role"
                  className={styles.select}
                  triggerClassName={styles.selectTrigger}
                  required
               />
            </div>
         )}

         {/* Message Field */}
         <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <div className={styles.textareaWrapper}>
               <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={messagePlaceholder}
                  className={styles.textarea}
                  rows={6}
                  required
               />
               <div className={styles.textareaBorder}></div>
            </div>
         </div>

      <div className={styles.buttonContainer}>
         <button 
            type="submit" 
            className="L-button magenta-flare"
            disabled={isSubmitting}
         >
            <Icon name="send" />
            {isSubmitting ? 'Sending...' : 'Send'}
         </button>
      </div>
   </form>
   
   {/* Toast Notification */}
   {toast && (
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast(null)} 
      />
    )}
   </>
   )
}


export default function Contact() {
   return (
      <section id="contact" className={styles.section}>
         <AnimH1>Contact Me</AnimH1>
         <div className={styles.linksContainer}>
            {contactLinks.map((link: T_ContactLink) => (
               <FlaredLink
                  color="cyan"
                  size="L"
                  key={link.name} 
                  href={link.url} 
               >
                  <Icon name={link.icon} />
                  {link.name}
               </FlaredLink>
            ))}
         </div>
         <ContactForm />
      </section>
   )
}