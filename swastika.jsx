import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function RomanticSurpriseExperience() {
  const [currentPage, setCurrentPage] = useState(0);
  const [imageRevealed, setImageRevealed] = useState(false);
  const [boxOpened, setBoxOpened] = useState(false);
  const [particles, setParticles] = useState([]);
  const [hearts, setHearts] = useState([]);

  // Create falling hearts
  useEffect(() => {
    const heartInterval = setInterval(() => {
      const newHeart = {
        id: Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: Math.random() * 2 + 3
      };
      setHearts(prev => [...prev, newHeart]);
    }, 300);

    return () => clearInterval(heartInterval);
  }, []);

  // Clean up old hearts
  useEffect(() => {
    const timeout = setTimeout(() => {
      setHearts(prev => prev.slice(-50));
    }, 10000);
    return () => clearTimeout(timeout);
  }, [hearts]);

  // Create burst particles
  const createBurst = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newParticles = Array.from({ length: 40 }).map((_, i) => {
      const angle = (i / 40) * Math.PI * 2;
      const velocity = 5 + Math.random() * 8;
      return {
        id: Math.random(),
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        type: Math.random() > 0.5 ? 'heart' : 'spark'
      };
    });

    setParticles(prev => [...prev, ...newParticles]);
  };

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.2,
            life: p.life - 0.02
          }))
          .filter(p => p.life > 0)
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % 3);
    setImageRevealed(false);
    setBoxOpened(false);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    setImageRevealed(false);
    setBoxOpened(false);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      {/* Particle burst effects */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-2 h-2"
            style={{
              left: p.x,
              top: p.y,
              opacity: p.life,
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {p.type === 'heart' ? (
              <span className="text-rose-400">♥</span>
            ) : (
              <span className="text-yellow-300">✨</span>
            )}
          </div>
        ))}
      </div>

      {/* Falling hearts background - ALL PAGES */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute animate-fall text-red-400 opacity-60"
            style={{
              left: `${heart.left}%`,
              fontSize: '24px',
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              fontWeight: 'bold'
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* PAGE 1: Make Her Feel Special */}
      {currentPage === 0 && (
        <div className="w-full h-screen bg-gradient-to-br from-red-950 via-red-900 to-red-950 relative overflow-hidden flex items-center justify-center">
          
          {/* Ambient glowing orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-3xl opacity-25"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

          {/* Content */}
          <div className="relative z-20 max-w-2xl px-6 text-center space-y-8">
            
            {/* Floating hearts icon */}
            <div className="flex justify-center gap-2 mb-8">
              {[0, 1, 2].map((i) => (
                <Heart
                  key={i}
                  className="w-12 h-12 text-rose-300 fill-rose-300 animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>

            {/* Main message */}
            <h1 className="text-6xl md:text-7xl font-light text-white leading-tight mb-6">
              There's Someone
              <br />
              <span className="bg-gradient-to-r from-rose-300 via-pink-300 to-red-300 bg-clip-text text-transparent">
                Absolutely Magical
              </span>
            </h1>

            {/* Divider */}
            <div className="h-1 w-32 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto"></div>

            {/* Emotional message */}
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-rose-100 font-light leading-relaxed">
                In this world full of ordinary moments, you shine with an extraordinary light.
              </p>
              
              <p className="text-lg text-rose-200/80 font-light">
                Not everyone gets to feel truly special. But you deserve to feel it every single day.
              </p>

              <p className="text-rose-300 text-sm tracking-widest font-light">
                This is your moment. This is your celebration.
              </p>
            </div>

            {/* Call to action */}
            <button
              onClick={nextPage}
              className="group mt-12 px-12 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-light rounded-full hover:shadow-2xl hover:shadow-rose-500/50 transform hover:scale-110 transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                Continue to Your Surprise
                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              </span>
            </button>

            {/* Page indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`rounded-full transition-all ${
                    currentPage === i
                      ? 'bg-rose-400 w-8 h-3'
                      : 'bg-rose-400/40 w-3 h-3 hover:bg-rose-400/70'
                  }`}
                />
              ))}
            </div>
          </div>

          <style>{`
            @keyframes fall {
              to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
              }
            }
            .animate-fall {
              animation: fall linear forwards;
            }
          `}</style>
        </div>
      )}

      {/* PAGE 2: Most Beautiful Girl - With Picture Reveal */}
      {currentPage === 1 && (
        <div className="w-full h-screen bg-gradient-to-br from-red-950 via-rose-950 to-red-950 relative overflow-hidden flex items-center justify-center">
          
          {/* Glowing orbs */}
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-rose-500 rounded-full mix-blend-screen filter blur-3xl opacity-25"></div>
          <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>

          {/* Content */}
          <div className="relative z-20 max-w-2xl px-6 text-center space-y-8 flex flex-col items-center">
            
            {/* Question */}
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">
              Who is the most
              <br />
              <span className="bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
                beautiful girl in the world?
              </span>
            </h2>

            {/* Divider */}
            <div className="h-1 w-24 bg-gradient-to-r from-rose-400 to-pink-400"></div>

            {/* Tap to reveal */}
            {!imageRevealed ? (
              <div className="mt-12 space-y-6">
                <p className="text-rose-200 text-lg font-light">
                  The answer might surprise you...
                </p>

                <button
                  onClick={(e) => {
                    createBurst(e);
                    setImageRevealed(true);
                  }}
                  className="group relative px-10 py-4 bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 text-white font-light rounded-full hover:shadow-2xl hover:shadow-rose-500/50 transform hover:scale-110 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    Tap to Reveal
                    <Heart className="w-5 h-5 group-hover:scale-150 transition-transform duration-300 fill-white" />
                  </span>
                </button>
              </div>
            ) : (
              <div className="mt-12 w-full animate-fadeIn space-y-6">
                {/* Picture frame with elegant styling */}
                <div className="relative group cursor-pointer">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-rose-400 via-pink-400 to-red-400 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Frame */}
                  <div className="relative bg-gradient-to-br from-rose-900 to-red-900 rounded-2xl p-2 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                    {/* Image placeholder - Replace with actual image URL */}
                    <div className="relative w-full aspect-square bg-gradient-to-br from-rose-500 via-pink-400 to-red-500 rounded-2xl overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="relative z-10 text-center space-y-4">
                        <Heart className="w-20 h-20 text-white mx-auto fill-white" />
                        <p className="text-white text-2xl font-light">
                          It's You
                        </p>
                        <p className="text-white/80 text-sm font-light">
                          (Upload your beautiful photo here)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message below photo */}
                <p className="text-rose-200 text-lg font-light">
                  ✨ The answer was always you ✨
                </p>

                {/* Continue button */}
                <button
                  onClick={nextPage}
                  className="group mt-8 px-10 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-light rounded-full hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    Next Surprise
                    <Sparkles className="w-5 h-5" />
                  </span>
                </button>
              </div>
            )}

            {/* Page indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`rounded-full transition-all ${
                    currentPage === i
                      ? 'bg-rose-400 w-8 h-3'
                      : 'bg-rose-400/40 w-3 h-3 hover:bg-rose-400/70'
                  }`}
                />
              ))}
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: scale(0.9);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
          `}</style>
        </div>
      )}

      {/* PAGE 3: Open the Surprise - Box Reveal */}
      {currentPage === 2 && (
        <div className="w-full h-screen bg-gradient-to-br from-red-950 via-red-900 to-red-950 relative overflow-hidden flex items-center justify-center">
          
          {/* Intense glowing orbs for final page */}
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '0.5s' }}></div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>

          {/* Content */}
          <div className="relative z-20 max-w-2xl px-6 text-center flex flex-col items-center justify-center space-y-8">
            
            {!boxOpened ? (
              <>
                {/* Mystery text */}
                <h2 className="text-5xl md:text-6xl font-light text-white mb-8">
                  One More
                  <br />
                  <span className="bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
                    Beautiful Surprise
                  </span>
                </h2>

                {/* Divider */}
                <div className="h-1 w-24 bg-gradient-to-r from-rose-400 to-pink-400 mb-12"></div>

                {/* Interactive Box */}
                <button
                  onClick={(e) => {
                    createBurst(e);
                    setBoxOpened(true);
                  }}
                  className="group relative w-40 h-40 perspective cursor-pointer transform hover:scale-110 transition-transform duration-300"
                >
                  {/* Box container */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-600 to-red-600 rounded-2xl shadow-2xl shadow-rose-500/50 overflow-hidden">
                    
                    {/* Box shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                    {/* Lid animation */}
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-rose-500 to-rose-600 group-hover:translate-y-2 transition-transform duration-300 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-yellow-300 animate-bounce" />
                    </div>

                    {/* Box content */}
                    <div className="absolute top-1/3 left-0 right-0 bottom-0 flex items-center justify-center flex-col space-y-2">
                      <p className="text-white font-light text-lg">Open the</p>
                      <p className="text-yellow-200 font-light text-sm">Surprise</p>
                    </div>
                  </div>
                </button>

                <p className="text-rose-200/80 font-light mt-8">
                  Click the box to reveal something special...
                </p>
              </>
            ) : (
              <div className="w-full animate-burst space-y-8">
                {/* Second picture reveal with animation */}
                <div className="space-y-6">
                  <h3 className="text-4xl md:text-5xl font-light text-white">
                    This is
                    <br />
                    <span className="bg-gradient-to-r from-yellow-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">
                      For You
                    </span>
                  </h3>

                  {/* Picture frame with animation */}
                  <div className="relative group mt-8">
                    {/* Intense glow */}
                    <div className="absolute -inset-6 bg-gradient-to-r from-yellow-400 via-rose-400 to-pink-400 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

                    {/* Frame */}
                    <div className="relative bg-gradient-to-br from-rose-900 to-red-900 rounded-3xl p-3 overflow-hidden transform group-hover:scale-110 transition-all duration-300">
                      {/* Image placeholder */}
                      <div className="relative w-full aspect-square bg-gradient-to-br from-yellow-400 via-rose-400 to-pink-500 rounded-3xl overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="relative z-10 text-center space-y-4">
                          <Sparkles className="w-24 h-24 text-white mx-auto animate-spin" />
                          <p className="text-white text-2xl font-light">
                            Your Magic Moment
                          </p>
                          <p className="text-white/80 text-sm font-light">
                            (Upload your second photo here)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Final message */}
                  <div className="space-y-4 mt-12">
                    <p className="text-2xl text-transparent bg-gradient-to-r from-yellow-300 via-rose-300 to-pink-300 bg-clip-text font-light">
                      ✨ You Are The Most beautiful lady ✨
                    </p>
                    
                   <p className="text-rose-200 font-light text-lg leading-relaxed">
                      Beautiful. Powerful. Unforgettable. That's who you are.
                    </p>

                    <p className="text-rose-300 text-sm font-light tracking-widest">
                      Keep shining exactly as you are.
                    </p>
                  </div>

                  {/* Restart button */}
                  <button
                    onClick={() => goToPage(0)}
                    className="group mt-12 px-10 py-4 bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 text-white font-light rounded-full hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Experience Again
                      <Heart className="w-5 h-5 fill-white group-hover:scale-150 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Page indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`rounded-full transition-all ${
                    currentPage === i
                      ? 'bg-rose-400 w-8 h-3'
                      : 'bg-rose-400/40 w-3 h-3 hover:bg-rose-400/70'
                  }`}
                />
              ))}
            </div>
          </div>

          <style>{`
            @keyframes burst {
              0% {
                opacity: 0;
                transform: scale(0.5) rotateX(90deg);
              }
              50% {
                transform: scale(1.1) rotateX(0deg);
              }
              100% {
                opacity: 1;
                transform: scale(1) rotateX(0deg);
              }
            }
            .animate-burst {
              animation: burst 1s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            @keyframes fall {
              to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
              }
            }
            .animate-fall {
              animation: fall linear forwards;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}


