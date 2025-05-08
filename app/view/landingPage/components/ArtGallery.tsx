'use client';
import React from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { SparklesCore } from "../ui/sparkles";

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '700'] 
});

const ArtGallery = () => {
  const galleryImages = [
    { id: 1, src: '/Landingpage/ArtGallery/img1.png' },
    { id: 2, src: '/Landingpage/ArtGallery/img2.png' },
    { id: 3, src: '/Landingpage/ArtGallery/img3.png' },
    { id: 4, src: '/Landingpage/ArtGallery/img4.png' },
    { id: 5, src: '/Landingpage/ArtGallery/img5.png' },
    { id: 6, src: '/Landingpage/ArtGallery/img6.png' },
    { id: 7, src: '/Landingpage/ArtGallery/img7.png' },
    { id: 8, src: '/Landingpage/ArtGallery/img8.png' },
    { id: 9, src: '/Landingpage/ArtGallery/img9.png' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center overflow-hidden bg-black">
      {/* Title */}
      <h1
        className={`text-white text-4xl md:text-6xl font-bold z-40 mb:text-2xl mb:mt-8 mb:mb-4 ${poppins.className}`}
        style={{ textAlign: 'center' }}
      >
        Art Gallery
      </h1>

      {/* Top Image */}
      <div className="w-full z-30 ">
        <Image
          src="/Landingpage/ArtGallery/topimage.png"
          alt="Top Decorative Path"
          width={1920}
          height={1080}
          className="w-full object-cover"
        />
      </div>

      {/* Scrolling Gallery */}
      <div className="w-full overflow-hidden relative z-10 mt-4 mb-4">
        <div
          className="flex gap-4 animate-scroll"
          style={{
            animation: `scrollAnimation 15s linear infinite`,
            width: 'max-content',
          }}
        >
          {[...galleryImages, ...galleryImages].map((image, index) => (
            <div
              key={`image-${index}`}
              className="flex-shrink-0 w-[300px] h-[500px] mb:w-[160px] mb:h-[240px]"
            >
              <Image
                src={image.src}
                alt={`Artwork ${image.id}`}
                width={400}
                height={750}
                className="w-full h-full rounded-lg object-cover shadow-2xl"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Image */}
      <div className="w-full z-30 mb:mt-4">
        <Image
          src="/Landingpage/ArtGallery/bottomimage.png"
          alt="Bottom Decorative Path"
          width={1920}
          height={1080}
          className="w-full object-cover"
        />
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes scrollAnimation {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default ArtGallery;
