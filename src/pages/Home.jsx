import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Rocket, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Home.css';

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
      origin: { y: 0.6 },
    });
    navigate('/stocks');
  };

  const tickers = ['STRF', 'YOLO', '$LAMBOS', 'MOON', 'LFG', '$GECKO'];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div 
          className="hero-bg"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80)',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="hero-content">
          <h1 className="hero-title">Stacks to the Moon! 🚀</h1>
          <p className="hero-description">
            The most outrageous trading simulator this side of Wall Street
          </p>
          <button className="start-trading-button" onClick={handleStartTrading}>
            <Rocket size={24} />
            <span>Start Trading</span>
          </button>
        </div>

        {/* Floating Tickers */}
        {tickers.map((ticker, i) => (
          <div
            key={ticker}
            className="floating-ticker"
            style={{
              left: `${(i * 20) + 10}%`,
              top: `${(i * 15) + 10}%`,
              animationDuration: `${5 + i}s`,
            }}
          >
            {ticker}
          </div>
        ))}
      </div>

      {/* How to Play Section */}
      <div className="how-to-play">
        <h2>
          Pump and Dump 101 <span className="disclaimer">*Not Financial Advice</span>
        </h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">
              <DollarSign size={48} />
            </div>
            <h3>Step 1: YOLO</h3>
            <p>
              Throw your virtual life savings into the most questionable stocks you can find.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">
              <TrendingUp size={48} />
            </div>
            <h3>Step 2: To The Moon</h3>
            <p>
              Watch your portfolio soar (or crash) in real-time with our totally realistic market simulator.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">
              <Rocket size={48} />
            </div>
            <h3>Step 3: Lambo Time</h3>
            <p>
              Earn something climb the leaderboard, and flex on the paper hands.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
