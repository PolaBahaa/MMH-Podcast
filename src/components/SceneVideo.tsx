import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SceneData, TransitionDirection } from '../types';

interface SceneVideoProps {
  scene: SceneData;
  isTransitioning: boolean;
  direction: TransitionDirection;
}

const VIDEO_MAP: Record<SceneData['bgType'], { video: string; poster: string }> = {
  city_gate: {
    video: '/videos/palms.mp4',
    poster: '/assets/images/palms.png',
  },
  bethesda_pool: {
    video: '/videos/bethesda.mp4',
    poster: '/assets/images/bethesda.png',
  },
  sunlit_alley: {
    video: '/videos/blind.mp4',
    poster: '/assets/images/blind.png',
  },
  treasure_field: {
    video: '/videos/treasure.mp4',
    poster: '/assets/images/treasure.png',
  },
  samaritan_well: {
    video: '/videos/samaritan.mp4',
    poster: '/assets/images/samaritan.png',
  },
  country_house: {
    video: '/videos/prodigal.mp4',
    poster: '/assets/images/prodigal.png',
  },
  mountain_summit: {
    video: '/videos/temptation.mp4',
    poster: '/assets/images/temptation.png',
  },
};

export const SceneVideo: React.FC<SceneVideoProps> = ({
  scene,
  isTransitioning,
  direction,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoData = VIDEO_MAP[scene.bgType] || VIDEO_MAP.city_gate;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Safe play handling
      });
    }
  }, [scene.id]);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-hidden select-none bg-black"
      initial={{
        opacity: 0,
        scale: 1.04,
        x: direction === 'next' ? '1.5%' : '-1.5%',
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: '0%',
      }}
      exit={{
        opacity: 0,
        scale: 0.98,
        x: direction === 'next' ? '-1.5%' : '1.5%',
      }}
      transition={{
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Cinematic Looping Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={videoData.poster}
        className="w-full h-full object-cover select-none pointer-events-none"
      >
        <source src={videoData.video} type="video/mp4" />
      </video>

      {/* Subtle lighting vignette overlay */}
      <div className="absolute inset-0 pointer-events-none storybook-overlay-gradient" />
    </motion.div>
  );
};
