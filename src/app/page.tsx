// src/app/page.tsx
// URL: /

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 relative">
        <div className="flex justify-center items-center mb-8">
          {/* Left image - visible only on desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-full -rotate-6 z-0">
            <Image
              src="/images/treesample1.png"
              alt="Sample Artwork 1"
              width={250}
              height={250}
              className="w-full h-auto rounded-xl shadow-md opacity-70"
            />
          </div>

          {/* Center logo */}
          <div className="w-full sm:w-auto bg-white p-6 rounded-xl shadow-sm border relative z-10">
            <Image
              src="/feats-logo.png"
              alt="FEATS Logo"
              width={300}
              height={300}
              className="w-full h-auto sm:w-[300px] sm:h-[300px] rounded-full"
            />
          </div>

          {/* Right image - visible only on desktop */}
          <div className="hidden md:block absolute left-1/2 transform rotate-6 z-0">
            <Image
              src="/images/treesample1r.png"
              alt="Sample Artwork 2"
              width={250}
              height={250}
              className="w-full h-auto rounded-xl shadow-md opacity-70"
            />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 px-4">
          Formal Elements Art Therapy Scale
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
          A standardized approach to analyzing artwork in therapeutic settings,
          providing measurable insights for art therapists and mental health professionals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
          <Link
            href="/try-it"
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try It
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto bg-white text-blue-600 px-8 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Learn More
          </Link>
          <Link
            href="/signup"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Standardized Assessment</h3>
          <p className="text-gray-600">
            14 distinct scales for comprehensive artwork analysis and evaluation.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
          <p className="text-gray-600">
            Transform qualitative observations into quantifiable data points.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Research Ready</h3>
          <p className="text-gray-600">
            Built on validated research methodology for reliable clinical application.
          </p>
        </div>
      </section>

      {/* Research Section */}
      <section className="bg-gray-50 -mx-4 px-4 py-12 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Evidence-Based Approach
          </h2>
          <p className="text-gray-600">
            FEATS has been developed through extensive research and validation in clinical settings.
            The scale provides art therapists with a reliable tool for assessing and documenting
            client progress through their artwork.
          </p>
          <Link
            href="/research"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            View Research Findings
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 px-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Ready to Experience FEATS?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Try our interactive demo to see how FEATS can enhance your art therapy practice.
        </p>
        <Link
          href="/try-it"
          className="inline-block bg-blue-600 text-white px-8 py-4 text-lg rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try FEATS Now
        </Link>
      </section>
    </div>
  )
}

