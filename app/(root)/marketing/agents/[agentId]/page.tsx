import { RoutePlaceholder } from '../../../RoutePlaceholder'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ agentId: 'demo' }]
}

export default function AgentPage() {
  return <RoutePlaceholder title="Agent details" />
}
