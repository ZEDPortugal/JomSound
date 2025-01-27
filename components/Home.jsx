import React, { useEffect, useState } from "react";
import { FaInstagram, FaSoundcloud } from 'react-icons/fa';

import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLinkedin,
  AiOutlineGithub,
  AiOutlineMail,
} from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

const Home = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Radio Imaging", "Sound Designer", "Audio Engineer"];
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 100;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text, delta]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta - 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(200);
    }
  };

  return (
    <section id="home" className="relative h-screen">
      {/* Video background */}
      <img
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] filter brightness-[10%]"
        src="/image/bgStudio.jpg"
      ></img>


      <div className=" flex items-center p-[2%] text-white h-full">
        {/* Hidden on mobile */}
        <div className="animate-fade-right animate-once animate-duration-300 hidden md:block items-center hover:text-[#c7c7c7]">
          <a
            href="https://www.linkedin.com/mwlite/profile/in/jomsoundmnl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineLinkedin
              size={40}
              className="animate-fade animate-once animate-duration-[2000ms] mt-5 rounded-full hover:text-[#0077b5] hover:border-4 hover:border-[#0077b5] ease-in-out duration-200 cursor-pointer"
            />
          </a>
          <a
            href="https://www.instagram.com/jomsound?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              size={40}
              className="animate-fade animate-once animate-duration-[1500ms] mt-5 rounded-full hover:text-[#ffdf9e] hover:border-4 hover:border-[#ffdf9e] ease-in-out duration-200 cursor-pointer"
            />
          </a>
          <a href="https://soundcloud.com/jomzportugal"             target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer">
            <FaSoundcloud
              size={40}
              className="animate-fade animate-once animate-duration-[1000ms] mt-5 rounded-full hover:text-[#ff5500] hover:border-4 hover:border-[#ff5500] ease-in-out duration-200 cursor-pointer"
            />
          </a>
        </div>

        <div className=" p-[4%]">
          {/* Hidden on desktop */}
        {/* Main Header */}
        <h1 className="animate-fade animate-once flex  text-[40px] lg:text-[80px] md:text-[60px] font-michroma uppercase text-[#F5F5F5]">
            Jomz Portugal
          </h1> 
          
          {/* Rotating Text */}
          <h3 className="flex  text-[30px] lg:text-[60px] md:text-[40px] font-michroma text-[#ff2020]">{text}|</h3>
          
          {/* Location Section */}
          <div className="animate-fade-up animate-once animate-duration-1000 flex items-center mt-2 border-t-2 border-[#ff2020] pt-5">
            <div className="flex items-center hover:text-[#BFBFBF] font-michroma ease-in-out duration-300">
              <FaMapMarkerAlt size={20} className="cursor-pointer text-[#ff2020] mr-2" />
              <a
                href="https://www.google.com/maps/place/metro+manila/data=!4m2!3m1!1s0x3397c8d26026386d:0x5fed23daac9278d0?sa=X&ved=1t:155783&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Metro Manila, Philippines</p>
              </a>
            </div>
          </div>
          {/* Hidden on desktop */}
          <div className="md:hidden flex items-center mt-20 ">
          <a
            href="https://www.linkedin.com/mwlite/profile/in/jomsoundmnl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineLinkedin
              size={40}
              className="animate-fade animate-once animate-duration-[2000ms] mt-5 mr-3 rounded-full hover:text-[#0077b5] hover:border-4 hover:border-[#0077b5] ease-in-out duration-200 cursor-pointer"
            />
          </a>
          <a
            href="https://www.instagram.com/jomsound?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              size={40}
              className="animate-fade animate-once animate-duration-[1500ms] mt-5 mr-4 rounded-full hover:text-[#ffdf9e] hover:border-4 hover:border-[#ffdf9e] ease-in-out duration-200 cursor-pointer"
            />
          </a>
          <a href="https://soundcloud.com/jomzportugal"            
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer">
            <FaSoundcloud
              size={40}
              className="animate-fade animate-once animate-duration-[1000ms] mt-5 rounded-full hover:text-[#ff5500] hover:border-4 hover:border-[#ff5500] ease-in-out duration-200 cursor-pointer"
            />
          </a>
          </div>


                
        
        </div>

      </div>
      
    </section>
  );
};

export default Home;