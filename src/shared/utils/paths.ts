// Utility function to get the correct asset path for both development and production
export const getAssetPath = (path: string): string => {
  // In development, use relative paths
  if (process.env.NODE_ENV === 'development') {
    return path;
  }

  // In production (GitHub Pages), prepend the repository name
  return `/vecto-tv-test-task${path}`;
};

// Specific asset path helpers
export const getImagePath = (filename: string): string => {
  if (!filename) return getAssetPath('/assets/videos/placeholder.svg');
  return getAssetPath(`/assets/${filename}`);
};

export const getIconPath = (filename: string): string => {
  return getAssetPath(`/assets/icons/${filename}`);
};
