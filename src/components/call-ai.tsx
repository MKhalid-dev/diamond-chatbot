import mic from "../assets/mic.svg";
import msg from "../assets/msg.svg";
import close from "../assets/close.svg";
import avatar from "../assets/avatar2.svg";
import voice from "../assets/voice.svg";
import circle1 from "../assets/circle1.svg";
import circle2 from "../assets/circle2.svg";
import circle3 from "../assets/circle3.svg";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
interface VoiceInteractionScreenProps {
  onClose: () => void;
}

export function VoiceInteractionScreen({
  onClose,
}: VoiceInteractionScreenProps) {
  const circleImages = [circle1, circle2, circle3];

  const [currentIndex, setCurrentIndex] = useState(0);
  const voiceImg = useRef<HTMLDivElement | null>(null);

  const onHoldMic = () => {
    voiceImg?.current?.classList.add("voice-screen-enter");
  };
  const onLeaveMic = () => {
    voiceImg?.current?.classList.remove("voice-screen-enter");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % circleImages.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 ai z-50 flex flex-col items-center justify-center ">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">
          مرحبا بك في مساعدك الرقمي الذكي
        </h2>
        <p className="text-xl mb-8">انقر على الميكروفون وابدأ في التحدث</p>
        <div className="w-90 h-100 rounded-full flex items-center justify-center mx-auto p-4 mb-20 relative">
          <motion.img
            key={currentIndex}
            src={circleImages[currentIndex]}
            alt="Circle"
            className="absolute top-0 left-0 w-full h-full"
            animate={{ opacity: [1,0.9,1] }}
            transition={{ duration: 0.1 }}
            
          />

          {/* Avatar */}
          <img
            src={avatar} // Replace with your avatar URL
            alt="Avatar"
            className="absolute w-70 h-full rounded-full"
          />
        </div>
        <div
          ref={voiceImg}
          className=" w-70 rounded-full flex items-center justify-center mx-auto mb-2 p-4 "
        >
          <img src={voice} alt="" className="w-full h-full" />
        </div>
        <div className="flex flex-row items-center justify-center gap-5">
          <button className="text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
            <img src={msg} alt="" onClick={onClose} />
          </button>
          <button className="text-white p-4 rounded-full hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
            <img
              src={mic}
              alt=""
              onMouseDown={onHoldMic}
              onMouseLeave={onLeaveMic}
            />
          </button>
          <button
            className="text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={onClose}
          >
            <img src={close} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
