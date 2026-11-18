import { RoutePlaceholder } from '../../../RoutePlaceholder'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ leadId: 'demo' }]
}

export default function LeadPage() {
  return <RoutePlaceholder title="Lead details" />
}
