import React, { useCallback, useState } from 'react';
import { FeaturedVideo } from '@/widgets/FeaturedVideo';
import { TrendingCarousel } from '@/widgets/TrendingCarousel';
import { Video } from '@/entities/video';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const [featuredVideo, setFeaturedVideo] = useState<Video | undefined>(
    undefined
  );

  const handleVideoSelect = useCallback((video: Video) => {
    setFeaturedVideo(video);

    setTimeout(() => {
      // Video player overlay will be triggered automatically when isPlaying is true
    }, 2000);
  }, []);

  const handleVideoClick = useCallback(() => {
    // Additional click handling if needed
  }, []);

  const handlePlay = useCallback(() => {
    // Handle play action
  }, []);

  const handleMoreInfo = useCallback(() => {
    // Handle more info action
  }, []);

  return (
    <div className='home-page'>
      <section className='home-page__featured'>
        <FeaturedVideo
          video={featuredVideo}
          onPlay={handlePlay}
          onMoreInfo={handleMoreInfo}
          onVideoSelect={handleVideoSelect}
        />
      </section>

      <section className='home-page__trending'>
        <TrendingCarousel
          maxItems={50}
          visibleItems={8}
          onVideoSelect={handleVideoSelect}
          onVideoClick={handleVideoClick}
        />
      </section>
    </div>
  );
};
