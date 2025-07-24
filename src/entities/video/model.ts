import {
  Video,
  RawVideoData,
  RawFeaturedData,
  RawDataStructure,
} from './types';

// Import images from shared assets
import FeaturedCoverImage from '@/shared/assets/FeaturedCoverImage.png';
import FeaturedTitleImage from '@/shared/assets/FeaturedTitleImage.png';
import httpsSpecials1 from '@/shared/assets/https_specials-1.png';
import httpsSpecials2 from '@/shared/assets/https_specials-2.png';
import httpsSpecials3 from '@/shared/assets/https_specials-3.png';
import httpsSpecials4 from '@/shared/assets/https_specials-4.png';
import httpsSpecials5 from '@/shared/assets/https_specials-5.png';
import httpsSpecials6 from '@/shared/assets/https_specials-6.png';
import httpsSpecials7 from '@/shared/assets/https_specials-7.png';
import httpsSpecials8 from '@/shared/assets/https_specials-8.png';

// Data fetching utilities
export const fetchVideoData = async (): Promise<RawDataStructure> => {
  try {
    // Use the public folder path for static files
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    return await response.json();
  } catch {
    // If the fetch fails, return fallback data immediately
    throw new Error('Failed to fetch video data');
  }
};

// Image mapping for the JSON data
const imageMap: Record<string, string> = {
  'FeaturedCoverImage.png': FeaturedCoverImage,
  'FeaturedTitleImage.png': FeaturedTitleImage,
  'https_specials-1.png': httpsSpecials1,
  'https_specials-2.png': httpsSpecials2,
  'https_specials-3.png': httpsSpecials3,
  'https_specials-4.png': httpsSpecials4,
  'https_specials-5.png': httpsSpecials5,
  'https_specials-6.png': httpsSpecials6,
  'https_specials-7.png': httpsSpecials7,
  'https_specials-8.png': httpsSpecials8,
};

// Helper function to get image path with fallback
const getImagePath = (filename: string): string => {
  if (!filename) return '/assets/videos/placeholder.svg';

  // Use the imported image if available
  const importedImage = imageMap[filename];
  if (importedImage) {
    return importedImage;
  }

  // Fallback to public assets
  return `/assets/${filename}`;
};

// Data transformation utilities
export const transformRawVideoData = (rawData: RawVideoData): Video => {
  return {
    id: rawData.Id,
    title: rawData.Title,
    description: rawData.Description,
    category: rawData.Category,
    releaseYear: rawData.ReleaseYear,
    mpaRating: rawData.MpaRating,
    duration: formatDuration(rawData.Duration),
    coverImage: getImagePath(rawData.CoverImage),
    logoImage: getImagePath(rawData.TitleImage),
    videoUrl: rawData.VideoUrl,
    createdAt: rawData.Date,
    updatedAt: rawData.Date,
  };
};

export const transformRawFeaturedData = (rawData: RawFeaturedData): Video => {
  return {
    id: rawData.Id,
    title: rawData.Title,
    description: rawData.Description,
    category: rawData.Category,
    releaseYear: rawData.ReleaseYear,
    mpaRating: rawData.MpaRating,
    duration: formatDuration(rawData.Duration),
    coverImage: getImagePath(rawData.CoverImage),
    logoImage: getImagePath(rawData.TitleImage),
    isFeatured: true,
    createdAt: rawData.Date,
    updatedAt: rawData.Date,
  };
};

// Duration formatting utility
export const formatDuration = (durationInSeconds: string): string => {
  const seconds = parseInt(durationInSeconds, 10);
  if (isNaN(seconds)) return '0m';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

// Data fetching and transformation
export const getVideoData = async (): Promise<{
  featured: Video;
  trending: Video[];
}> => {
  try {
    const rawData = await fetchVideoData();

    const featured = transformRawFeaturedData(rawData.Featured);
    const trending = rawData.TendingNow.map(transformRawVideoData);

    return { featured, trending };
  } catch {
    // Fallback to sample data if fetch fails
    return getFallbackData();
  }
};

// Fallback data in case JSON fetch fails
const getFallbackData = (): { featured: Video; trending: Video[] } => {
  const fallbackFeatured: Video = {
    id: '1',
    title: 'The Irishman',
    description: 'Info About it',
    category: 'Movie',
    releaseYear: '2021',
    mpaRating: '18+',
    duration: '1h 40m',
    coverImage: '/assets/videos/placeholder.svg',
    logoImage: '/assets/videos/placeholder.svg',
    isFeatured: true,
    createdAt: '2021-10-24T12:16:50.894556',
    updatedAt: '2021-10-24T12:16:50.894556',
  };

  const fallbackTrending: Video[] = [
    {
      id: '1',
      title: 'Title 1',
      description: 'Info About it',
      category: 'Movie',
      releaseYear: '2021',
      mpaRating: '18+',
      duration: '33m',
      coverImage: '/assets/videos/placeholder.svg',
      logoImage: '/assets/videos/placeholder.svg',
      videoUrl:
        'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      createdAt: '2021-10-24T12:16:50.894556',
      updatedAt: '2021-10-24T12:16:50.894556',
    },
    {
      id: '2',
      title: 'Title 2',
      description: 'Info About it',
      category: 'TV Show',
      releaseYear: '2021',
      mpaRating: '18+',
      duration: '38m',
      coverImage: '/assets/videos/placeholder.svg',
      logoImage: '/assets/videos/placeholder.svg',
      videoUrl:
        'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      createdAt: '2021-10-12T12:16:50.894556',
      updatedAt: '2021-10-12T12:16:50.894556',
    },
    {
      id: '3',
      title: 'Title 3',
      description: 'Info About it',
      category: 'Movie',
      releaseYear: '2021',
      mpaRating: '18+',
      duration: '1h 40m',
      coverImage: '/assets/videos/placeholder.svg',
      logoImage: '/assets/videos/placeholder.svg',
      videoUrl:
        'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      createdAt: '2021-10-11T12:16:50.894556',
      updatedAt: '2021-10-11T12:16:50.894556',
    },
    {
      id: '4',
      title: 'Title 4',
      description: 'Info About it',
      category: 'Movie',
      releaseYear: '2021',
      mpaRating: '18+',
      duration: '1h 7m',
      coverImage: '/assets/videos/placeholder.svg',
      logoImage: '/assets/videos/placeholder.svg',
      videoUrl:
        'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      createdAt: '2021-10-10T12:16:50.894556',
      updatedAt: '2021-10-10T12:16:50.894556',
    },
    {
      id: '5',
      title: 'Title 5',
      description: 'Info About it',
      category: 'TV Show',
      releaseYear: '2021',
      mpaRating: '18+',
      duration: '1h 28m',
      coverImage: '/assets/videos/placeholder.svg',
      logoImage: '/assets/videos/placeholder.svg',
      videoUrl:
        'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      createdAt: '2021-10-15T12:16:50.894556',
      updatedAt: '2021-10-15T12:16:50.894556',
    },
  ];

  return { featured: fallbackFeatured, trending: fallbackTrending };
};

// Legacy functions for backward compatibility
export const getFeaturedVideo = async (): Promise<Video> => {
  const { featured } = await getVideoData();
  return featured;
};

export const getTrendingVideos = async (
  maxCount: number = 50
): Promise<Video[]> => {
  const { trending } = await getVideoData();
  // Sort by creation date (newest first) and limit to max 50 items
  const sortedVideos = [...trending]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, Math.min(maxCount, 50)); // Ensure max 50 items

  return sortedVideos;
};

export const sortVideosByLastViewed = (
  videos: Video[],
  viewedIds: string[]
): Video[] => {
  const viewedVideos = videos.filter(video => viewedIds.includes(video.id));
  const nonViewedVideos = videos.filter(video => !viewedIds.includes(video.id));

  // Sort viewed videos by their order in viewedIds (most recent first)
  const sortedViewedVideos = viewedVideos.sort((a, b) => {
    const aIndex = viewedIds.indexOf(a.id);
    const bIndex = viewedIds.indexOf(b.id);
    return aIndex - bIndex;
  });

  // Sort non-viewed videos by creation date
  const sortedNonViewedVideos = nonViewedVideos.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return [...sortedViewedVideos, ...sortedNonViewedVideos];
};
