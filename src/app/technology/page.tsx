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
      description: "Fast and responsive website for an easy user experience.",
      details: "We build our website using Next.js, a modern web development framework, and host it on Vercel. This ensures our site is fast, responsive, and always available, making it easy for you to upload images and view your analysis results."
    },
    {
      name: "Groq",
      description: "High-speed processing for quick image analysis.",
      details: "Groq provides powerful computing hardware that quickly analyzes your uploaded images based on 14 different criteria. This means you get your analysis results promptly without long waits."
    },
    {
      name: "DataStax",
      description: "Secure storage for your images and analysis results.",
      details: "DataStax safely stores your uploaded images and the analysis results. This ensures that your data is secure and can be accessed whenever you need it."
    },
    {
      name: "Akash Network",
      description: "Flexible computing power that scales with demand.",
      details: "Akash Network provides the computing resources we need to run our image analysis services efficiently. It allows us to scale our services up or down based on how many people are using the app, ensuring reliability."
    },
    {
      name: "LlamaStack API",
      description: "Clear and detailed explanations of your image analysis.",
      details: "We use the LlamaStack API to generate easy-to-understand explanations for each aspect of your image analysis. This helps you understand why each rating was given to your image."
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
              Our system is designed to be simple and efficient, guiding your image from upload to insightful analysis smoothly.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>User Uploads an Image:</strong> You start by uploading your drawing through our easy-to-use website.
              </li>
              <li>
                <strong>Initial Processing:</strong> The image is received by our servers hosted on Vercel, where initial checks are performed.
              </li>
              <li>
                <strong>High-Speed Image Analysis:</strong> The image is sent to our analysis service powered by Groq hardware on the Akash Network. Here, the image is analyzed based on the 14 criteria, generating ratings for each one.
              </li>
              <li>
                <strong>Data Storage:</strong> Your image and the analysis results are securely stored in DataStax. This ensures you can access your results whenever you like.
              </li>
              <li>
                <strong>Generating Explanations:</strong> We use the LlamaStack API to create detailed and easy-to-understand explanations for each rating. This helps you see exactly why each score was given.
              </li>
              <li>
                <strong>Delivering Results:</strong> The ratings and explanations are compiled into a clear report. This report is then presented to you on our website.
              </li>
            </ol>
            <h4 className="font-semibold mt-4 mb-2">Benefits of Our System</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Quick Results: Receive your analysis promptly without long waits.</li>
              <li>Easy to Use: Our website is designed for a smooth and straightforward experience.</li>
              <li>Clear Insights: Understand your analysis with detailed explanations.</li>
              <li>Reliable and Secure: Your data is stored safely, and the system is built to be dependable.</li>
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
