import { useState, useCallback, useEffect } from 'react';
import { Video, VideoState, getFeaturedVideo } from '@/entities/video';

export const useFeaturedVideo = (initialVideo?: Video) => {
  const [video, setVideo] = useState<Video | null>(initialVideo || null);
  const [videoState, setVideoState] = useState<VideoState>({
    isPlaying: false,
    isLoading: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: true,
  });

  useEffect(() => {
    if (!initialVideo) {
      const loadFeaturedVideo = async () => {
        try {
          const featuredVideo = await getFeaturedVideo();
          setVideo(featuredVideo);
        } catch {
          // Silent error handling - fallback data will be used
        }
      };

      loadFeaturedVideo();
    }
  }, [initialVideo]);

  const setVideoData = useCallback((newVideo: Video) => {
    setVideo(newVideo);
  }, []);

  const setPlaying = useCallback((playing: boolean) => {
    setVideoState(prev => ({ ...prev, isPlaying: playing }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setVideoState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  const setCurrentTime = useCallback((time: number) => {
    setVideoState(prev => ({ ...prev, currentTime: time }));
  }, []);

  const setDuration = useCallback((duration: number) => {
    setVideoState(prev => ({ ...prev, duration }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setVideoState(prev => ({ ...prev, volume }));
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    setVideoState(prev => ({ ...prev, isMuted: muted }));
  }, []);

  const handlePlay = useCallback(() => {
    if (!video) return;

    setLoading(true);

    setTimeout(() => {
      setPlaying(true);
      setLoading(false);
    }, 1000);
  }, [video, setLoading, setPlaying]);

  const handlePause = useCallback(() => {
    setPlaying(false);
  }, [setPlaying]);

  const handleVideoSelect = useCallback(
    (selectedVideo: Video) => {
      setVideoData(selectedVideo);
      setPlaying(false);
      setLoading(false);
      setCurrentTime(0);
    },
    [setVideoData, setPlaying, setLoading, setCurrentTime]
  );

  const handleVideoEnd = useCallback(() => {
    setPlaying(false);
    setCurrentTime(0);
  }, [setPlaying, setCurrentTime]);

  return {
    video,
    videoState,
    setVideoData,
    setPlaying,
    setLoading,
    setCurrentTime,
    setDuration,
    setVolume,
    setMuted,
    handlePlay,
    handlePause,
    handleVideoSelect,
    handleVideoEnd,
  };
};
