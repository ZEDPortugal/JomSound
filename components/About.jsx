import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTools, FaMicrophoneAlt, FaWaveSquare } from 'react-icons/fa';
import { SiProtools } from 'react-icons/si';
import { ABOUT_INFO, PRODUCTION_TOOLS } from '../constants';

// Calculate years of experience dynamically
const CAREER_START_YEAR = 2001;
const getYearsOfExperience = () => new Date().getFullYear() - CAREER_START_YEAR;

const ToolCard = ({ tool, index }) => {
  const icons = [SiProtools, FaWaveSquare, FaMicrophoneAlt];
  const IconComponent = icons[index] || FaTools;

  return (
    <motion.div
      className="group relative p-8 rounded-2xl bg-dark-card border border-dark-border hover:border-white/20 transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
    >
      <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div 
        className="relative mb-6"
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-300">
          <IconComponent className="text-2xl text-gold" />
        </div>
      </motion.div>

      <h3 className="relative text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
        {tool.title}
      </h3>
      <motion.div 
        className="h-px bg-gold/50 rounded mb-4"
        initial={{ width: 48 }}
        whileHover={{ width: 80 }}
        transition={{ duration: 0.3 }}
      />
      <p className="relative text-gray-400 text-sm leading-relaxed">
        {tool.description}
      </p>
    </motion.div>
  );
};

ToolCard.propTypes = {
  tool: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const StatCard = ({ value, label, index }) => (
  <motion.div 
    className="text-center p-4 rounded-xl bg-dark-card border border-dark-border hover:border-gold/30 transition-all duration-300"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: false }}
    transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
    whileHover={{ scale: 1.05, y: -5 }}
  >
    <motion.div 
      className="text-2xl font-bold text-gold mb-1"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
    >
      {value}
    </motion.div>
    <div className="text-xs text-gray-500 uppercase tracking-wider font-grotesk">{label}</div>
  </motion.div>
);

StatCard.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="about" ref={ref} className="relative py-24 bg-dark-bg overflow-hidden">
      {/* Top fade boundary */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-dark-bg to-transparent z-10 pointer-events-none" />
      {/* Bottom fade boundary */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-bg to-transparent z-10 pointer-events-none" />
      
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass border border-white/10 text-gray-400 text-sm font-medium tracking-wider mb-4"
            whileHover={{ scale: 1.05 }}
          >
            ABOUT ME
          </motion.span>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-white mb-4">
            Passionate About <span className="text-gold">Sound</span>
          </h2>
          <motion.div 
            className="h-px w-24 bg-gradient-to-r from-gold to-transparent rounded mx-auto"
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : { width: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <div className="relative group">
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-white/5 to-gray-500/10 rounded-3xl blur-2xl"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500">
                <motion.img
                  className="w-full h-auto object-cover"
                  src={ABOUT_INFO.profileImage}
                  alt="Profile"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />
              </div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl glass-dark border border-gold/20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-gold"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                >
                  {getYearsOfExperience()}
                </motion.div>
                <div className="text-sm text-gray-400 font-grotesk">Years Experience</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <h3 className="font-grotesk text-2xl font-bold text-white mb-6">
              {ABOUT_INFO.title}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-8 font-sans">
              {ABOUT_INFO.description}
            </p>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '500+', label: 'Projects' },
                { value: '50+', label: 'Brands' },
                { value: '100+', label: 'Artists' },
              ].map((stat, index) => (
                <StatCard key={stat.label} {...stat} index={index} />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className="text-center mb-12">
            <h3 className="font-grotesk text-3xl font-bold text-white mb-4">
              Production <span className="text-gold">Tools</span>
            </h3>
            <p className="text-gray-500 max-w-2xl mx-auto font-sans">
              Industry-standard software I use to craft professional audio experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTION_TOOLS.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
