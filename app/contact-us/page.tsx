import { pageSeo } from '@/lib/site-data'
import { createPageMetadata } from '@/lib/seo'
import ContactPageContent from '@/components/contact-page-content'

export const metadata = createPageMetadata(pageSeo.contact)

export default function ContactUsPage() {
  return <ContactPageContent />
}
