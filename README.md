# TV Application

A modern web-based TV application built with React.js, featuring a sidebar menu, featured video section, and trending videos carousel.

## 🚀 Features

- **Sidebar Menu**: Expandable navigation with icons and profile information
- **Featured Video**: Main video showcase with play and info buttons
- **Trending Carousel**: Horizontal scrolling carousel with 8 visible items
- **Session Storage**: Remembers user interactions and sorts videos by last viewed
- **Responsive Design**: Optimized for TV displays and various screen sizes
- **Error Boundaries**: Graceful error handling throughout the application

## 🏗️ Architecture

Built using **Feature-Sliced Design (FSD)** architecture:

- **`app/`**: Application configuration and providers
- **`pages/`**: Page-level components
- **`widgets/`**: Complex UI components (SidebarMenu, FeaturedVideo, TrendingCarousel)
- **`features/`**: Business logic and custom hooks
- **`entities/`**: Domain entities and data models
- **`shared/`**: Reusable UI components, utilities, and styles

## 🛠️ Technologies

- **React 19** with TypeScript
- **Feature-Sliced Design** architecture
- **CSS Custom Properties** for design tokens
- **Render Props** pattern for component composition
- **Custom Hooks** for business logic separation
- **Session Storage** for user interaction persistence

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vecto-test-task
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🎯 Usage

### Development
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
```

### Project Structure

```
src/
├── app/                    # Application layer
│   ├── App.tsx            # Main App component
│   └── App.css            # App styles
├── pages/                  # Pages layer
│   └── HomePage/          # Home page component
├── widgets/                # Widgets layer
│   ├── SidebarMenu/       # Sidebar navigation
│   ├── FeaturedVideo/     # Featured video showcase
│   └── TrendingCarousel/  # Trending videos carousel
├── features/               # Features layer
│   └── video/             # Video-related business logic
├── entities/               # Entities layer
│   ├── menu/              # Menu data and types
│   └── video/             # Video data and types
├── shared/                 # Shared layer
│   ├── api/               # API data (data.json)
│   ├── ui/                # Reusable UI components
│   └── styles/            # Global styles and design tokens
└── index.tsx              # Application entry point
```

## 🎨 Design System

The application uses CSS Custom Properties for consistent theming:

- **Colors**: Primary, secondary, background, text colors
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale
- **Border Radius**: Standardized corner radius values
- **Shadows**: Elevation and depth system
- **Transitions**: Smooth animation timing

## 📱 Responsive Design

Optimized for:
- **TV Displays** (1920px+)
- **Desktop** (1024px+)
- **Tablet** (768px+)
- **Mobile** (320px+)

## 🔧 Configuration

### TypeScript
- Strict mode enabled
- Path mapping configured for clean imports
- React 18+ JSX transform

### ESLint & Prettier
- TypeScript-aware linting
- Consistent code formatting
- Import sorting and organization

## 📊 Data Source

The application uses data from `src/shared/api/data.json`:
- **Featured Video**: Main showcase content
- **Trending Videos**: Up to 50 trending videos
- **Real Metadata**: Titles, categories, durations, ratings

## 🎯 Key Features

### Sidebar Menu
- Hover to expand with smooth animation
- Profile information display
- Navigation icons with active states
- Bottom menu items (Language, Help, Exit)

### Featured Video
- Cover image with overlay
- Category badge and movie logo
- Meta information (year, rating, duration)
- Play and More Info buttons
- Video player overlay when playing

### Trending Carousel
- Horizontal scrolling with mouse drag
- 8 visible items at a time
- Navigation controls and indicators
- Session storage integration
- Recently viewed indicators

## 🚀 Performance

- **Lazy Loading**: Images and components load on demand
- **Memoization**: Optimized re-renders with useCallback/useMemo
- **Error Boundaries**: Graceful error handling
- **Session Storage**: Efficient user interaction tracking

## 🧪 Testing

```bash
npm test           # Run test suite
npm test -- --watch  # Run tests in watch mode
npm test -- --coverage  # Generate coverage report
```

## 📝 Contributing

1. Follow the Feature-Sliced Design architecture
2. Use TypeScript for type safety
3. Follow the established naming conventions
4. Write meaningful commit messages
5. Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License.
