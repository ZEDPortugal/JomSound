import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaSoundcloud, FaTwitter, FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { SOCIAL_LINKS, HERO_CONFIG } from '../constants';

// Throttle utility for scroll performance
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Animated Waveform Background Component - Optimized for performance
const WaveformBackground = React.memo(() => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const lastFrameTime = useRef(0);
  const FPS_LIMIT = 30; // Limit to 30fps for better performance
  const frameInterval = 1000 / FPS_LIMIT;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Throttle resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Pre-calculate constants
    const bars = 60; // Reduced from 80
    const hue = 40;
    const saturation = 60;
    const lightness = 55;
    const alpha = 0.35;

    // Generate smoothly animated waveform pattern
    const generateWaveform = (time) => {
      const data = new Array(bars);
      for (let i = 0; i < bars; i++) {
        const wave1 = Math.sin(i * 0.3 + time * 0.3) * 40; // Slower animation
        const wave2 = Math.sin(i * 0.15 + time * 0.2) * 25;
        const wave3 = Math.cos(i * 0.2 + time * 0.25) * 20;
        data[i] = Math.abs(wave1 + wave2 + wave3) + 20;
      }
      return data;
    };

    const draw = (timestamp) => {
      // Frame rate limiting
      const elapsed = timestamp - lastFrameTime.current;
      if (elapsed < frameInterval) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime.current = timestamp - (elapsed % frameInterval);

      ctx.clearRect(0, 0, width, height);

      const time = timestamp / 1000;
      const data = generateWaveform(time);
      const barWidth = width / bars;
      const centerY = height / 2;

      // Batch draw operations
      ctx.beginPath();
      data.forEach((value, index) => {
        const barHeight = value * 2;
        const x = index * barWidth;

        const gradient = ctx.createLinearGradient(x, centerY - barHeight, x, centerY + barHeight);
        gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, 0)`);
        gradient.addColorStop(0.5, `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`);
        gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness}%, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(x, centerY - barHeight, barWidth - 2, barHeight * 2);
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6, willChange: 'transform' }}
    />
  );
});

WaveformBackground.displayName = 'WaveformBackground';

const SocialIcon = React.memo(({ id, url, index }) => {
  const iconMap = {
    linkedin: AiOutlineLinkedin,
    instagram: FaInstagram,
    soundcloud: FaSoundcloud,
    twitter: FaTwitter,
  };
  const IconComponent = iconMap[id];
  if (!IconComponent) return null;
  
  return (
    <motion.a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative text-gray-500 hover:text-white transition-colors duration-300"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 + index * 0.1, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <IconComponent size={18} />
    </motion.a>
  );
});

SocialIcon.displayName = 'SocialIcon';

SocialIcon.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  index: PropTypes.number,
};

// Memoized Equalizer to prevent unnecessary re-renders
const Equalizer = React.memo(() => (
  <div className="flex items-center gap-0.5 h-4">
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="w-0.5 bg-gold rounded-full"
        style={{ willChange: 'height' }}
        animate={{
          height: ['4px', '16px', '4px'],
        }}
        transition={{
          duration: 0.8, // Slightly slower for smoother feel
          repeat: Infinity,
          delay: i * 0.12,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
));

Equalizer.displayName = 'Equalizer';

const useTypingEffect = (words, options = {}) => {
  const { typingSpeed = 200, deletingSpeed = 10, pauseDuration = 100 } = options;
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(typingSpeed - Math.random() * 100);

  useEffect(() => {
    const tick = () => {
      const currentIndex = loopNum % words.length;
      const fullText = words[currentIndex];
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);
      setText(updatedText);
      
      if (!isDeleting && updatedText === fullText) {
        // Finished typing, pause before deleting
        setIsDeleting(true);
        setDelta(pauseDuration);
      } else if (isDeleting && updatedText === '') {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(typingSpeed);
      } else if (isDeleting) {
        // Currently deleting - use deletingSpeed
        setDelta(deletingSpeed);
      } else {
        // Currently typing - use typingSpeed with slight randomness
        setDelta(typingSpeed - Math.random() * 50);
      }
    };
    const ticker = setTimeout(tick, delta);
    return () => clearTimeout(ticker);
  }, [text, delta, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseDuration]);

  return { text, isDeleting };
};

// Audio Player Hook with scroll-based volume control
const useAudioPlayer = (audioSrc) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [baseVolume, setBaseVolume] = useState(0.7);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(audioSrc);
    audioRef.current.volume = baseVolume;
    audioRef.current.loop = false;
    audioRef.current.preload = 'metadata'; // Only load metadata initially for faster page load

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const prog = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(isNaN(prog) ? 0 : prog);
        setCurrentTime(audioRef.current.currentTime || 0);
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration || 0);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [audioSrc]);

  // Listen for other audio playing events
  useEffect(() => {
    const handleOtherAudioPlay = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('otherAudioPlaying', handleOtherAudioPlay);
    return () => window.removeEventListener('otherAudioPlaying', handleOtherAudioPlay);
  }, []);

  // Scroll-based volume control with throttling
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!audioRef.current || !isPlaying) return;
      
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const scrollRatio = Math.min(scrollY / heroHeight, 1);
      
      // Volume decreases as you scroll down (from baseVolume to 0.1)
      const newVolume = isMuted ? 0 : Math.max(0.1, baseVolume * (1 - scrollRatio * 0.8));
      audioRef.current.volume = newVolume;
    }, 50); // Throttle to 50ms

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying, isMuted, baseVolume]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Dispatch event to stop other audio
      window.dispatchEvent(new CustomEvent('heroAudioPlaying'));
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const seek = useCallback((percent) => {
    if (!audioRef.current) return;
    const time = (percent / 100) * audioRef.current.duration;
    if (isFinite(time)) {
      audioRef.current.currentTime = time;
    }
  }, []);

  return { isPlaying, isMuted, progress, currentTime, duration, togglePlay, toggleMute, seek, setBaseVolume };
};

// Format time in M:SS format
const formatTime = (seconds) => {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const Home = () => {
  const { text } = useTypingEffect(HERO_CONFIG.roles, {
    typingSpeed: HERO_CONFIG.typingSpeed,
    deletingSpeed: HERO_CONFIG.deletingSpeed,
    pauseDuration: HERO_CONFIG.pauseDuration,
  });

  const { isPlaying, isMuted, progress, currentTime, duration, togglePlay, toggleMute } = useAudioPlayer('/audio/JOMSOUND%20FINAL%20MIX%202.wav');

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-dark-bg overflow-hidden">
      {/* Static Waveform Background */}
      <WaveformBackground />
      
      {/* Bottom fade boundary */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent z-[15] pointer-events-none" />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card/30 to-dark-bg z-[1]" />
      
      {/* Subtle gold ambient glow - static for performance */}
      <div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px] z-[1] opacity-40"
      />
      
      {/* Left side - Social links - Hidden on mobile */}
      <motion.div 
        className="hidden md:flex absolute left-8 md:left-12 top-1/2 -translate-y-1/2 flex-col gap-6 z-20"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {SOCIAL_LINKS.map((link, index) => (
          <SocialIcon key={link.id} {...link} index={index} />
        ))}
      </motion.div>

      {/* Right side - Sound Engineer indicator - Hidden on mobile */}
      <motion.div 
        className="hidden md:flex absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-20"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <span className="text-gray-500 text-xs tracking-widest vertical-text">SOUND ENGINEER</span>
        <div className="w-px h-16 bg-gradient-to-b from-gray-500 to-transparent" />
      </motion.div>

      {/* Main content - Center */}
      <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-5xl mx-auto">
        {/* Small text above */}
        <motion.p 
          className="text-gray-500 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          I AM
        </motion.p>

        {/* Main name - Responsive typography */}
        <motion.h1 
          className="font-grotesk text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.15em] mb-4 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 50 }}
        >
          JOM<span className="text-gold">SOUND</span>
        </motion.h1>

        {/* Role with typing effect */}
        <motion.div 
          className="flex items-center justify-center gap-3 mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="text-gray-400 text-xs sm:text-sm md:text-base tracking-[0.15em] md:tracking-[0.2em] uppercase">
            A {text}
            <motion.span 
              className="text-white ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              |
            </motion.span>
          </span>
        </motion.div>

        {/* Audio player - Animated design with fixed width */}
        <motion.div 
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-center">
            {/* Left spacer to balance the mute button */}
            <div className="w-10 md:w-12" />
            
            <motion.button
              onClick={togglePlay}
              className={`group relative flex items-center justify-center w-44 sm:w-48 md:w-56 h-12 md:h-14 border overflow-hidden transition-colors duration-300 ${
                isPlaying 
                  ? 'border-gold/50 bg-gold/5' 
                  : 'border-gray-700 hover:border-gold'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Animated background pulse when playing */}
              <AnimatePresence>
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 bg-gold/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="playing"
                    className="flex items-center gap-3 relative z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Equalizer />
                    <span className="text-white text-[10px] sm:text-xs tracking-widest uppercase font-medium">Now Playing</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="paused"
                    className="flex items-center gap-3 relative z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaPlay className="text-white text-[10px] sm:text-xs" />
                    <span className="text-gray-400 group-hover:text-white text-[10px] sm:text-xs tracking-widest uppercase transition-colors">Listen</span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Animated border glow when playing */}
              <AnimatePresence>
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      boxShadow: [
                        '0 0 10px rgba(201,169,98,0.1), inset 0 0 10px rgba(201,169,98,0.02)',
                        '0 0 20px rgba(201,169,98,0.2), inset 0 0 20px rgba(201,169,98,0.05)',
                        '0 0 10px rgba(201,169,98,0.1), inset 0 0 10px rgba(201,169,98,0.02)',
                      ]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
            
            {/* Mute button container with fixed width to prevent layout shift */}
            <div className="w-10 md:w-12 flex items-center justify-center">
              <AnimatePresence>
                {isPlaying && (
                  <motion.button
                    onClick={toggleMute}
                    className="p-2 md:p-3 text-gray-500 hover:text-white transition-colors"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Progress bar */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div 
                className="w-44 sm:w-48 md:w-56"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="h-px bg-gray-800 w-full relative overflow-hidden">
                  <motion.div 
                    className="h-full bg-gold absolute left-0 top-0"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-400 text-[9px] sm:text-[10px] tracking-wider font-grotesk">{formatTime(currentTime)}</span>
                  <motion.span 
                    className="text-gold text-[8px] sm:text-[10px] tracking-wider truncate max-w-[100px] sm:max-w-none"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ♪ JOMSOUND
                  </motion.span>
                  <span className="text-gray-400 text-[9px] sm:text-[10px] tracking-wider font-grotesk">{formatTime(duration)}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Button */}
        <motion.div
          className="mt-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            onClick={() => {
              const contactSection = document.querySelector('#contacts');
              if (contactSection) {
                const top = contactSection.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: top - 80, behavior: 'smooth' });
              }
            }}
            className="group relative px-8 py-3 md:px-10 md:py-4 bg-gold text-dark-bg font-grotesk text-xs md:text-sm tracking-[0.2em] uppercase font-semibold overflow-hidden transition-all duration-300 hover:bg-gold/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Get In Touch</span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
              style={{ opacity: 0.2 }}
            />
          </motion.button>
        </motion.div>

        {/* Mobile social links */}
        <motion.div 
          className="flex md:hidden justify-center gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {SOCIAL_LINKS.map((link, index) => (
            <SocialIcon key={link.id} {...link} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.button
          onClick={() => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
              const top = aboutSection.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({ top: top - 80, behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span 
            className="text-gray-500 text-xs tracking-[0.2em] uppercase group-hover:text-gold transition-colors duration-300"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Scroll Down
          </motion.span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-2 group-hover:border-gold transition-colors duration-300"
            animate={{ borderColor: ['rgba(107, 114, 128, 0.5)', 'rgba(201, 169, 98, 0.5)', 'rgba(107, 114, 128, 0.5)'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-1 h-2 bg-gold rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* CSS for vertical text */}
      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </section>
  );
};

export default Home;
