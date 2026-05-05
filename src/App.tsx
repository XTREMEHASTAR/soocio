/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { 
  Monitor, 
  Tv, 
  Search, 
  Globe, 
  User, 
  Settings, 
  Bell, 
  Home, 
  Hash, 
  Mail, 
  Bookmark, 
  Layout, 
  Maximize2,
  ChevronDown
} from 'lucide-react';

// --- Components ---

const TVFrame = ({ scale, isEntering, onClick }: { scale: any, isEntering?: boolean, onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitched, setIsGlitched] = useState(false);
  const [isOn, setIsOn] = useState(true);
  const [channel, setChannel] = useState(0);
  const [channelRotation, setChannelRotation] = useState(0);
  const [volumeRotation, setVolumeRotation] = useState(0);

  const channels = [
    "Gold_Signal",
    "Lux_TV_01",
    "Amber_Vibes",
    "Retro_Sync",
    "Social_Feed"
  ];

  const triggerGlitch = () => {
    if (isGlitched || !isOn) return;
    setIsGlitched(true);
    if (onClick) onClick();
  };

  const togglePower = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOn(prev => !prev);
    if (!isOn) {
      triggerGlitch();
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGlitched) {
      timer = setTimeout(() => setIsGlitched(false), 1000);
    }
    return () => clearTimeout(timer);
  }, [isGlitched]);

  // Classic SMPTE-style Color Bars for "OFF AIR"
  const OffAirGraphic = () => (
    <div className="absolute inset-0 flex flex-col z-30">
      <div className="flex-[3] flex">
        {['#ffffff', '#fdfc00', '#00fdfe', '#00fd01', '#fd00fd', '#fe0000', '#0000fe'].map((color, i) => (
          <div key={i} className="h-full flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="flex-1 flex">
        {['#0000fe', '#000000', '#fd00fd', '#000000', '#00fdfe', '#000000', '#ffffff'].map((color, i) => (
          <div key={i} className="h-full flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="flex-[1.5] flex">
        {['#00214c', '#ffffff', '#32006a', '#131313', '#080808', '#131313', '#1d1d1d'].map((color, i) => (
          <div key={i} className="h-full flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/90 px-6 py-2 border-2 border-white/20 shadow-2xl skew-x-[-12deg] flex flex-col items-center">
          <span className="text-[14px] font-black tracking-[0.4em] text-white italic drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">OFF AIR</span>
          <span className="text-[6px] font-mono text-white/40 tracking-[0.5em] uppercase mt-1">Please Stand By</span>
        </div>
      </div>
      {/* Heavy static when off air */}
      <motion.div 
        animate={{ opacity: [0.1, 0.2, 0.15, 0.25] }}
        transition={{ duration: 0.1, repeat: Infinity }}
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] mix-blend-overlay pointer-events-none"
      />
    </div>
  );

  return (
    <motion.div 
      animate={{ 
        scale: typeof scale === 'number' ? scale : undefined,
        rotateY: isEntering ? 0 : -8,
        rotateX: isEntering ? 0 : 4,
        perspective: 1000
      }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ 
        scale: typeof scale !== 'number' ? scale : undefined,
        transformStyle: "preserve-3d"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={triggerGlitch}
      className={`relative w-full h-full bg-[#8b5a2b] rounded-2xl border-4 border-[#3d2b1f] group flex items-center justify-center p-3 origin-center overflow-hidden cursor-pointer active:scale-95 transition-all duration-700 ease-in-out transform-gpu will-change-[transform,shadow] ${isHovered ? 'shadow-[0_40px_80px_rgba(0,0,0,0.8),0_0_50px_rgba(212,175,55,0.4)]' : 'shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_20px_rgba(139,90,43,0.2)]'}`}
    >
      {/* Wood Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />

      {/* Decorative Molding / Raised Bevel Lines */}
      <div className="absolute inset-1 border-[1px] border-white/10 rounded-[1.25rem] pointer-events-none z-10" />
      <div className="absolute inset-[6px] border-[1px] border-black/30 rounded-[1rem] pointer-events-none z-10" />
      
      {/* Metallic Gold Sheen & Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-black/40 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-20 pointer-events-none z-10" />
      <motion.div 
        animate={{ opacity: isHovered ? [0.1, 0.3, 0.2, 0.4, 0.2] : 0.1 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-linear-to-tr from-[#d4af37]/20 via-transparent to-transparent pointer-events-none z-10 will-change-opacity" 
      />

      {/* Decorative Corner Brass Accents */}
      {[
        { t: 0, l: 0, r: 'auto', b: 'auto', br: 'rounded-tl-2xl rounded-br-lg' },
        { t: 0, r: 0, l: 'auto', b: 'auto', br: 'rounded-tr-2xl rounded-bl-lg' },
        { b: 0, l: 0, t: 'auto', r: 'auto', br: 'rounded-bl-2xl rounded-tr-lg' },
        { b: 0, r: 0, t: 'auto', l: 'auto', br: 'rounded-br-2xl rounded-tl-lg' }
      ].map((pos, i) => (
        <div 
          key={`accent-${i}`}
          className={`absolute w-6 h-6 bg-linear-to-br from-[#d4af37] via-[#b8860b] to-[#4e3a21] border border-black/20 shadow-sm z-20 ${pos.br}`}
          style={{ top: pos.t, left: pos.l, right: pos.r, bottom: pos.b }}
        >
          <div className="absolute w-1 h-1 rounded-full bg-black/40 top-1.5 left-1.5" />
        </div>
      ))}

      {/* The Main Frame Body (Slightly Inner) */}
      <div className="relative w-full h-full bg-linear-to-br from-[#8b5a2b] via-[#b8860b] to-[#4e3a21] rounded-xl border border-white/20 flex shadow-[inset_0_0_40px_rgba(0,0,0,0.6),0_0_20px_rgba(139,90,43,0.3)] overflow-hidden z-0">
        
        {/* Left Side: CRT Screen Area */}
        <div className="flex-[4] h-full p-3 pt-4 pb-10">
          <div className="relative w-full h-full bg-[#fdfcf5] rounded-[22%] overflow-hidden border-12 border-black/40 shadow-[inset_0_0_100px_rgba(139,90,43,0.4)] ring-2 ring-black/20 transition-all duration-700">
            {/* Screen Glass Reflection */}
            <div className="absolute inset-0 bg-radial-[circle_at_30%_30%] from-white/40 via-transparent to-transparent pointer-events-none z-10" />
            
            {/* CRT Scanlines (Adjusted for light screen) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(0,0,0,0.03),rgba(0,0,0,0.01),rgba(0,0,0,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none z-20" />

            {/* Subtle Constant Static Flicker - Simplified and optimized */}
            <motion.div 
              animate={{ 
                opacity: isGlitched ? [0.4, 0.2, 0.5] : (isHovered ? [0.15, 0.08, 0.18] : [0.05, 0.02, 0.06]),
                x: isGlitched ? ["0%", "5%", "-5%", "2%"] : "0%",
                y: isGlitched ? ["0%", "-5%", "5%", "-2%"] : "0%"
              }}
              transition={{ 
                opacity: { duration: 0.15, repeat: Infinity, ease: "linear" },
                x: { duration: 0.2, repeat: Infinity, ease: "linear" },
                y: { duration: 0.2, repeat: Infinity, ease: "linear" }
              }}
              className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] mix-blend-overlay scale-110 pointer-events-none z-15 transform-gpu will-change-[opacity,transform]"
            />

            {/* Chromatic Aberration / Color Bleed Overlay */}
            {(isGlitched || isHovered) && (
              <div className="absolute inset-0 pointer-events-none z-18 overflow-hidden mix-blend-screen opacity-30">
                <motion.div 
                  animate={{ 
                    x: isGlitched ? [-2, 2, -1, 0] : [-0.5, 0.5, 0],
                    opacity: isGlitched ? [0.4, 0.8, 0.4] : 0.3
                  }}
                  transition={{ duration: 0.1, repeat: Infinity }}
                  className="absolute inset-0 bg-red-500/20 blur-[1px] transform-gpu" 
                />
                <motion.div 
                  animate={{ 
                    x: isGlitched ? [2, -2, 1, 0] : [0.5, -0.5, 0],
                    opacity: isGlitched ? [0.4, 0.8, 0.4] : 0.3
                  }}
                  transition={{ duration: 0.1, repeat: Infinity, delay: 0.05 }}
                  className="absolute inset-0 bg-blue-500/20 blur-[1px] transform-gpu" 
                />
              </div>
            )}

            {/* Micro-flicker brightness layer */}
            <motion.div 
              animate={{ 
                opacity: isGlitched ? [0.1, 0.2, 0.05] : (isHovered ? [0.05, 0.1, 0.02] : [0.01, 0.03, 0]),
              }}
              transition={{ duration: 0.05, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none z-16 will-change-opacity"
            />

            {/* Random Horizontal Interference Bars (Analog Noise) */}
            <div className="absolute inset-0 pointer-events-none z-17 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ top: "-10%", opacity: 0 }}
                  animate={{ 
                    top: ["-10%", "110%"],
                    opacity: isGlitched ? [0, 0.4, 0] : (isHovered ? [0, 0.15, 0] : [0, 0.05, 0]),
                  }}
                  transition={{ 
                    duration: 1.5 + i,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "linear"
                  }}
                  className="absolute w-full h-[4px] bg-black/10 blur-[2px]"
                />
              ))}
              {isGlitched && (
                <motion.div 
                  animate={{ 
                    top: ["0%", "40%", "10%", "90%", "20%"],
                    opacity: [0, 0.3, 0.1, 0.5, 0]
                  }}
                  transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                  className="absolute w-full h-[20px] bg-white/20 blur-[10px]"
                />
              )}
            </div>

            {/* Signal Lost / Glitch Effect Overlay */}
            <AnimatePresence>
              {(isGlitched || isHovered) && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isGlitched ? [1, 0.4, 1, 0.7, 1] : [0.1, 0.15, 0.08, 0.12],
                    x: isGlitched ? [0, 15, -15, 5, -5, 0] : 0,
                  }}
                  transition={{ 
                    duration: isGlitched ? 0.4 : 1.2, 
                    repeat: isGlitched ? 2 : Infinity,
                    ease: "linear"
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  className="absolute inset-0 z-50 bg-white/20 mix-blend-overlay overflow-hidden pointer-events-none transform-gpu will-change-[transform,opacity]"
                >
                  {/* Intense Static Bursts / Flicker Bars */}
                  {isGlitched && (
                    <>
                      <motion.div 
                        animate={{ 
                          opacity: [0, 1, 0, 0.8, 0],
                          y: ["10%", "80%", "40%", "90%", "0%"]
                        }}
                        transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-0 h-4 bg-white/40 z-60 will-change-[transform,opacity]"
                      />
                      <motion.div 
                        animate={{ 
                          opacity: [0, 0.5, 0, 1, 0],
                        }}
                        transition={{ duration: 0.08, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] mix-blend-screen opacity-60 will-change-opacity"
                      />
                      <div className="absolute inset-0 bg-white/10 z-70 mix-blend-color-dodge animate-pulse" />
                    </>
                  )}
                  
                  <motion.div 
                    animate={{ 
                      y: ["0%", "100%", "0%"],
                      opacity: isGlitched ? [0.8, 1, 0.8] : [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 0.05, repeat: Infinity }}
                    className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/60-lines.png')] opacity-60 pointer-events-none"
                  />
                  
                  {(isGlitched || (isHovered && Math.random() > 0.7)) && (
                    <motion.div 
                      animate={isGlitched ? {
                        x: [0, -10, 10, -5, 5, 0],
                        y: [0, 5, -5, 2, -2, 0],
                        scale: [1, 1.1, 0.9, 1.05, 1],
                        skewX: [0, 20, -20, 10, -10, 0]
                      } : {}}
                      transition={{ duration: 0.1, repeat: Infinity }}
                      className="absolute inset-0 text-white font-black text-4xl flex items-center justify-center tracking-widest italic skew-x-12 drop-shadow-[0_0_20px_rgba(255,255,255,1)] uppercase"
                    >
                      {isGlitched ? "SIGNAL LOST" : "SEARCHING..."}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle Static on Hover */}
            <motion.div 
              animate={{ opacity: (isHovered && !isGlitched) ? 0.08 : 0 }}
              className="absolute inset-0 z-45 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] mix-blend-screen"
            />

            {/* Vintage Imperfections: Scratches */}
            <motion.div 
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-30 pointer-events-none"
            >
              <div className="absolute top-[10%] left-[20%] w-[40%] h-[1px] bg-white/10 rotate-[15deg] shadow-[0_0_2px_rgba(255,255,255,0.2)]" />
              <div className="absolute top-[60%] left-[50%] w-[30%] h-[1px] bg-white/5 -rotate-[45deg]" />
              <div className="absolute top-[30%] left-[10%] w-[1px] h-[20%] bg-white/10 rotate-[10deg]" />
              <div className="absolute bottom-[20%] right-[15%] w-[25%] h-[1px] bg-white/5 rotate-[5deg]" />
            </motion.div>

            {/* Vintage Imperfections: Dust/Grain */}
            <motion.div 
              animate={{ opacity: isHovered ? 0.22 : 0.05 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" 
            />
            
            {/* Vintage Imperfections: Smudge/Fingerprint */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-radial-[circle_at_50%_50%] from-white/10 to-transparent blur-xl pointer-events-none z-30 opacity-40" />

            {/* Static Content / Signal with Ghosting */}
            {!isOn && <OffAirGraphic />}
            {isOn && (
              <div className="w-full h-full flex flex-col items-center justify-center relative bg-radial-[circle_at_50%_50%] from-[#fdfcf5] to-[#ecead9]">
                {/* Vintage Channel Number OSD (appears on change) */}
                <motion.div 
                  key={`osd-${channel}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0.8, 0],
                    y: 0,
                    filter: isGlitched ? ["blur(2px)", "blur(0px)", "blur(4px)"] : "blur(0.5px)"
                  }}
                  transition={{ 
                    opacity: { times: [0, 0.1, 0.8, 0.9, 1], duration: 2.5 },
                    duration: 2.5 
                  }}
                  className="absolute top-6 right-8 z-40 bg-black/80 px-2 py-0.5 border border-white/20 skew-x-[-12deg] shadow-xl pointer-events-none"
                >
                  <span className="text-[#33ff33] font-mono text-[10px] font-black tracking-widest drop-shadow-[0_0_4px_#33ff33]">
                    CH {channel < 9 ? `0${channel + 1}` : channel + 1}
                  </span>
                </motion.div>

                <div className="relative">
                  {/* Cyan Ghost */}
                  <motion.div 
                    key={`cyan-${channel}`}
                    animate={{ 
                      x: isGlitched ? [-6, 6, -3, 0] : (isHovered ? [-1.5, 1.5, 0] : 0),
                      opacity: isHovered ? 0.3 : 0.1
                    }}
                    className="absolute inset-0 text-cyan-500/50 font-mono text-sm font-black uppercase tracking-[0.4em] blur-[1px]"
                  >
                    {channels[channel]}
                  </motion.div>
                  
                  {/* Magenta Ghost */}
                  <motion.div 
                    key={`magenta-${channel}`}
                    animate={{ 
                      x: isGlitched ? [6, -6, 3, 0] : (isHovered ? [1.5, -1.5, 0] : 0),
                      opacity: isHovered ? 0.3 : 0.1
                    }}
                    className="absolute inset-0 text-fuchsia-500/50 font-mono text-sm font-black uppercase tracking-[0.4em] blur-[1px]"
                  >
                    {channels[channel]}
                  </motion.div>
  
                  {/* Main Text */}
                  <motion.div 
                    key={channel}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      x: isGlitched ? [0, 8, -8, 0] : 0,
                      filter: isGlitched ? "blur(1.5px) brightness(1.3)" : "blur(0px)",
                      color: isGlitched ? "#d4af37" : "#4e3a21"
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`relative text-sm font-mono text-[#4e3a21] font-black uppercase tracking-[0.3em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] ${isGlitched ? '' : 'animate-pulse'}`}
                  >
                    {channels[channel]}
                  </motion.div>
                </div>

                {/* Retro "Fine Tuning" line indicator */}
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: isHovered ? "40%" : "20%" }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 h-[1px] bg-black/10 overflow-hidden"
                >
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-1/4 h-full bg-black/20"
                  />
                </motion.div>
              </div>
            )}
          </div>
          
          {/* THE SOCIAL BOX Label & Bottom Grille */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-1.5">
            <span className="text-[10px] font-bold text-[#fdfcf5]/80 uppercase tracking-[0.4em] drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">THE SOCIAL BOX</span>
            
            {/* Bottom Slat Grille */}
            <div className="flex gap-1.5 opacity-30">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-1 h-3 bg-black rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Control Cluster */}
        <div className="flex-1 h-full py-6 px-1 flex flex-col items-center justify-between bg-black/25 border-l-4 border-black/40 relative overflow-hidden">
          {/* Side Panel Grooves */}
          <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-around py-10 opacity-10 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="h-[1px] w-full bg-white transition-opacity" />
            ))}
          </div>

          <div className="text-[7px] font-bold text-[#d4af37] opacity-60 uppercase tracking-tighter z-10">Lux_Vision</div>
          
          {/* Channel / Vol Knobs (Golden Metal) */}
          <div className="flex flex-col gap-10 items-center">
            <div 
              className="relative group" 
              onClick={(e) => { 
                e.stopPropagation(); 
                setChannelRotation(prev => prev + 30); 
                setChannel(prev => (prev + 1) % channels.length);
                triggerGlitch(); 
              }}
            >
              <motion.div 
                animate={{ 
                  filter: isHovered ? "drop-shadow(0 0 10px rgba(212,175,55,0.4))" : "none",
                  rotate: channelRotation + (isGlitched ? 15 : 0)
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-12 h-12 rounded-full bg-linear-to-tr from-[#4e3a21] via-[#d4af37] to-[#8b5a2b] border-2 border-black/40 shadow-xl flex items-center justify-center relative cursor-pointer"
              >
                {/* Dial Indicator */}
                <div className="absolute top-1 w-1.5 h-1.5 bg-white/80 rounded-full shadow-[0_0_5px_white]" />
                <div className="w-8 h-8 rounded-full border border-black/20 bg-black/5" />
              </motion.div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[6px] text-white/40 font-mono tracking-widest whitespace-nowrap">CHANNELS</div>
            </div>
            
            <div 
              className="relative group md:cursor-pointer"
              onClick={(e) => { 
                e.stopPropagation(); 
                setVolumeRotation(prev => prev + 45); 
                togglePower(e); 
              }}
            >
              <motion.div 
                animate={{ 
                  filter: isHovered ? "drop-shadow(0 0 10px rgba(212,175,55,0.4))" : "none",
                  rotate: volumeRotation + (isGlitched ? -10 : 0)
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-10 h-10 rounded-full bg-linear-to-tr from-[#4e3a21] via-[#d4af37] to-[#8b5a2b] border-2 border-black/40 shadow-xl flex items-center justify-center relative cursor-pointer"
              >
                {/* Dial Indicator */}
                <div className="absolute top-1 w-1.5 h-1.5 bg-white/80 rounded-full shadow-[0_0_5px_white]" />
                <div className="w-6 h-6 rounded-full border border-black/20 bg-black/5" />
              </motion.div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[6px] text-white/40 font-mono tracking-widest whitespace-nowrap">VOLUME</div>
            </div>
          </div>

          {/* Speaker Grille Area */}
          <div className="mt-auto w-full px-2 py-4 flex flex-col gap-2">
            <div className="h-16 w-full bg-[#2a1d15] rounded border border-white/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] relative overflow-hidden">
              {/* Pulsating Glow Layer */}
              <motion.div
                animate={{
                  opacity: [0.1, 0.25, 0.1],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-radial-[circle_at_50%_50%] from-[#d4af37]/30 via-transparent to-transparent pointer-events-none blur-xl z-0"
              />

              {/* Speaker Fabric / Mesh Texture */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#d4af37_0.5px,transparent_0.5px)] bg-[size:2px_2px] z-10" />
              
              {/* Horizontal slats/lines for depth */}
              <div className="absolute inset-0 flex flex-col justify-around py-2 z-20">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-[1px] w-full bg-[#d4af37]/10 shadow-[0_1px_0_rgba(0,0,0,0.5)]" />
                ))}
              </div>
              
              {/* Inner shadow for "sunken" look */}
              <div className="absolute inset-0 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] pointer-events-none z-30" />
            </div>
            <div className="flex justify-between items-center px-1">
              {/* Power Indicator */}
              <motion.div 
                onClick={togglePower}
                animate={{ 
                  opacity: isOn ? [0.4, 1, 0.4] : 0.1,
                  backgroundColor: isOn ? "rgba(220, 38, 38, 1)" : "rgba(0,0,0,1)"
                }}
                transition={{ duration: 2, repeat: isOn ? Infinity : 0 }}
                className="w-1.5 h-1.5 rounded-full cursor-pointer shadow-[0_0_6px_rgba(220,38,38,0.8)]" 
              />
              <div className="w-5 h-1 bg-white/5 rounded-full border-t border-black/20" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WebContent = () => {
  return (
    <div className="w-full h-full bg-[#050505] text-white flex flex-col font-sans overflow-y-auto">
      {/* Background radial gradient matches intro */}
      <div className="fixed inset-0 bg-radial-[circle_at_50%_50%] from-[#1a1a1a] to-[#050505] -z-10" />

      {/* Navigation Rail */}
      <div className="fixed left-0 top-0 bottom-0 w-24 border-r border-white/5 flex flex-col items-center py-10 gap-10 bg-black/50 backdrop-blur-md z-10">
        <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-[10px] font-bold tracking-widest">
          SB
        </div>
        <div className="flex flex-col gap-8 text-white/30">
          <Home className="w-5 h-5 hover:text-white cursor-pointer transition-all hover:scale-110" />
          <Hash className="w-5 h-5 hover:text-white cursor-pointer transition-all hover:scale-110" />
          <Bell className="w-5 h-5 hover:text-white cursor-pointer transition-all hover:scale-110" />
          <User className="w-5 h-5 hover:text-white cursor-pointer transition-all hover:scale-110" />
        </div>
        <div className="mt-auto pb-8">
          <Settings className="w-5 h-5 text-white/30 hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-24 p-12 max-w-5xl mx-auto w-full">
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            Rendering / Archive_01
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-8xl font-black tracking-tighter leading-none mb-6"
          >
            ELEGANT<br />
            PERSPECTIVE
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-white/40 max-w-sm font-serif italic text-lg leading-relaxed"
          >
            A refined collection of visual signals and architectural data points.
          </motion.p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Visual Depth", label: "0x882", info: "Optical / 2.4x Zoom" },
            { title: "Static Audio", label: "0x119", info: "Aperture / ƒ 1.8" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-20">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-[10px] font-mono text-white/40 group-hover:border-white/40 transition-colors">
                  {idx + 1}
                </div>
                <span className="text-[10px] font-mono opacity-20 tracking-tighter">{item.label}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight">{item.title}</h3>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">{item.info}</p>
              
              {/* Subtle hover line */}
              <div className="absolute bottom-0 left-0 h-[1px] bg-white/40 w-0 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </section>

        <footer className="mt-40 py-10 border-t border-white/5 flex justify-between items-center text-[10px] font-mono opacity-20 uppercase tracking-[0.4em]">
          <div>Perspective OS / 2026</div>
          <div className="font-serif italic capitalize tracking-normal opacity-50">Refined Identity</div>
        </footer>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [showContent, setShowContent] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Transition text color from transparent/outline to solid yellow
  const textColor = isEntering ? "rgba(255, 203, 47, 1)" : "rgba(255, 203, 47, 0)";
  const textStroke = isEntering ? "0px rgba(255, 203, 47, 0)" : "1px rgba(255, 255, 255, 0.15)";

  const handleEnter = () => {
    if (isEntering) return;
    setIsEntering(true);
    setTimeout(() => {
      setShowContent(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1400); // Coordination with the scale duration
  };

  return (
    <div className={`relative w-full bg-[#050505] text-white overflow-hidden h-svh`}>
      <AnimatePresence mode="wait">
        {!showContent ? (
          <div key="intro" className="relative h-svh w-full overflow-hidden">
            <motion.div
              animate={{ opacity: isEntering ? 0 : 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full h-svh flex items-center justify-center overflow-hidden z-20"
            >
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-radial-[circle_at_50%_50%] from-[#1a1a1a] to-[#050505] z-0" />

              {/* Corner Markers */}
              <div className="absolute top-10 left-10 w-10 h-10 border-t border-l border-white/20" />
              <div className="absolute top-10 right-10 w-10 h-10 border-t border-r border-white/20" />
              <div className="absolute bottom-10 left-10 w-10 h-10 border-b border-l border-white/20" />
              <div className="absolute bottom-10 right-10 w-10 h-10 border-b border-r border-white/20" />

              {/* Viewfinder Circle */}
              <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none" />

              {/* Meta Info Labels */}
              <motion.div animate={{ opacity: isEntering ? 0 : 1 }} className="absolute bottom-12 left-12 flex gap-12 text-left z-20">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">Coordinate</span>
                  <span className="text-xs font-serif italic text-white/80">40.7128° N, 74.0060° W</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">Aperture</span>
                  <span className="text-xs font-serif italic text-white/80">ƒ / 1.8 Fixed</span>
                </div>
              </motion.div>

              {/* Hero Logo with Zoom Interaction */}
              <div className="flex items-center gap-1 md:gap-4 z-30">
                <div className="relative group">
                  <motion.h1 
                    animate={{ 
                      opacity: isEntering ? 0 : 1,
                      color: isEntering ? "#FFCB2F" : "rgba(255, 203, 47, 0.1)",
                      WebkitTextStroke: isEntering ? "0px" : "1px rgba(255, 203, 47, 0.2)",
                      x: [0, -4, 4, -2, 0],
                      y: [0, 6, -2, 4, 0],
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: isEntering ? 0 : Infinity, 
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                    whileHover={{ color: "#FFCB2F", scale: 1.05 }}
                    whileTap={{ 
                      scale: 1.1,
                      x: [0, -3, 3, -3, 0],
                      y: [0, 3, -3, 3, 0],
                    }}
                    className="text-[16vw] md:text-[12vw] font-black tracking-tighter uppercase select-none transition-colors duration-300 transform-gpu cursor-pointer outline-hidden will-change-transform z-10 relative"
                  >
                    S(
                  </motion.h1>
                  {/* Separate Glow Layer instead of filter: drop-shadow */}
                  <motion.div 
                    animate={{ 
                      opacity: isEntering ? 0 : [0.1, 0.3, 0.1],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 blur-2xl bg-[#FFCB2F] pointer-events-none -z-0"
                  />
                </div>
                
                {/* The Zoom Target */}
                <div className="relative w-44 h-32 md:w-72 md:h-52 z-50 mx-1 md:mx-4">
                  {/* Background Glow Circle from reference image */}
                  <motion.div 
                    animate={{ 
                      scale: isEntering ? 5 : [1, 1.05, 1],
                      opacity: isEntering ? 0 : [0.15, 0.25, 0.15]
                    }}
                    transition={{ 
                      scale: { duration: isEntering ? 1.5 : 4, repeat: isEntering ? 0 : Infinity, ease: "easeInOut" },
                      opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[180%] rounded-full bg-[#FFCB2F] blur-[100px] -z-10 pointer-events-none"
                  />
                  
                  <TVFrame 
                    scale={isEntering ? 20 : 1} 
                    isEntering={isEntering}
                    onClick={handleEnter}
                  />
                  
                  <motion.div 
                    animate={{ opacity: isEntering ? 0 : 1 }}
                    className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                  >
                    <span className="text-[10px] font-mono text-white/60 uppercase tracking-[0.5em] whitespace-nowrap">
                      Click to Enter
                    </span>
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-white/40" />
                    </motion.div>
                  </motion.div>
                </div>

                <div className="relative group">
                  <motion.h1 
                    animate={{ 
                      opacity: isEntering ? 0 : 1,
                      color: isEntering ? "#FFCB2F" : "rgba(255, 203, 47, 0.1)",
                      WebkitTextStroke: isEntering ? "0px" : "1px rgba(255, 203, 47, 0.2)",
                      x: [0, 4, -4, 2, 0],
                      y: [0, -6, 2, -4, 0],
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: isEntering ? 0 : Infinity, 
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                    whileHover={{ color: "#FFCB2F", scale: 1.05 }}
                    whileTap={{ 
                      scale: 1.1,
                      x: [0, 3, -3, 3, 0],
                      y: [0, -3, 3, -3, 0],
                    }}
                    className="text-[16vw] md:text-[12vw] font-black tracking-tighter uppercase select-none transition-colors duration-300 transform-gpu cursor-pointer outline-hidden will-change-transform z-10 relative"
                  >
                    )CIAL
                  </motion.h1>
                  {/* Separate Glow Layer */}
                  <motion.div 
                    animate={{ 
                      opacity: isEntering ? 0 : [0.1, 0.3, 0.1],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 blur-2xl bg-[#FFCB2F] pointer-events-none -z-0"
                  />
                </div>
              </div>

              {/* Background branding */}
              <motion.div 
                animate={{ opacity: isEntering ? 0 : 0.5 }}
                className="fixed top-12 left-1/2 -translate-x-1/2 border border-white/20 px-4 py-2 text-[10px] font-bold tracking-[0.3em] uppercase"
              >
                Perspective
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full h-svh z-50 relative"
          >
            <WebContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
