import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MermaidDiagram from '@/components/MermaidDiagram'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Technology | FEATS',
  description: 'Discover the advanced technologies powering FEATS',
}

export default function TechnologyPage() {
  const technologies = [
    {
      name: "Vercel and Next.js",
      description: "User-friendly website interface and initial processing.",
      details: "We built our website using Next.js, a modern web development framework, and hosted it on Vercel. This setup provided a fast, responsive, and always-available website where users could upload images and view their analysis results. Vercel also handled initial image processing and validation through serverless functions, ensuring that only appropriate images proceeded to analysis."
    },
    {
      name: "Groq",
      description: "High-performance hardware for image analysis.",
      details: "Groq provided powerful computing hardware optimized for high-speed, intensive computations. We used Groq&#39;s hardware to perform detailed image analysis based on the 14 FEATS criteria, ensuring users received their analysis results promptly."
    },
    {
      name: "Akash Network",
      description: "Scalable and flexible computing infrastructure.",
      details: "Akash Network hosted our backend services that required more control over the computing environment. By deploying our image analysis pipeline on Akash, we could scale our services up or down based on demand, ensuring reliability and cost-efficiency."
    },
    {
      name: "DataStax",
      description: "Secure and scalable data storage.",
      details: "DataStax served as our primary database for storing uploaded images, analysis results, and user data. Its distributed architecture ensured high availability and quick access to data whenever needed, keeping user information safe and accessible."
    },
    {
      name: "LlamaStack API",
      description: "Advanced language model for generating explanations.",
      details: "We used the LlamaStack API to generate clear and detailed explanations for each aspect of the image analysis. It provided advanced features like safety checks, multi-step reasoning, and context management, ensuring that users understood why each rating was given to their image."
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
            <CardTitle>How Our Image Processing System Works</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Our system was designed to be simple and efficient, guiding images from upload to insightful analysis smoothly.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Start by <strong>uploading your image</strong> on the Try It page of our website built with Next.js and hosted on Vercel.
              </li>
              <li>
                The image undergoes <strong>initial processing and validation</strong> by our serverless functions on Vercel.
              </li>
              <li>
                The validated image is then sent to our <strong>image analysis pipeline</strong> hosted on the Akash Network, where it is processed using Groq&#39;s high-performance hardware based on the 14 FEATS criteria.
              </li>
              <li>
                We <strong>store the image and analysis results securely</strong> in DataStax for easy access and retrieval.
              </li>
              <li>
                Our system uses the <strong>LlamaStack API</strong> to generate detailed explanations for each rating, ensuring clarity and understanding.
              </li>
              <li>
                Finally, we <strong>present the results</strong> in a clear report on our website for you to review.
              </li>
            </ol>
            <h4 className="font-semibold mt-4 mb-2">Benefits of Our System</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Quick Results: Users received their analysis promptly without long waits.</li>
              <li>Easy to Use: Our website was designed for a smooth and straightforward experience.</li>
              <li>Clear Insights: Users could understand their analysis with detailed explanations.</li>
              <li>Reliable and Secure: Data was stored safely, and the system was built to be dependable.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Technology Stack Diagram</CardTitle>
          </CardHeader>
          <CardContent>
            <MermaidDiagram chart={mermaidChart} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

