'use client';

import Vimeo from '@u-wave/react-vimeo';
import React from 'react';

type VimeoPlayerProps = {
  videoId: string;
};

type TimeUpdateEvent = {
  duration: number;
  percent: number;
  seconds: number;
};

type PlayEvent = {};
type PauseEvent = {};

export default function VimeoPlayer({ videoId }: VimeoPlayerProps) {
  return (
    <div className="aspect-video w-full">
      <Vimeo
        video={videoId}
        autoplay={false}
        responsive
        onPlay={(data: PlayEvent) => console.log('▶️ Playing:', data)}
        onPause={(data: PauseEvent) => console.log('⏸️ Paused:', data)}
        onEnd={(data: PauseEvent) => console.log('🏁 Ended:', data)}
        onTimeUpdate={(data: TimeUpdateEvent) => console.log('⏱️ Time:', data)}
      />
    </div>
  );
}
