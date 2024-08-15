import React, { useEffect, useRef } from 'react';

const VideoTrack = ({ track, isLocal }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (track && videoRef.current) {
      track.play(videoRef.current);
    }
    return () => {
      if (track) {
        track.stop();
      }
    };
  }, [track]);

  return (
    <div ref={videoRef} className={isLocal ? "absolute bottom-4 left-4 w-48 h-36 bg-black border-2 border-white rounded-lg overflow-hidden" : "w-full h-96"}></div>
  );
};

export default VideoTrack;
