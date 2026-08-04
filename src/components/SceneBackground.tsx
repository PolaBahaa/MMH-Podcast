import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SceneData, TransitionDirection } from '../types';

interface SceneBackgroundProps {
  scene: SceneData;
  isTransitioning: boolean;
  direction: TransitionDirection;
}

const BG_VIDEO_MAP: Record<SceneData['bgType'], { video: string; poster: string }> = {
  city_gate: {
    video: '/videos/1.mp4',
    poster: '/assets/images/palms.png',
  },
  bethesda_pool: {
    video: '/videos/2.mp4',
    poster: '/assets/images/bethesda.png',
  },
  sunlit_alley: {
    video: '/videos/3.mp4',
    poster: '/assets/images/blind.png',
  },
  treasure_field: {
    video: '/videos/4.mp4',
    poster: '/assets/images/treasure.png',
  },
  samaritan_well: {
    video: '/videos/5.mp4',
    poster: '/assets/images/samaritan.png',
  },
  country_house: {
    video: '/videos/6.mp4',
    poster: '/assets/images/prodigal.png',
  },
  mountain_summit: {
    video: '/videos/7.mp4',
    poster: '/assets/images/temptation.png',
  },
};

export const SceneBackground: React.FC<SceneBackgroundProps> = ({
  scene,
  isTransitioning,
  direction,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgData = BG_VIDEO_MAP[scene.bgType] || BG_VIDEO_MAP.city_gate;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay handled safely
      });
    }
  }, [scene.id]);

  return (
    <motion.div
      key={scene.id}
      className="absolute inset-0 w-full h-full overflow-hidden select-none bg-black"
      initial={{
        opacity: 0,
        scale: 1.08,
        x: direction === 'next' ? '8%' : '-8%',
      }}
      animate={{
        opacity: 1,
        scale: isTransitioning ? 1.06 : 1.0,
        x: isTransitioning
          ? direction === 'next'
            ? '-2%'
            : '2%'
          : '0%',
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
        x: direction === 'next' ? '-10%' : '10%',
      }}
      transition={{
        duration: 1.3,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      {/* Full-Screen Looping Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={bgData.poster}
        className="w-full h-full object-cover select-none pointer-events-none"
      >
        <source src={bgData.video} type="video/mp4" />
      </video>

      {/* Subtle lighting vignette overlay */}
      <div className="absolute inset-0 pointer-events-none storybook-overlay-gradient" />
    </motion.div>
  );
};

