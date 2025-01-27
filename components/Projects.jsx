import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaPlay, FaPause, FaSpinner } from 'react-icons/fa'; // Import FaSpinner for loading icon
import WaveSurfer from 'wavesurfer.js';

const Projects = ({ isLight }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  const [videoProgress, setVideoProgress] = useState(0); // Track video progress

  const videoRefs = useRef([useRef(null), useRef(null)]);
  const [videoProgresses, setVideoProgresses] = useState([0, 0]); // Track video progress for each video
  const [isVideoPlaying, setIsVideoPlaying] = useState([false, false]); // Track playing state for each video

  const audioFiles = [
    { category: 'Radio Imaging', files: [
      { title: 'Radio Imaging 1', src: '/audio/JomSound%20Radio%20Imaging%20Demo%202025_01.mp3' },
      { title: 'Radio Imaging 2', src: '/audio/Radio%20Imaging%20Reel.wav' },
    ]},
    { category: 'Radio Commercials', files: [
      { title: 'Radio Commercial 1', src: '/audio/Radio%20Commercials.wav' },
    ]},
    { category: 'In-store Radio Branding', files: [
      { title: 'In-store Radio Branding 1', src: '/audio/Radio%20Imaging%20Brand%202011.mp3' },
    ]},
    { category: 'Remixes And Remastered', files: [
      { title: '16bit 44100Hz 1', src: '/audio/r1.wav' },
      { title: '16bit 44100Hz 2', src: '/audio/r2.wav' },
      { title: '16bit 44100Hz 3', src: '/audio/r3.wav' },
    ]},
    { category: 'Jingles', files: [
      { title: 'Jingle 1', src: '/audio/j1.wav' },
      { title: 'Jingle 2', src: '/audio/j2.wav' },
    ]},
  ];

  const audioRefs = useRef({});
  const [isPlaying, setIsPlaying] = useState(null); // Track playing state for each audio

  const waveSurferInstances = useRef({}); // Store WaveSurfer instances
  const [isAudioLoading, setIsAudioLoading] = useState({}); // Track loading state for each audio

  useEffect(() => {
    audioFiles.forEach((category, catIndex) => {
      category.files.forEach((audio, index) => {
        const uniqueKey = `${catIndex}-${index}`;
        setIsAudioLoading((prev) => ({ ...prev, [uniqueKey]: true })); // Set loading state to true initially
        const waveSurfer = WaveSurfer.create({
          container: `#waveform-${uniqueKey}`,
          waveColor: isLight ? '#000' : '#fff', // Background waveform color
          progressColor: '#f00', // Progress color (red as shown)
          cursorColor: 'transparent', // No cursor visible
          barWidth: 2, // Thin bars for the waveform
          barRadius: 2, // Slightly rounded bars
          barGap: 1, // Space between bars
          barMinHeight: 1, // Minimum height for small details
          height: 50, // Height of the waveform
          responsive: true, // Responsive design for dynamic resizing
        });
        waveSurfer.load(audio.src);
        waveSurferInstances.current[uniqueKey] = waveSurfer;

        waveSurfer.on('ready', () => {
          setIsAudioLoading((prev) => ({ ...prev, [uniqueKey]: false })); // Set loading state to false when ready
        });

        waveSurfer.on('seek', (progress) => {
          if (audioRefs.current[uniqueKey]) {
            audioRefs.current[uniqueKey].currentTime = progress * audioRefs.current[uniqueKey].duration;
          }
        });

        waveSurfer.on('finish', () => {
          setIsPlaying(null);
        });
      });
    });

    // Initialize WaveSurfer for the button at the bottom
    const waveSurferButton = WaveSurfer.create({
      container: '#waveform-circle-button-0',
      waveColor: isLight ? '#000' : '#fff',
      progressColor: '#f00',
      cursorColor: 'transparent',
      barWidth: 2, // Thin bars for the waveform
      barRadius: 2, // Slightly rounded bars
      barGap: 1, // Space between bars
      barMinHeight: 1, // Minimum height for small details
      height: 50, // Height of the waveform
      responsive: true, // Responsive design for dynamic resizing
    });
    waveSurferButton.load('/audio/b1.mp3');
    waveSurferInstances.current['circle-button-0'] = waveSurferButton;

    waveSurferButton.on('seek', (progress) => {
      if (audioRefs.current['circle-button-0']) {
        audioRefs.current['circle-button-0'].currentTime = progress * audioRefs.current['circle-button-0'].duration;
      }
    });

    waveSurferButton.on('finish', () => {
      setIsPlaying(null);
    });

    return () => {
      Object.values(waveSurferInstances.current).forEach((waveSurfer) => {
        if (waveSurfer) {
          waveSurfer.destroy();
        }
      });
      waveSurferInstances.current = {};
    };
  }, [isLight]);

  const togglePlay = (catIndex, index) => {
    const uniqueKey = `${catIndex}-${index}`;
    const waveSurfer = waveSurferInstances.current[uniqueKey];

    if (waveSurfer) {
      if (isPlaying === uniqueKey) {
        waveSurfer.pause();
        setIsPlaying(null);
      } else {
        if (isPlaying !== null) {
          const [prevCatIndex, prevIndex] = isPlaying.split('-');
          const prevKey = `${prevCatIndex}-${prevIndex}`;
          if (waveSurferInstances.current[prevKey]) {
            waveSurferInstances.current[prevKey].pause();
          }
        }
        waveSurfer.play();
        setIsPlaying(uniqueKey);
      }
    }
  };

  const toggleVideoPlay = (index) => {
    if (isVideoPlaying[index]) {
      videoRefs.current[index].current.pause();
    } else {
      videoRefs.current[index].current.play();
    }
    setIsVideoPlaying((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // Update video progress state when video time updates
  const handleVideoTimeUpdate = (index) => {
    const currentTime = videoRefs.current[index].current.currentTime;
    const duration = videoRefs.current[index].current.duration;
    setVideoProgresses((prev) => {
      const newProgresses = [...prev];
      newProgresses[index] = (currentTime / duration) * 100;
      return newProgresses;
    });
  };

  // Seek to specific time when user drags the progress bar
  const handleSeek = (e, index) => {
    const seekTime = (e.target.value / 100) * videoRefs.current[index].current.duration;
    if (isFinite(seekTime)) {
      videoRefs.current[index].current.currentTime = seekTime;
    }
  };

  return (
    <section id="projects" className={`projects-section ${isLight ? 'bg-[#e5e5e5]' : 'bg-[#080808]'} transition-colors duration-500`}>
      <div className={`container mx-auto py-5 font-newsCycle ${isLight ? 'text-black' : 'text-white'}`} style={{ fontFamily: 'Consolas, monospace' }}>
        <h2 className={`p-10 text-3xl font-bold mb-4 pb-5 ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>
          Audio
        </h2>
        {audioFiles.map((category, catIndex) => (
          <div key={catIndex} className={`category-section shadow-md mx-5 sm:mx-4 ${isLight ? 'bg-white' : 'bg-[#000000]'} mb-10 pb-10 pt-2 rounded-2xl`}>
            <h3 className={`text-2xl font-bold ml-12 ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>
              {category.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 item lg:grid-cols-2 gap-4 sm:px-10 px-3">
              {category.files.map((audio, index) => {
                const uniqueKey = `${catIndex}-${index}`;
                return (
                  <div
                    key={uniqueKey}
                    className={`audio-card px-4 mb-4 ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500 cursor-pointer ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700 ease-in-out`}
                  >
                    <div className="audio-player flex items-center justify-center relative">
                      <button
                        onClick={() => togglePlay(catIndex, index)}
                        className={`play-button ${isLight ? 'text-black' : 'text-white'} hover:text-red-500 transition-colors duration-300`}
                      >
                        {isAudioLoading[uniqueKey] ? <FaSpinner className="animate-spin text-[#f00]" /> : (isPlaying === uniqueKey ? <FaPause /> : <FaPlay />)}
                      </button>
                      <div
                        id={`waveform-${uniqueKey}`}
                        className="ml-4 w-full hover:cursor-pointer hover:opacity-75 transition-opacity duration-300"
                      ></div>
                    </div>
                    <h3 className="text-1xl mt-3 text-center">{audio.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        <h2 className={`p-10 text-3xl font-bold mb-4 pb-5 ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>
          Video
        </h2>

        {/* Featured Video Section */}
        <div className={`category-section shadow-md mx-5 sm:mx-4 pb-40 ${isLight ? 'bg-white' : 'bg-[#000000]'} mb-10 pb-10 pt-2 rounded-2xl`}>
          <h3 className={`text-2xl font-bold mb-4 ml-12 ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>
            TV Commercial
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-10">
            <div className="video-container relative w-full mt-10"> {/* Adjust margin-top */}
              {/* Video Title */}
              <div className="video-title mt-4">
                <p className={`text-lg ${isLight ? 'text-black' : 'text-white'} font-semibold`}>
                  TV Commercial 1
                </p>
              </div>
              {/* Video Player */}
              <div className="video-player relative w-full h-full ${isLight ? 'bg-white' : 'bg-black'} rounded-lg shadow-lg">
                <video
                  ref={videoRefs.current[0]}
                  className="relative w-full h-full object-cover rounded-lg"
                  src="video/v2.mp4"
                  loop
                  playsInline
                  preload="metadata"
                  loading="lazy"
                  poster="video/v2-thumbnail.jpg" // Add thumbnail
                  onTimeUpdate={() => handleVideoTimeUpdate(0)} // Track time updates
                />
                <div
                  id="play-button"
                  className="absolute inset-0 flex justify-center items-center text-white text-4xl hover:text-red-500 transition-colors duration-300"
                  onClick={() => toggleVideoPlay(0)}
                >
                  <button className="bg-black bg-opacity-50 p-4 rounded-full hover:bg-opacity-70">
                    {isVideoPlaying[0] ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
              </div>
              {/* Video Controls */}
              <div className="video-controls flex justify-between items-center mt-2">
                <div className="control-left flex items-center">
                  <button className="text-white hover:text-gray-400">
                    <i className="fa fa-volume-up"></i>
                  </button>
                </div>
                <div className="control-right flex items-center w-full">
                  <input
                    type="range"
                    className="w-full mx-2"
                    min="0"
                    max="100"
                    step="1"
                    value={videoProgresses[0]}
                    onChange={(e) => handleSeek(e, 0)} // Allow seeking
                  />
                </div>
              </div>
            </div>

            <div className="video-container relative w-full mt-10"> {/* Adjust margin-top */}
              {/* Video Title */}
              <div className="video-title mt-4">
                <p className={`text-lg ${isLight ? 'text-black' : 'text-white'} font-semibold`}>
                  TV Commercial 2
                </p>
              </div>
              {/* Video Player */}
              <div className="video-player relative w-full h-full ${isLight ? 'bg-white' : 'bg-black'} rounded-lg shadow-lg">
                <video
                  ref={videoRefs.current[1]}
                  className="relative w-full h-full object-cover rounded-lg"
                  src="/video/v1.mp4" // Ensure the correct path and format
                  loop
                  playsInline
                  preload="metadata"
                  loading="lazy"
                  poster="/video/v1-thumbnail.jpg" // Add thumbnail
                  onTimeUpdate={() => handleVideoTimeUpdate(1)} // Track time updates
                />
                <div
                  id="play-button"
                  className="absolute inset-0 flex justify-center items-center text-white text-4xl hover:text-red-500 transition-colors duration-300"
                  onClick={() => toggleVideoPlay(1)}
                >
                  <button className="bg-black bg-opacity-50 p-4 rounded-full hover:bg-opacity-70">
                    {isVideoPlaying[1] ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
              </div>
              {/* Video Controls */}
              <div className="video-controls flex justify-between items-center mt-2">
                <div className="control-left flex items-center">
                  <button className="text-white hover:text-gray-400">
                    <i className="fa fa-volume-up"></i>
                  </button>
                </div>
                <div className="control-right flex items-center w-full">
                  <input
                    type="range"
                    className="w-full mx-2"
                    min="0"
                    max="100"
                    step="1"
                    value={videoProgresses[1]}
                    onChange={(e) => handleSeek(e, 1)} // Allow seeking
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className={`p-10 mt-11 text-1xl italic font-bold mb-4 pb-5 ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>
          ...and many more! Honestly, I can't fit them all here. If you've been to a store or listened to the radio in the Philippines, you've probably already heard my work.
        </h2>
      </div>
      <div className="relative justify-items-center grid pb-10">
        <button
          onClick={() => togglePlay('circle-button', 0)}
          className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300"
        >
          {isPlaying === 'circle-button-0' ? <FaPause /> : <FaPlay />}
        </button>
        <div id="waveform-circle-button-0" className="hidden"></div>
      </div>
    </section>
  );
};

export default Projects;
