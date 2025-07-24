import { MenuItem, ProfileInfo } from './types';
import homeIcon from '@/shared/assets/icons/Group46.png';
import tvShowsIcon from '@/shared/assets/icons/Group47.png';
import moviesIcon from '@/shared/assets/icons/Group53.png';
import genresIcon from '@/shared/assets/icons/Group54.png';
import watchLaterIcon from '@/shared/assets/icons/Group56.png';
import searchIcon from '@/shared/assets/icons/Search.png';
import languageIcon from '@/shared/assets/icons/Group54.png';
import getHelpIcon from '@/shared/assets/icons/Group47.png';
import avatar from '@/shared/assets/squid-game-player456-2.jpg';

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
