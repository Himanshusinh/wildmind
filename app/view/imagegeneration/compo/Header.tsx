import 'tailwindcss/tailwind.css' 
import React from 'react'

export default function HomePage() {
  return (
    <>
      {/* Example: A header or another component above */}
      <header className="bg-gray-900 text-white p-4">
        <h2>Header or Another Component</h2>
      </header>

      {/* Our glowing, rounded video banner */}
      <section
        className="
          relative flex items-center justify-center
          h-[40vh] w-[90vw] mx-auto my-8
          rounded-3xl bg-black overflow-hidden
        "
        style={{
          // Increase or decrease values to adjust glow intensity
          boxShadow: '0 0 70px 5px rgba(59,130,246,1)',
        }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/ImageGeneate/brain.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        {/* Text content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Introducing <span className="text-blue-500">Text to Video</span>
          </h1>
        </div>
      </section>

      
    </>
  )
}
