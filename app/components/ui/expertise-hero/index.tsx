'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { expertiseSectionMenuItems } from '@/app/utils/constant';
import { formatExpertiseName } from '@/app/utils/formatExpertiseName';
import { Icons } from '../../icon';
import { useBubbleCursor } from '@/app/hooks/useBubbleCursor';

const blobAnimation = {
  animate: {
    x: [0, 80, -40, 0],
    y: [0, -60, 40, 0],
    rotate: [0, 120, 240, 360],
  },
  transition: {
    duration: 18,
    repeat: Infinity,
    ease: 'linear' as const,
  },
};

const ExpertiseHero = () => {
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [widths, setWidths] = useState<number[]>([]);
  const { cursorXSpring, cursorYSpring, isHovering, setIsHovering } = useBubbleCursor({
    size: 20,
  });

  useEffect(() => {
    setWidths(textRefs.current.map((el) => (el ? el.offsetWidth : 0)));
  }, []);

  return (
    <section className="relative h-full min-h-screen w-full overflow-hidden flex items-start justify-center py-24 md:py-32 lg:py-48 px-6 md:px-10">
      {/* Cursor follower */}
      <motion.div
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block w-10 h-10 rounded-full bg-linear-to-tr from-purple-500/40 via-pink-500/40 to-blue-500/40 border border-white/20 backdrop-blur-xl shadow-[0_0_35px_rgba(236,72,153,0.45)]"
      />

      {/* Linear gradiant backgrounds */}
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(135deg,#ff4d8d_0%,#d94bb3_35%,#8a4bff_70%,#6a39a6_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_60%,rgba(255,255,255,0.45),transparent_40%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_80%,rgba(255,120,180,0.35),transparent_45%)]" />

      {/* 4 squares in grid for roatation animation in bg */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 -z-20">
        <motion.div
          animate={blobAnimation.animate}
          transition={blobAnimation.transition}
          className="bg-pink-400/25 blur-3xl"
        />

        <motion.div
          animate={blobAnimation.animate}
          transition={blobAnimation.transition}
          className="bg-purple-400/25 blur-3xl"
        />

        <motion.div
          animate={blobAnimation.animate}
          transition={{ ...blobAnimation.transition, duration: 20 }}
          className="bg-purple-400/20 blur-3xl"
        />

        <motion.div
          animate={blobAnimation.animate}
          transition={{ ...blobAnimation.transition, duration: 22 }}
          className="bg-pink-400/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full">
        {/* Section header */}
        <div className="mb-12 md:mb-24 xl:mb-40 flex items-center justify-between gap-6">
          <div className="w-[30%] lg:w-[20%] h-px bg-white" />
          <p className="uppercase font-normal text-lg md:text-2xl lg:text-3xl tracking-[6px] md:tracking-[10px] text-white whitespace-nowrap">
            2//OUR EXPERTISE
          </p>
        </div>

        {/* Description */}
        <p className="max-w-[85%] mb-12 md:mb-24 xl:mb-40 font-normal text-lg md:text-2xl lg:text-[40px] leading-14 tracking-[2.4px] text-white">
          At our agency, creativity flows through us like a vibrant current. We proudly
          showcase our expertise across a spectrum of services, including
        </p>

        {/* Expertise list */}
        <div className="flex flex-col gap-12 md:gap-16 xl:gap-50">
          {expertiseSectionMenuItems.map((item) => (
            <motion.div
              key={item.id}
              initial="rest"
              whileHover="hover"
              animate="rest"
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
              className="relative group cursor-pointer w-full flex items-center justify-between"
            >
              {/* text */}
              <motion.h1
                ref={(el) => {
                  textRefs.current[item.id] = el;
                }}
                variants={{
                  rest: { color: '#ffffff' },
                  hover: { color: '#f5e9a9' },
                }}
                transition={{ duration: 0.25 }}
                className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl uppercase tracking-[10px] md:tracking-[16px] lg:tracking-[24px]"
              >
                {formatExpertiseName(item.name)}
              </motion.h1>

              {/* sliding highlight bar */}
              <motion.div
                variants={{
                  rest: { scaleX: 0 },
                  hover: { scaleX: 1 },
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  left: widths[item.id] ? widths[item.id] + 24 : 0,
                  width: widths[item.id]
                    ? `calc(100% - ${widths[item.id] - 24}px)`
                    : '100%',
                }}
                className="absolute top-1/2 -translate-y-1/2 origin-right px-11.25 py-8 h-24 md:h-32 lg:h-40 xl:h-56 w-full bg-[#f5e9a9] hidden md:flex items-center gap-35"
              >
                {/* arrow */}
                <motion.span
                  variants={{
                    rest: { opacity: 0, x: -10 },
                    hover: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <Icons.arrow
                    color="#782B81"
                    className="w-10 sm:w-14 md:w-20 lg:w-24 h-auto"
                  />
                </motion.span>

                {/* image card */}
                <motion.div
                  variants={{
                    rest: { opacity: 0, scale: 0.6, rotate: 6, y: 10 },
                    hover: { opacity: 1, scale: 1, rotate: -10, y: 10 },
                  }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="pointer-events-none"
                >
                  <div className="shadow-2xl my-2.5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={388}
                      height={400}
                      className="w-25 sm:w-25 md:w-60 lg:w-75 xl:w-90 shadow-lg"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseHero;
