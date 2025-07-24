import React, { useState, useCallback, useRef, useEffect } from 'react';
import { CarouselState } from '@/entities/video';

export const useCarousel = (totalItems: number, visibleItems: number = 8) => {
  const [carouselState, setCarouselState] = useState<CarouselState>({
    currentIndex: 0,
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    isAutoScrolling: false,
  });

  // Add touch tracking for better mobile interaction
  const [touchStartTime, setTouchStartTime] = useState<number>(0);
  const [touchDistance, setTouchDistance] = useState<number>(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const maxIndex = Math.max(0, totalItems - visibleItems);
  const needsScrolling = totalItems > visibleItems;

  useEffect(() => {
    if (carouselState.currentIndex > maxIndex) {
      setCarouselState(prev => ({ ...prev, currentIndex: maxIndex }));
    }
  }, [totalItems, maxIndex, carouselState.currentIndex]);

  const setCurrentIndex = useCallback(
    (index: number) => {
      if (!needsScrolling) return;

      let clampedIndex = index;
      if (index < 0) {
        clampedIndex = maxIndex;
      } else if (index > maxIndex) {
        clampedIndex = 0;
      }

      setCarouselState(prev => ({ ...prev, currentIndex: clampedIndex }));
    },
    [maxIndex, needsScrolling]
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!carouselRef.current) return;

      let clampedIndex = index;
      if (index < 0) {
        clampedIndex = maxIndex;
      } else if (index > maxIndex) {
        clampedIndex = 0;
      }

      // Use fixed item width based on screen size
      const getItemWidth = () => {
        if (window.innerWidth <= 480) return 120;
        if (window.innerWidth <= 768) return 150;
        if (window.innerWidth <= 1024) return 180;
        return 200;
      };

      const itemWidth = getItemWidth() + 16; // 16px gap
      const scrollPosition = clampedIndex * itemWidth;

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });

      setCurrentIndex(clampedIndex);
    },
    [maxIndex, setCurrentIndex]
  );

  // Enhanced scroll to center an item (useful for mobile clicks)
  const scrollToCenterItem = useCallback(
    (itemIndex: number) => {
      if (!carouselRef.current || !needsScrolling) return;

      const containerWidth = carouselRef.current.clientWidth;
      const getItemWidth = () => {
        if (window.innerWidth <= 480) return 120;
        if (window.innerWidth <= 768) return 150;
        if (window.innerWidth <= 1024) return 180;
        return 200;
      };

      const itemWidth = getItemWidth() + 16; // 16px gap
      const centerOffset = containerWidth / 2 - itemWidth / 2;
      const scrollPosition = itemIndex * itemWidth - centerOffset;

      carouselRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth',
      });

      setCurrentIndex(itemIndex);
    },
    [setCurrentIndex, needsScrolling]
  );

  const scrollLeft = useCallback(() => {
    if (!carouselRef.current) return;

    const scrollAmount = 216; // 200px item + 16px gap

    carouselRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });

    const newIndex = Math.max(0, carouselState.currentIndex - 1);
    setCurrentIndex(newIndex);
  }, [carouselState.currentIndex, setCurrentIndex]);

  const scrollRight = useCallback(() => {
    if (!carouselRef.current) return;

    const scrollAmount = 216; // 200px item + 16px gap

    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });

    const newIndex = Math.min(maxIndex, carouselState.currentIndex + 1);
    setCurrentIndex(newIndex);
  }, [carouselState.currentIndex, maxIndex, setCurrentIndex]);

  const scrollToStart = useCallback(() => {
    if (!needsScrolling) return;
    scrollToIndex(0);
  }, [scrollToIndex, needsScrolling]);

  const scrollToEnd = useCallback(() => {
    if (!needsScrolling) return;
    scrollToIndex(maxIndex);
  }, [maxIndex, scrollToIndex, needsScrolling]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const carousel = carouselRef.current;
      if (!carousel || !needsScrolling) return;

      setCarouselState(prev => ({
        ...prev,
        isDragging: true,
        startX: e.pageX - carousel.offsetLeft,
        scrollLeft: carousel.scrollLeft,
      }));
    },
    [needsScrolling]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const carousel = carouselRef.current;
      if (!carousel || !carouselState.isDragging || !needsScrolling) return;

      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - carouselState.startX) * 2;
      carousel.scrollLeft = carouselState.scrollLeft - walk;
    },
    [
      carouselState.isDragging,
      carouselState.startX,
      carouselState.scrollLeft,
      needsScrolling,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setCarouselState(prev => ({ ...prev, isDragging: false }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCarouselState(prev => ({ ...prev, isDragging: false }));
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const carousel = carouselRef.current;
      if (!carousel || !needsScrolling) return;

      setTouchStartTime(Date.now());
      setTouchDistance(0);

      setCarouselState(prev => ({
        ...prev,
        isDragging: true,
        startX: e.touches[0].pageX - carousel.offsetLeft,
        scrollLeft: carousel.scrollLeft,
      }));
    },
    [needsScrolling]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const carousel = carouselRef.current;
      if (!carousel || !carouselState.isDragging || !needsScrolling) return;

      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - carouselState.startX) * 2;
      carousel.scrollLeft = carouselState.scrollLeft - walk;

      // Track touch distance for better mobile interaction
      setTouchDistance(Math.abs(walk));
    },
    [
      carouselState.isDragging,
      carouselState.startX,
      carouselState.scrollLeft,
      needsScrolling,
    ]
  );

  const handleTouchEnd = useCallback(() => {
    setCarouselState(prev => ({ ...prev, isDragging: false }));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!needsScrolling) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          scrollLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          scrollRight();
          break;
        case 'Home':
          e.preventDefault();
          scrollToStart();
          break;
        case 'End':
          e.preventDefault();
          scrollToEnd();
          break;
      }
    },
    [scrollLeft, scrollRight, scrollToStart, scrollToEnd, needsScrolling]
  );

  const startAutoScroll = useCallback(() => {
    if (!needsScrolling) return;
    setCarouselState(prev => ({ ...prev, isAutoScrolling: true }));
  }, [needsScrolling]);

  const stopAutoScroll = useCallback(() => {
    setCarouselState(prev => ({ ...prev, isAutoScrolling: false }));
  }, []);

  // Helper function to determine if touch was a tap (not a drag)
  const isTouchTap = useCallback(() => {
    const touchDuration = Date.now() - touchStartTime;
    const isShortTouch = touchDuration < 300; // Less than 300ms
    const isSmallDistance = touchDistance < 10; // Less than 10px movement
    return isShortTouch && isSmallDistance;
  }, [touchStartTime, touchDistance]);

  const handleScroll = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel || !needsScrolling) return;

    const scrollLeft = carousel.scrollLeft;
    const getItemWidth = () => {
      if (window.innerWidth <= 480) return 120;
      if (window.innerWidth <= 768) return 150;
      if (window.innerWidth <= 1024) return 180;
      return 200;
    };

    const itemWidth = getItemWidth() + 16; // 16px gap
    const newIndex = Math.round(scrollLeft / itemWidth);

    if (
      newIndex !== carouselState.currentIndex &&
      newIndex >= 0 &&
      newIndex <= maxIndex
    ) {
      setCurrentIndex(newIndex);
    }
  }, [carouselState.currentIndex, setCurrentIndex, needsScrolling, maxIndex]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !needsScrolling) return;

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [handleScroll, needsScrolling]);

  const canScrollLeft = needsScrolling && carouselState.currentIndex > 0;
  const canScrollRight =
    needsScrolling && carouselState.currentIndex < maxIndex;

  return {
    carouselRef,
    carouselState,
    currentIndex: carouselState.currentIndex,
    isDragging: carouselState.isDragging,
    isAutoScrolling: carouselState.isAutoScrolling,
    canScrollLeft,
    canScrollRight,
    maxIndex,
    needsScrolling,
    setCurrentIndex,
    scrollToIndex,
    scrollToCenterItem,
    scrollLeft,
    scrollRight,
    scrollToStart,
    scrollToEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
    startAutoScroll,
    stopAutoScroll,
    isTouchTap,
  };
};
