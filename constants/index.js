/**
 * Application Constants
 * Centralized configuration for the JomSound website
 * @module constants
 */

// =============================================================================
// SITE CONFIGURATION
// =============================================================================

export const SITE_CONFIG = {
  name: 'JomSound',
  title: 'JomSound - Professional Audio Engineering',
  description: 'Professional sound engineer and audio producer based in Manila, currently in Dubai, U.A.E',
  author: 'Jomz Portugal',
  email: 'jomz.portugal@gmail.com',
  phone: '+971 568700451',
  phoneAlt: '+63 9086144807',
  copyright: '2025 JomSound. All rights reserved.',
};

// =============================================================================
// NAVIGATION
// =============================================================================

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
];

// =============================================================================
// SOCIAL LINKS
// =============================================================================

export const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/mwlite/profile/in/jomsoundmnl',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/jomsound',
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    url: 'https://soundcloud.com/jomzportugal',
  },
];

// =============================================================================
// ABOUT SECTION
// =============================================================================

// Calculate years of experience dynamically from start year
const CAREER_START_YEAR = 2001;
const getYearsOfExperience = () => new Date().getFullYear() - CAREER_START_YEAR;

export const ABOUT_INFO = {
  title: 'About Me',
  get description() {
    return `An experienced sound engineer and audio producer based in Manila, Philippines, currently in Dubai, U.A.E, with over ${getYearsOfExperience()} years of expertise in sound design, music production, and audio post-production. The journey in the audio industry began in 2001 as a beat maker and hip-hop producer, evolving into a diverse and fulfilling career spanning radio imaging, in-store radio, TV commercials, and music production. Privileged to collaborate with prominent radio stations, high-profile brands, and talented artists, consistently delivering creative and high-quality soundscapes that bring ideas to life.`;
  },
  profileImage: '/image/profile.jpg',
};

export const PRODUCTION_TOOLS = [
  {
    id: 'protools',
    title: 'Avid Pro Tools',
    description: `Industry-standard DAW for music production, sound design, and audio post-production. Used for recording, editing, mixing, and producing high-quality audio content.`,
  },
  {
    id: 'tracks',
    title: 'IK Multimedia T-RackS',
    description: `Professional audio processing suite for mixing and mastering. Features versatile plugins including EQs, compressors, and limiters for achieving polished, professional sound.`,
  },
  {
    id: 'rx',
    title: 'iZotope RX',
    description: `Advanced audio repair and restoration software for cleaning up, restoring, and enhancing recordings. Essential for fixing noise, clicks, hums, and other audio issues.`,
  },
];

// =============================================================================
// PROJECTS SECTION - AUDIO FILES
// =============================================================================

export const AUDIO_CATEGORIES = [
  {
    id: 'radio-imaging',
    category: 'Radio Imaging',
    files: [
      { id: 'ri-1', title: 'Radio Imaging 1', src: '/audio/JOMSOUND%20FINAL%20MIX%202.wav' },
      { id: 'ri-2', title: 'Radio Imaging 2', src: '/audio/Radio%20Imaging%20Reel.wav' },
    ],
  },
  {
    id: 'radio-commercials',
    category: 'Radio Commercials',
    files: [
      { id: 'rc-1', title: 'Radio Commercial 1', src: '/audio/Radio%20Commercials.wav' },
    ],
  },
  {
    id: 'instore-radio',
    category: 'In-store Radio Branding',
    files: [
      { id: 'ir-1', title: 'In-store Radio Branding 1', src: '/audio/Radio%20Imaging%20Brand%202011.mp3' },
    ],
  },
  {
    id: 'remixes',
    category: 'Remixes And Remastered',
    files: [
      { id: 'rm-1', title: '16bit 44100Hz 1', src: '/audio/r1.wav' },
      { id: 'rm-2', title: '16bit 44100Hz 2', src: '/audio/r2.wav' },
      { id: 'rm-3', title: '16bit 44100Hz 3', src: '/audio/r3.wav' },
    ],
  },
  {
    id: 'jingles',
    category: 'Jingles',
    files: [
      { id: 'jg-1', title: 'Jingle 1', src: '/audio/j1.wav' },
      { id: 'jg-2', title: 'Jingle 2', src: '/audio/j2.wav' },
    ],
  },
];

// =============================================================================
// PROJECTS SECTION - VIDEO FILES
// =============================================================================

export const VIDEO_FILES = [
  {
    id: 'tv-1',
    title: 'TV Commercial 1',
    src: '/video/v2.mp4',
    poster: '/video/v2-thumbnail.jpg',
  },
  {
    id: 'tv-2',
    title: 'TV Commercial 2',
    src: '/video/v1.mp4',
    poster: '/video/v1-thumbnail.jpg',
  },
];

// =============================================================================
// HERO SECTION
// =============================================================================

export const HERO_CONFIG = {
  backgroundImage: '/image/bgStudio.jpg',
  roles: ['Radio Imaging', 'Sound Designer', 'Audio Engineer', 'Music Producer'],
  typingSpeed: 150,
  deletingSpeed: 40,
  pauseDuration: 1500,
};

// =============================================================================
// THEME CONFIGURATION
// =============================================================================

export const THEME = {
  colors: {
    accent: '#e63946',
    accentDark: '#c1121f',
    accentLight: '#ff6b6b',
    darkBg: '#0a0a0a',
    darkCard: '#141414',
    darkBorder: '#2a2a2a',
  },
  dark: {
    background: '#0a0a0a',
    backgroundSecondary: '#141414',
    text: '#ffffff',
    textSecondary: '#9ca3af',
    card: '#141414',
    border: '#2a2a2a',
  },
  light: {
    background: '#f9fafb',
    backgroundSecondary: '#ffffff',
    text: '#111827',
    textSecondary: '#6b7280',
    card: '#ffffff',
    border: '#e5e7eb',
  },
};

// =============================================================================
// EMAILJS CONFIGURATION
// =============================================================================

export const EMAILJS_CONFIG = {
  serviceId: 'service_niuvpyt',
  templateId: 'template_cqg7256',
  publicKey: 'JgHHZTPmXZ3sYQYfn',
  recipientEmail: 'jmportugal02@gmail.com',
};

// =============================================================================
// WAVEFORM CONFIGURATION
// =============================================================================

export const WAVEFORM_CONFIG = {
  barWidth: 2,
  barRadius: 2,
  barGap: 2,
  barMinHeight: 1,
  height: 32,
  cursorColor: 'transparent',
  waveColor: '#4a4a4a',
  progressColor: '#e63946',
  responsive: true,
};
