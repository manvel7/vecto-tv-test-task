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
      if (!carouselRef.current || !needsScrolling) return;

      let clampedIndex = index;
      if (index < 0) {
        clampedIndex = maxIndex;
      } else if (index > maxIndex) {
        clampedIndex = 0;
      }

      const itemWidth = carouselRef.current.scrollWidth / totalItems;
      const scrollPosition = clampedIndex * itemWidth;

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });

      setCurrentIndex(clampedIndex);
    },
    [maxIndex, totalItems, setCurrentIndex, needsScrolling]
  );

  const scrollLeft = useCallback(() => {
    if (!needsScrolling) return;
    const newIndex = carouselState.currentIndex - 1;
    scrollToIndex(newIndex);
  }, [carouselState.currentIndex, scrollToIndex, needsScrolling]);

  const scrollRight = useCallback(() => {
    if (!needsScrolling) return;
    const newIndex = carouselState.currentIndex + 1;
    scrollToIndex(newIndex);
  }, [carouselState.currentIndex, scrollToIndex, needsScrolling]);

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

  const handleScroll = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel || !needsScrolling) return;

    const scrollLeft = carousel.scrollLeft;
    const itemWidth = carousel.scrollWidth / totalItems;
    const newIndex = Math.round(scrollLeft / itemWidth);

    if (newIndex !== carouselState.currentIndex) {
      setCurrentIndex(newIndex);
    }
  }, [totalItems, carouselState.currentIndex, setCurrentIndex, needsScrolling]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !needsScrolling) return;

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [handleScroll, needsScrolling]);

  const canScrollLeft = needsScrolling && totalItems > 0;
  const canScrollRight = needsScrolling && totalItems > 0;

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
  };
};
