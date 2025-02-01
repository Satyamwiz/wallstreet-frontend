import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Rocket, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartTrading = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    navigate('/dashboard');
  };

  const tickers = ['STRF', 'YOLO', '$LAMBOS', 'MOON', 'LFG', '$GECKO'];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80)',
            transform: `translateY(${scrollY * 0.5}px)`,
            filter: 'brightness(0.3)'
          }}
        />
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-pulse">
            Stacks to the Moon! 🚀
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            The most outrageous trading simulator this side of Wall Street
          </p>
          <button
            onClick={handleStartTrading}
            className="bg-green-500 hover:bg-green-600 text-white text-xl px-8 py-4 rounded-lg transform transition hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Rocket className="h-6 w-6" />
            <span>Start Trading</span>
          </button>
        </div>

        {/* Floating Tickers */}
        <div className="absolute inset-0 pointer-events-none">
          {tickers.map((ticker, i) => (
            <div
              key={ticker}
              className="absolute text-2xl font-bold text-green-400 opacity-50"
              style={{
                left: `${(i * 20) + 10}%`,
                animation: `float ${5 + i}s infinite ease-in-out`,
                top: `${(i * 15) + 10}%`,
              }}
            >
              {ticker}
            </div>
          ))}
        </div>
      </div>

      {/* How to Play Section */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Pump and Dump 101 
          <span className="text-sm text-gray-400">*Not Financial Advice</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <DollarSign className="h-12 w-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Step 1: YOLO</h3>
            <p className="text-gray-400">
              Throw your virtual life savings into the most questionable stocks you can find
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <TrendingUp className="h-12 w-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Step 2: To The Moon</h3>
            <p className="text-gray-400">
              Watch your portfolio soar (or crash) in real-time with our totally realistic market simulator
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <Rocket className="h-12 w-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Step 3: Lambo Time</h3>
            <p className="text-gray-400">
              Earn badges, climb the leaderboard, and flex on the paper hands
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}