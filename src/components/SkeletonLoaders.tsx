import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, BookOpen, Tv, Award, ShoppingBag, BarChart2 } from 'lucide-react';

interface SkeletonBlockProps {
  className?: string;
}

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ className = '' }) => (
  <div
    className={`skeleton-shimmer border border-amber-500/10 rounded-2xl ${className}`}
  />
);

/* 1. Episode View Skeleton */
export const EpisodeSkeleton: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-6 dir-rtl p-4 sm:p-6 select-none">
    {/* Video Player Skeleton */}
    <div className="relative aspect-video w-full rounded-3xl overflow-hidden skeleton-shimmer border border-amber-500/20 shadow-2xl flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 opacity-40">
        <Tv className="w-12 h-12 text-amber-400 animate-pulse" />
        <SkeletonBlock className="h-4 w-36" />
      </div>
    </div>

    {/* Video Meta Info Skeleton */}
    <div className="p-6 rounded-3xl bg-zinc-900/80 border border-amber-500/20 space-y-4">
      <div className="flex items-center justify-between">
        <SkeletonBlock className="h-8 w-64 rounded-xl" />
        <SkeletonBlock className="h-6 w-24 rounded-full" />
      </div>
      <SkeletonBlock className="h-4 w-full rounded-lg" />
      <SkeletonBlock className="h-4 w-4/5 rounded-lg" />

      <div className="flex items-center gap-3 pt-2">
        <SkeletonBlock className="h-10 w-32 rounded-2xl" />
        <SkeletonBlock className="h-10 w-32 rounded-2xl" />
      </div>
    </div>

    {/* Tabs or Additional Content Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-5 rounded-3xl bg-zinc-900/80 border border-amber-500/20 space-y-3">
        <SkeletonBlock className="h-5 w-32 rounded-lg" />
        <SkeletonBlock className="h-16 w-full rounded-2xl" />
        <SkeletonBlock className="h-10 w-full rounded-2xl" />
      </div>
      <div className="p-5 rounded-3xl bg-zinc-900/80 border border-amber-500/20 space-y-3">
        <SkeletonBlock className="h-5 w-32 rounded-lg" />
        <SkeletonBlock className="h-16 w-full rounded-2xl" />
        <SkeletonBlock className="h-10 w-full rounded-2xl" />
      </div>
    </div>
  </div>
);

/* 2. Profile View Skeleton */
export const ProfileSkeleton: React.FC = () => (
  <div className="max-w-4xl mx-auto space-y-6 dir-rtl p-4 sm:p-6 select-none">
    {/* Profile Header Card Skeleton */}
    <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-amber-500/20 space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Avatar Circle */}
        <div className="w-24 h-24 rounded-full skeleton-shimmer border-2 border-amber-500/30 shrink-0" />
        
        <div className="space-y-3 text-center sm:text-right w-full">
          <SkeletonBlock className="h-8 w-56 mx-auto sm:mx-0 rounded-xl" />
          <SkeletonBlock className="h-4 w-40 mx-auto sm:mx-0 rounded-lg" />
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
            <SkeletonBlock className="h-6 w-24 rounded-full" />
            <SkeletonBlock className="h-6 w-28 rounded-full" />
          </div>
        </div>
      </div>
    </div>

    {/* Stats Grid Skeleton */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-4 rounded-3xl bg-zinc-900/80 border border-amber-500/20 space-y-2">
          <SkeletonBlock className="h-4 w-20 rounded-md" />
          <SkeletonBlock className="h-8 w-24 rounded-lg" />
          <SkeletonBlock className="h-3 w-16 rounded-md" />
        </div>
      ))}
    </div>

    {/* Detailed Section Skeleton */}
    <div className="p-6 rounded-3xl bg-zinc-900/80 border border-amber-500/20 space-y-4">
      <SkeletonBlock className="h-6 w-48 rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonBlock key={i} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  </div>
);

/* 3. Reward Store / Inventory Skeleton */
export const StoreSkeleton: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-6 dir-rtl p-4 sm:p-6 select-none">
    {/* Store Header & Category Pills Skeleton */}
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="space-y-2 w-full sm:w-auto">
        <SkeletonBlock className="h-8 w-48 rounded-xl" />
        <SkeletonBlock className="h-4 w-64 rounded-md" />
      </div>
      <SkeletonBlock className="h-10 w-36 rounded-2xl" />
    </div>

    {/* Category Pills Skeleton */}
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <SkeletonBlock key={i} className="h-9 w-28 rounded-2xl" />
      ))}
    </div>

    {/* Items Grid Skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="p-4 rounded-3xl bg-zinc-900/80 border border-amber-500/20 space-y-3">
          <SkeletonBlock className="h-36 w-full rounded-2xl" />
          <SkeletonBlock className="h-5 w-3/4 rounded-lg" />
          <SkeletonBlock className="h-3 w-full rounded-md" />
          <div className="flex items-center justify-between pt-2">
            <SkeletonBlock className="h-6 w-20 rounded-full" />
            <SkeletonBlock className="h-8 w-24 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* 4. Activities / Quiz Skeleton */
export const ActivitiesSkeleton: React.FC = () => (
  <div className="max-w-3xl mx-auto space-y-6 dir-rtl p-4 sm:p-6 select-none">
    {/* Header Skeleton */}
    <div className="p-6 rounded-3xl bg-zinc-900/80 border border-amber-500/20 space-y-4">
      <div className="flex items-center justify-between">
        <SkeletonBlock className="h-7 w-40 rounded-xl" />
        <SkeletonBlock className="h-6 w-16 rounded-full" />
      </div>
      <SkeletonBlock className="h-3 w-full rounded-full" />
    </div>

    {/* Question Card Skeleton */}
    <div className="p-8 rounded-3xl bg-zinc-900/80 border border-amber-500/20 space-y-6">
      <SkeletonBlock className="h-6 w-5/6 mx-auto rounded-xl" />
      <SkeletonBlock className="h-4 w-2/3 mx-auto rounded-lg" />

      <div className="space-y-3 pt-2">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonBlock key={i} className="h-14 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  </div>
);

/* 5. Generic Container Skeleton Wrapper with Toggle Simulation */
interface SectionLoadingWrapperProps {
  isLoading: boolean;
  type?: 'episode' | 'profile' | 'store' | 'activities';
  children: React.ReactNode;
}

export const SectionLoadingWrapper: React.FC<SectionLoadingWrapperProps> = ({
  isLoading,
  type = 'episode',
  children,
}) => {
  if (isLoading) {
    return (
      <div className="relative w-full py-8">
        {/* Subtle Ambient Loading Text */}
        <div className="flex items-center justify-center gap-2 text-xs font-cairo font-bold text-amber-400/80 mb-6 animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>جاري تحميل المحتوى التعليمي... • Loading sacred content</span>
        </div>

        {type === 'episode' && <EpisodeSkeleton />}
        {type === 'profile' && <ProfileSkeleton />}
        {type === 'store' && <StoreSkeleton />}
        {type === 'activities' && <ActivitiesSkeleton />}
      </div>
    );
  }

  return <>{children}</>;
};
