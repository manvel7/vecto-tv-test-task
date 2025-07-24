import { useState, useEffect, useCallback } from 'react';
import { Video } from '@/entities/video';

const SESSION_STORAGE_KEYS = {
  VIEWED_VIDEOS: 'tv_app_viewed_videos',
  LAST_VIEWED_TIME: 'tv_app_last_viewed_time',
} as const;

export const useSessionStorage = () => {
  const [viewedVideoIds, setViewedVideoIds] = useState<string[]>([]);
  const [lastViewedTime, setLastViewedTime] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    try {
      const storedViewedIds = sessionStorage.getItem(
        SESSION_STORAGE_KEYS.VIEWED_VIDEOS
      );
      const storedLastViewed = sessionStorage.getItem(
        SESSION_STORAGE_KEYS.LAST_VIEWED_TIME
      );

      if (storedViewedIds) {
        setViewedVideoIds(JSON.parse(storedViewedIds));
      }

      if (storedLastViewed) {
        setLastViewedTime(JSON.parse(storedLastViewed));
      }
    } catch {
      // Silent error handling - start with empty state
    }
  }, []);

  const addViewedVideo = useCallback(
    (videoId: string) => {
      try {
        const currentTime = Date.now();
        const newViewedIds = [
          videoId,
          ...viewedVideoIds.filter(id => id !== videoId),
        ];
        const newLastViewed = { ...lastViewedTime, [videoId]: currentTime };

        const limitedViewedIds = newViewedIds.slice(0, 20);

        setViewedVideoIds(limitedViewedIds);
        setLastViewedTime(newLastViewed);

        sessionStorage.setItem(
          SESSION_STORAGE_KEYS.VIEWED_VIDEOS,
          JSON.stringify(limitedViewedIds)
        );
        sessionStorage.setItem(
          SESSION_STORAGE_KEYS.LAST_VIEWED_TIME,
          JSON.stringify(newLastViewed)
        );
      } catch {
        // Silent error handling - continue without saving
      }
    },
    [viewedVideoIds, lastViewedTime]
  );

  const getSortedVideosByViewed = useCallback(
    (videos: Video[]) => {
      const viewedVideos = videos.filter(video =>
        viewedVideoIds.includes(video.id)
      );
      const nonViewedVideos = videos.filter(
        video => !viewedVideoIds.includes(video.id)
      );

      const sortedViewedVideos = viewedVideos.sort((a, b) => {
        const aIndex = viewedVideoIds.indexOf(a.id);
        const bIndex = viewedVideoIds.indexOf(b.id);
        return aIndex - bIndex;
      });

      const sortedNonViewedVideos = nonViewedVideos.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return [...sortedViewedVideos, ...sortedNonViewedVideos];
    },
    [viewedVideoIds]
  );

  const isRecentlyViewed = useCallback(
    (videoId: string, thresholdMinutes: number = 30) => {
      const lastViewed = lastViewedTime[videoId];
      if (!lastViewed) return false;

      const thresholdMs = thresholdMinutes * 60 * 1000;
      return Date.now() - lastViewed < thresholdMs;
    },
    [lastViewedTime]
  );

  const getViewCount = useCallback(
    (videoId: string) => {
      return viewedVideoIds.filter(id => id === videoId).length;
    },
    [viewedVideoIds]
  );

  const clearSessionStorage = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.VIEWED_VIDEOS);
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.LAST_VIEWED_TIME);
      setViewedVideoIds([]);
      setLastViewedTime({});
    } catch {
      // Silent error handling
    }
  }, []);

  return {
    viewedVideoIds,
    lastViewedTime,
    addViewedVideo,
    getSortedVideosByViewed,
    isRecentlyViewed,
    getViewCount,
    clearSessionStorage,
  };
};
