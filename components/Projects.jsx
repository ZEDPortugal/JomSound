import React, { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPlay, FaPause, FaSpinner, FaVolumeUp, FaVideo } from 'react-icons/fa';
import { HiMusicNote } from 'react-icons/hi';
import { AUDIO_CATEGORIES, VIDEO_FILES } from '../constants';

// Generate stable pseudo-random heights for visualization bars
const generateBarHeights = (count) => {
  const heights = [];
  for (let i = 0; i < count; i++) {
    // Use sine wave pattern for a more audio-waveform-like look
    const baseHeight = 40 + Math.sin(i * 0.5) * 20 + Math.sin(i * 0.3) * 15;
    heights.push(Math.min(100, Math.max(30, baseHeight + (i % 3) * 10)));
  }
  return heights;
};

const BAR_HEIGHTS = generateBarHeights(50);

// Simple progress bar component for audio - no heavy waveform rendering
const SimpleAudioProgress = memo(({ progress, onSeek, isReady }) => {
  const handleClick = (e) => {
    if (!isReady || !onSeek) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    onSeek(Math.max(0, Math.min(100, percent)));
  };

  return (
    <div 
      className="relative h-8 w-full cursor-pointer flex items-center"
      onClick={handleClick}
    >
      {/* Background bars - static visualization */}
      <div className="absolute inset-0 flex items-center gap-[2px]">
        {BAR_HEIGHTS.map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm transition-colors duration-150"
            style={{
              height: `${height}%`,
              backgroundColor: progress > (i / 50) * 100 ? '#c9a962' : '#4a4a4a',
            }}
          />
        ))}
      </div>
    </div>
  );
});

SimpleAudioProgress.displayName = 'SimpleAudioProgress';

const AudioPlayer = memo(({ audio, uniqueKey, isPlaying, isLoading, progress, onToggle, onSeek, index }) => {
  return (
    <motion.div 
      className="group relative p-6 rounded-2xl bg-dark-card border border-dark-border hover:border-white/20 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}
    >
      <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex items-center gap-4">
        <motion.button
          onClick={onToggle}
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isPlaying 
              ? 'bg-gold text-dark-bg shadow-glow' 
              : 'bg-dark-border text-gray-400 hover:bg-gold hover:text-dark-bg'
          }`}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isLoading ? (
            <FaSpinner className="animate-spin" />
          ) : isPlaying ? (
            <FaPause />
          ) : (
            <FaPlay className="ml-1" />
          )}
        </motion.button>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-grotesk font-medium mb-2 truncate group-hover:text-gold transition-colors duration-300">
            {audio.title}
          </h3>
          <SimpleAudioProgress 
            progress={progress || 0} 
            onSeek={onSeek}
            isReady={!isLoading}
          />
        </div>
      </div>
    </motion.div>
  );
});

AudioPlayer.displayName = 'AudioPlayer';

AudioPlayer.propTypes = {
  audio: PropTypes.object.isRequired,
  uniqueKey: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  progress: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
  onSeek: PropTypes.func,
  index: PropTypes.number,
};

const VideoPlayer = ({ video, index, isPlaying, progress, onToggle, onSeek }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      onSeek(index, currentProgress, false);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const seekTime = (e.target.value / 100) * videoRef.current.duration;
      if (isFinite(seekTime)) {
        videoRef.current.currentTime = seekTime;
      }
    }
  };

  return (
    <motion.div 
      className="group relative rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-white/20 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100, damping: 20 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={video.src}
          loop
          playsInline
          preload="metadata"
          poster={video.poster}
          onTimeUpdate={handleTimeUpdate}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />
        
        <motion.div
          className="absolute inset-0 flex justify-center items-center cursor-pointer"
          onClick={onToggle}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isPlaying 
                ? 'bg-gold/90 text-dark-bg' 
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-gold hover:text-dark-bg'
            }`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="ml-1" />}
          </motion.div>
        </motion.div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-grotesk font-medium mb-3 group-hover:text-gold transition-colors duration-300">
          {video.title}
        </h3>
        
        <div className="relative h-1">
          <div className="absolute inset-0 bg-dark-border rounded-full" />
          <div 
            className="absolute top-0 left-0 h-full bg-gold rounded-full transition-all duration-100"
            style={{ width: `${progress || 0}%` }}
          />
          <input
            type="range"
            className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-10
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-gold
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:shadow-gold/30
              hover:[&::-webkit-slider-thumb]:scale-125
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:duration-200
              [&::-moz-range-thumb]:w-3
              [&::-moz-range-thumb]:h-3
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-gold
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer"
            min="0"
            max="100"
            step="1"
            value={progress || 0}
            onChange={handleSeek}
          />
        </div>
      </div>
    </motion.div>
  );
};

VideoPlayer.propTypes = {
  video: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
  onSeek: PropTypes.func.isRequired,
};

const Projects = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isAudioLoading, setIsAudioLoading] = useState({});
  const [audioProgress, setAudioProgress] = useState({});
  const [videoProgresses, setVideoProgresses] = useState(VIDEO_FILES.map(() => 0));
  const [videoPlaying, setVideoPlaying] = useState(VIDEO_FILES.map(() => false));
  const audioRefs = useRef({});

  // Clean up audio elements on unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
      audioRefs.current = {};
    };
  }, []);

  // Get or create audio element for a track
  const getAudioElement = useCallback((catIndex, index, src) => {
    const uniqueKey = catIndex + '-' + index;
    
    if (!audioRefs.current[uniqueKey]) {
      const audio = new Audio();
      audio.preload = 'metadata'; // Only load metadata initially
      audio.src = src;
      
      audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
          setAudioProgress(prev => ({
            ...prev,
            [uniqueKey]: (audio.currentTime / audio.duration) * 100
          }));
        }
      });
      
      audio.addEventListener('ended', () => {
        setCurrentlyPlaying(null);
        setAudioProgress(prev => ({ ...prev, [uniqueKey]: 0 }));
      });
      
      audio.addEventListener('canplay', () => {
        setIsAudioLoading(prev => ({ ...prev, [uniqueKey]: false }));
      });
      
      audio.addEventListener('waiting', () => {
        setIsAudioLoading(prev => ({ ...prev, [uniqueKey]: true }));
      });
      
      audio.addEventListener('playing', () => {
        setIsAudioLoading(prev => ({ ...prev, [uniqueKey]: false }));
      });
      
      audioRefs.current[uniqueKey] = audio;
    }
    
    return audioRefs.current[uniqueKey];
  }, []);

  const toggleAudio = useCallback((catIndex, index, src) => {
    const uniqueKey = catIndex + '-' + index;
    const audio = getAudioElement(catIndex, index, src);

    if (currentlyPlaying === uniqueKey) {
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      // Stop hero audio
      window.dispatchEvent(new CustomEvent('otherAudioPlaying'));
      
      // Pause currently playing audio
      if (currentlyPlaying) {
        const prevAudio = audioRefs.current[currentlyPlaying];
        if (prevAudio) prevAudio.pause();
      }
      
      // Pause all videos
      setVideoPlaying(VIDEO_FILES.map(() => false));
      
      // Play new audio
      setIsAudioLoading(prev => ({ ...prev, [uniqueKey]: true }));
      audio.play().catch(err => {
        console.error('Audio playback failed:', err);
        setIsAudioLoading(prev => ({ ...prev, [uniqueKey]: false }));
      });
      setCurrentlyPlaying(uniqueKey);
    }
  }, [currentlyPlaying, getAudioElement]);

  const seekAudio = useCallback((catIndex, index, percent) => {
    const uniqueKey = catIndex + '-' + index;
    const audio = audioRefs.current[uniqueKey];
    
    if (audio && audio.duration) {
      audio.currentTime = (percent / 100) * audio.duration;
      setAudioProgress(prev => ({ ...prev, [uniqueKey]: percent }));
    }
  }, []);

  const toggleVideo = useCallback((index) => {
    // Stop hero audio
    window.dispatchEvent(new CustomEvent('otherAudioPlaying'));
    
    if (currentlyPlaying) {
      const [prevCat, prevIdx] = currentlyPlaying.split('-');
      waveSurferInstances.current[prevCat + '-' + prevIdx]?.pause();
      setCurrentlyPlaying(null);
    }
    
    setVideoPlaying(prev => {
      const newState = prev.map((v, i) => i === index ? !v : false);
      return newState;
    });
  }, [currentlyPlaying]);

  const handleVideoProgress = useCallback((index, progress, fromSeek) => {
    setVideoProgresses(prev => {
      const newProgresses = [...prev];
      newProgresses[index] = progress;
      return newProgresses;
    });
  }, []);

  return (
    <section id="projects" ref={ref} className="relative py-24 bg-dark-bg overflow-hidden">
      {/* Top fade boundary */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-dark-bg to-transparent z-10 pointer-events-none" />
      {/* Bottom fade boundary */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-bg to-transparent z-10 pointer-events-none" />
      
      {/* Static ambient glows - no animation for performance */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-gold/5 rounded-full blur-[80px] opacity-60" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[80px] opacity-60" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-gold/10 border border-gold/20">
              <FaVolumeUp className="text-2xl text-gold" />
            </div>
            <div>
              <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-white">
                Audio <span className="text-gold">Projects</span>
              </h2>
              <p className="text-gray-500 text-sm mt-1 font-sans">Listen to my sound engineering work</p>
            </div>
          </div>

          {AUDIO_CATEGORIES.map((category, catIndex) => (
            <motion.div
              key={category.id}
              className="mb-10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1, type: 'spring', stiffness: 100, damping: 20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <HiMusicNote className="text-gold" />
                <h3 className="font-grotesk text-xl font-semibold text-white">
                  {category.category}
                </h3>
                <motion.div 
                  className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.files.map((audio, index) => {
                  const uniqueKey = catIndex + '-' + index;
                  return (
                    <AudioPlayer
                      key={uniqueKey}
                      audio={audio}
                      uniqueKey={uniqueKey}
                      isPlaying={currentlyPlaying === uniqueKey}
                      isLoading={isAudioLoading[uniqueKey] || false}
                      progress={audioProgress[uniqueKey] || 0}
                      onToggle={() => toggleAudio(catIndex, index, audio.src)}
                      onSeek={(percent) => seekAudio(catIndex, index, percent)}
                      index={index}
                    />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-gold/10 border border-gold/20">
              <FaVideo className="text-2xl text-gold" />
            </div>
            <div>
              <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-white">
                Video <span className="text-gold">Projects</span>
              </h2>
              <p className="text-gray-500 text-sm mt-1 font-sans">Watch my TV commercial work</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VIDEO_FILES.map((video, index) => (
              <VideoPlayer
                key={video.id}
                video={video}
                index={index}
                isPlaying={videoPlaying[index]}
                progress={videoProgresses[index]}
                onToggle={() => toggleVideo(index)}
                onSeek={handleVideoProgress}
              />
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div className="inline-block px-8 py-6 rounded-2xl glass border border-gold/20 hover:scale-[1.02] transition-transform duration-300">
            <p className="text-gray-400 italic font-sans">
              ...and many more! If you have been to a store or listened to the radio in the Philippines, 
              <span className="text-gold font-medium"> you have probably already heard my work.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
