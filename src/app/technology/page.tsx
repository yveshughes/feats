import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MermaidDiagram from '@/components/MermaidDiagram'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Technology | FEATS',
  description: 'Learn about the cutting-edge technologies powering FEATS',
}

export default function TechnologyPage() {
  const technologies = [
    {
      name: "Akash Network",
      description: "Decentralized cloud computing marketplace for deploying and scaling our application.",
      details: "Akash Network provides a decentralized and cost-effective solution for hosting our application. It allows us to deploy our containerized services across a network of distributed data centers, ensuring high availability and scalability."
    },
    {
      name: "DataStax",
      description: "Scalable database solution for storing processed images, analysis results, and user data.",
      details: "We utilize DataStax's cloud-native database to store and manage our application's data. Its distributed architecture allows us to handle large volumes of data with high performance and reliability, crucial for storing processed images and analysis results."
    },
    {
      name: "Groq",
      description: "High-performance AI accelerators to power our Llama model inference.",
      details: "Groq's AI accelerators significantly boost the performance of our Llama model inference. This allows us to process and analyze images quickly, providing near real-time results to our users."
    },
    {
      name: "Llama",
      description: "Large language model used for analyzing images based on FEATS criteria.",
      details: "We've fine-tuned the Llama model to understand and apply the Formal Elements Art Therapy Scale (FEATS) criteria. This powerful language model enables us to provide detailed and accurate analyses of uploaded artwork."
    },
    {
      name: "Next.js",
      description: "React framework for building our frontend application with server-side rendering capabilities.",
      details: "Next.js forms the foundation of our frontend, offering server-side rendering for improved performance and SEO. Its file-based routing system and built-in API routes simplify our development process and enhance the overall user experience."
    }
  ]

  const mermaidChart = fs.readFileSync(path.join(process.cwd(), 'public', 'technology.mermaid'), 'utf-8')

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Our Technology Stack</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {technologies.map((tech) => (
          <Card key={tech.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{tech.name}</CardTitle>
              <CardDescription>{tech.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600">{tech.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Technology Stack Diagram</CardTitle>
        </CardHeader>
        <CardContent>
          <MermaidDiagram chart={mermaidChart} />
        </CardContent>
      </Card>
    </div>
  )
}

