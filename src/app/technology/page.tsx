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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Technology Stack Diagram</CardTitle>
          </CardHeader>
          <CardContent>
            <MermaidDiagram chart={mermaidChart} />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>How Our Image Processing System Flows</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Our innovative image processing system operates seamlessly from upload to insight, leveraging advanced AI and distributed computing.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>User Uploads an Image:</strong> The journey starts with users uploading an image through a user-friendly interface.</li>
              <li><strong>Distributed Processing on the Akash Network:</strong> The image is sent to the Akash Network, ensuring scalability and efficient task distribution.</li>
              <li><strong>Moderation for Safety:</strong> The image is passed through a Safety API for content moderation, ensuring ethical compliance.</li>
              <li><strong>AI-Driven Analysis:</strong> The image is processed by the Groq-powered Llama Model for precise inference and analysis.</li>
              <li><strong>Scoring and Refinement:</strong> Results are evaluated by the Scoring API and specialized workflows like FEATS Analysis add context-specific insights.</li>
              <li><strong>Data Storage and Dashboard Integration:</strong> Refined results are securely stored in Datastax and can be queried through an integrated Research Dashboard.</li>
              <li><strong>Persistent Memory for Long-Term Insights:</strong> With the Memory API, data is preserved for historical analysis and deeper comparisons over time.</li>
            </ol>
            <h4 className="font-semibold mt-4 mb-2">The Flow&apos;s Benefits</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Streamlined Processing: From upload to actionable insight in one smooth flow.</li>
              <li>Scalable & Efficient: Distributed computing via Akash Network handles complex tasks at scale.</li>
              <li>AI-Powered Precision: Groq-powered models deliver high accuracy.</li>
              <li>Ethical by Design: Built-in content moderation ensures safety and compliance.</li>
              <li>Actionable Insights: Research dashboards and data storage provide long-term usability.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

