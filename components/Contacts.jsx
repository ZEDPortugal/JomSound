import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaRegCopyright, FaInstagram, FaSoundcloud, FaLinkedin } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { SITE_CONFIG, SOCIAL_LINKS } from '../constants';

const ContactCard = ({ icon: Icon, title, value, href, index }) => (
  <motion.a 
    href={href}
    className="group flex items-center gap-4 p-6 rounded-2xl bg-dark-card border border-dark-border hover:border-gold/30 transition-all duration-300"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: false }}
    transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
    whileHover={{ x: 10, boxShadow: '0 10px 30px rgba(201, 169, 98, 0.1)' }}
    whileTap={{ scale: 0.98 }}
  >
    <motion.div 
      className="p-3 rounded-xl bg-gold/10 border border-gold/20 group-hover:bg-gold group-hover:border-gold transition-all duration-300"
      whileHover={{ rotate: [0, -10, 10, 0] }}
      transition={{ duration: 0.4 }}
    >
      <Icon className="text-xl text-gold group-hover:text-dark-bg transition-colors duration-300" />
    </motion.div>
    <div>
      <p className="text-gray-500 text-sm font-sans">{title}</p>
      <p className="text-white font-grotesk font-medium group-hover:text-gold transition-colors duration-300">{value}</p>
    </div>
  </motion.a>
);

ContactCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  index: PropTypes.number,
};

const SocialLink = ({ id, url, name, index }) => {
  const icons = {
    linkedin: FaLinkedin,
    instagram: FaInstagram,
    soundcloud: FaSoundcloud,
  };
  const Icon = icons[id];
  if (!Icon) return null;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group p-4 rounded-xl bg-dark-card border border-dark-border hover:border-gold hover:bg-gold/5 transition-all duration-300"
      aria-label={name}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon className="text-2xl text-gray-400 group-hover:text-gold transition-colors duration-300" />
    </motion.a>
  );
};

SocialLink.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number,
};

const Contacts = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <footer id="contacts" className="relative py-20 bg-dark-bg border-t border-dark-border overflow-hidden">
      {/* Top fade boundary */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-dark-bg to-transparent z-10 pointer-events-none" />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <motion.span 
              className="inline-block px-4 py-2 rounded-full glass border border-white/10 text-gray-400 text-sm font-medium tracking-wider mb-6"
              whileHover={{ scale: 1.05 }}
            >
              GET IN TOUCH
            </motion.span>
            <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Create <span className="text-gold">Together</span>
            </h2>
            <p className="text-gray-400 mb-10 max-w-md font-sans">
              Have a project in mind? I'd love to hear about it. Whether it's radio imaging, 
              TV commercials, or music production, let's bring your vision to life.
            </p>

            <div className="space-y-4">
              <ContactCard
                icon={FaEnvelope}
                title="Email"
                value={SITE_CONFIG.email}
                href={'mailto:' + SITE_CONFIG.email}
                index={0}
              />
              <ContactCard
                icon={FaPhone}
                title="Phone (UAE)"
                value={SITE_CONFIG.phone}
                href={'tel:' + SITE_CONFIG.phone.replace(/\s/g, '')}
                index={1}
              />
              <ContactCard
                icon={FaPhone}
                title="Phone (PH)"
                value={SITE_CONFIG.phoneAlt}
                href={'tel:' + SITE_CONFIG.phoneAlt.replace(/\s/g, '')}
                index={2}
              />
              <ContactCard
                icon={HiLocationMarker}
                title="Location"
                value="Dubai, U.A.E"
                href="#"
                index={3}
              />
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <motion.div 
              className="p-8 rounded-3xl glass border border-gold/20"
              whileHover={{ boxShadow: '0 20px 40px rgba(201, 169, 98, 0.1)' }}
            >
              <h3 className="font-grotesk text-2xl font-bold text-white mb-6">
                Connect With Me
              </h3>
              <p className="text-gray-400 mb-8 font-sans">
                Follow my work and stay updated with my latest projects.
              </p>
              
              <div className="flex gap-4 mb-8">
                {SOCIAL_LINKS.map((link, index) => (
                  <SocialLink key={link.id} {...link} index={index} />
                ))}
              </div>

              <motion.div 
                className="p-6 rounded-2xl bg-dark-card border border-gold/20"
                animate={{ borderColor: ['rgba(201, 169, 98, 0.2)', 'rgba(201, 169, 98, 0.4)', 'rgba(201, 169, 98, 0.2)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-gold"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-gray-300 font-sans">Available for new projects</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 text-gray-500">
            <FaRegCopyright className="text-gold" />
            <span className="font-sans">{SITE_CONFIG.copyright}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 font-sans">
            <span>Crafted with</span>
            <motion.span 
              className="text-gold"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ♪
            </motion.span>
            <span>by {SITE_CONFIG.author}</span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Contacts;
