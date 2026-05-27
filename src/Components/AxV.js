import React, { useEffect, useState } from "react";
import { Heart, Sparkles } from "lucide-react";

export default function AnniversaryCard() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 400);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50 to-pink-100 flex items-center justify-center overflow-hidden px-4 relative">
      
      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <Heart className="text-pink-400 w-6 h-6 fill-pink-300" />
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div
        className={`relative transition-all duration-1000 ${
          show
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="w-[380px] md:w-[500px] bg-white/80 backdrop-blur-xl border border-white rounded-[40px] shadow-2xl overflow-hidden">
          
          {/* Top Image */}
          <div className="relative h-[260px] overflow-hidden">
            <img
              src="https://images.u"
              alt="couple"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            <div className="absolute bottom-5 left-5 text-white">
              <h1 className="text-3xl font-bold tracking-wide">
                Happy Anniversary ❤️
              </h1>
              <p className="text-sm opacity-90 mt-1">
                1 Year & 6 Months Together ✨
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center relative">
            <div className="flex justify-center mb-4">
              <div className="bg-pink-100 p-4 rounded-full shadow-md animate-pulse">
                <Heart className="w-8 h-8 text-pink-500 fill-pink-400" />
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              To My Favourite Person 💕
            </h2>

            <p className="text-gray-600 leading-8 text-[15px]">
              Every moment with you feels special.  
              Thank you for all the love, care, laughter,
              and memories we created together.  
              These 1.5 years have been the most beautiful part of my life.
              <br />
              <br />
              And honestly…  
              I still fall for you a little more every single day ❤️
            </p>

            {/* Button */}
            <button className="mt-8 group relative px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Forever With You
                <Sparkles className="w-5 h-5" />
              </span>

              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}