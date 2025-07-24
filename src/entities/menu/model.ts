import { MenuItem, ProfileInfo } from './types';
import { getIconPath, getImagePath } from '@/shared/utils/paths';

// Use public URLs for GitHub Pages compatibility
const homeIcon = getIconPath('Group46.png');
const tvShowsIcon = getIconPath('Group47.png');
const moviesIcon = getIconPath('Group53.png');
const genresIcon = getIconPath('Group54.png');
const watchLaterIcon = getIconPath('Group56.png');
const searchIcon = getIconPath('Search.png');
const languageIcon = getIconPath('Group54.png');
const getHelpIcon = getIconPath('Group47.png');
const avatar = getImagePath('squid-game-player456-2.jpg');

export const defaultMenuItems: MenuItem[] = [
  {
    id: 'search',
    label: 'Search',
    icon: searchIcon,
    path: '/search',
  },
  {
    id: 'home',
    label: 'Home',
    icon: homeIcon,
    path: '/',
    isActive: true,
  },
  {
    id: 'tv-shows',
    label: 'TV Shows',
    icon: tvShowsIcon,
    path: '/tv-shows',
  },
  {
    id: 'movies',
    label: 'Movies',
    icon: moviesIcon,
    path: '/movies',
  },
  {
    id: 'genres',
    label: 'Genres',
    icon: genresIcon,
    path: '/genres',
  },
  {
    id: 'watch-later',
    label: 'Watch Later',
    icon: watchLaterIcon,
    path: '/watch-later',
  },
];

export const defaultProfileInfo: ProfileInfo = {
  id: 'user-1',
  name: 'Daniel',
  avatar: avatar,
};

export const defaultBottomMenuItems: MenuItem[] = [
  {
    id: 'language',
    label: 'Language',
    icon: languageIcon,
  },
  {
    id: 'get-help',
    label: 'Get Help',
    icon: getHelpIcon,
  },
  {
    id: 'exit',
    label: 'Exit',
    icon: homeIcon,
  },
];
