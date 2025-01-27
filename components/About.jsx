import React from 'react';
import { useInView } from 'react-intersection-observer';

const About = ({ isLight }) => {
    const { ref, inView } = useInView({
        triggerOnce: false, // Ensure the animation retriggers
        threshold: 0.1, // Activate when 10% of the section is visible
    });

    return (
        <section
            id="about"
            ref={ref}
            className={`about-section flex flex-col items-center justify-center ${isLight ? 'bg-gray-100' : 'bg-[#0e0e0e]'} transition-colors duration-500`}
        >
            <div className="container px-5 mx-auto py-10 font-newsCycle" style={{ fontFamily: 'Consolas, monospace' }}>
            
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-10">
                    <div className={`p-6 rounded-lg shadow-lg ${isLight ? 'bg-white' : 'bg-[#1b1b1b]'} transition-colors duration-500 ${inView ? 'animate-fade-in delay-1' : 'opacity-0'}`} style={{ height: 'auto' }}>
                        <h3 className={`text-xl font-bold mb-2 ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>About Me</h3>
                        <div className={`border-t-2 my-2 ${isLight ? 'border-black' : 'border-white'} transition-colors duration-500 `}></div>
                        <p className={`text-sm ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>
                        An experienced sound engineer and audio producer based in Manila with over 19 years of expertise in sound design, music production, and audio post-production.
The journey in the audio industry began in 2001 as a beat maker and hip-hop producer, evolving into a diverse and fulfilling career spanning radio imaging, in-store radio, TV commercials, and music production.
Privileged to collaborate with prominent radio stations, high-profile brands, and talented artists, consistently delivering creative and high-quality soundscapes that bring ideas to life.
                        </p>
                    </div>
                </div>


                <h2
                    className={`text-3xl font-bold my-6 ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500 ${
                        inView ? '' : 'opacity-0'
                    }`}
                >
                    Production Tools
                </h2>
                {/* 3-Column Card Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    <div className={`p-6 rounded-lg shadow-lg ${isLight ? 'bg-white' : 'bg-[#1b1b1b]'} transition-colors duration-500 ${inView ? 'animate-fade-in delay-4' : 'opacity-0'}`}>
                        <h3 className={`text-xl font-bold mb-2 ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>Avid Pro tools</h3>
                        <div className={`border-t-2 my-2 ${isLight ? 'border-black' : 'border-white'} transition-colors duration-500 `}></div>
                        <p className={`text-sm ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>
Avid Pro Tools is a professional-grade digital audio workstation (DAW) used for music production, sound design, film scoring, and audio post-production. Known for its powerful features and industry-standard status, Pro Tools allows users to record, edit, mix, and produce high-quality audio and music. It offers advanced audio editing tools, a wide range of plugins, and precise mixing capabilities. Pro Tools is used by music producers, sound engineers, and audio professionals across various industries, and it supports multi-track recording and editing with high-resolution audio.
                        </p>
                    </div>
                    <div className={`p-6 rounded-lg shadow-lg ${isLight ? 'bg-white' : 'bg-[#1b1b1b]'} transition-colors duration-500 ${inView ? 'animate-fade-in delay-5' : 'opacity-0'}`}>
                        <h3 className={`text-xl font-bold mb-2 ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>IK Multimedia T-RackS</h3>
                        <div className={`border-t-2 my-2 ${isLight ? 'border-black' : 'border-white'} transition-colors duration-500 `}></div>
                        <p className={`text-sm ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>
                        IK Multimedia T-RackS is a suite of professional audio processing tools designed for mixing and mastering. It includes a variety of plugins, such as equalizers, compressors, limiters, reverb, and other effects, which are useful for achieving a polished and professional sound. T-RackS is popular among mixing and mastering engineers due to its versatile processing tools and high-quality algorithms. The software provides both individual plugins and a full mastering chain, allowing users to tailor their audio processing for the desired result.
                        </p>
                    </div>
                    <div className={`p-6 rounded-lg shadow-lg   ${isLight ? 'bg-white' : 'bg-[#1b1b1b]'} transition-colors duration-500 ${inView ? 'animate-fade-in delay-6' : 'opacity-0'}`}>
                        <h3 className={`text-xl font-bold mb-2 ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>iZotope RX</h3>
                        <div className={`border-t-2 my-2 ${isLight ? 'border-black' : 'border-white'} transition-colors duration-500 `}></div>
                        <p className={`text-sm ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>
                        iZotope RX is an advanced audio repair and restoration software used by audio professionals to clean up, restore, and enhance recordings. It is highly regarded for its ability to fix issues such as background noise, clicks, hums, distortion, and clipping in audio recordings. RX provides a suite of tools like spectral editing, noise reduction, de-reverb, and dialogue isolation, making it especially popular in post-production environments, such as film, television, and podcast production. It also offers machine learning-powered features to help users easily identify and fix audio issues.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;