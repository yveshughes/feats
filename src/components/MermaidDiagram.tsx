'use client'

import { useEffect } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  chart: string
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true })
    mermaid.contentLoaded()
  }, [])

  return <div className="mermaid">{chart}</div>
}

