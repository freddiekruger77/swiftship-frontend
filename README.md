# SwiftShip Frontend

A modern React-based shipping management application built with Material-UI and TypeScript, designed for deployment on GitHub Pages.

## Features

- **Package Management**: Create, view, and track packages
- **User Authentication**: Admin login system
- **Real-time Tracking**: Track packages with detailed history
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Material-UI components
- **GitHub Pages Compatible**: Optimized for static hosting

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Material-UI (MUI)** - React component library
- **React Router** - Client-side routing with HashRouter
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd swiftship-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` to configure your backend URL:
```bash
VITE_API_URL=https://swiftship-backend-c5iz.onrender.com
```

4. Start development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Backend Integration

The frontend is configured to connect to the SwiftShip backend API. Make sure your backend is running and accessible at the URL specified in your `.env` file.

### API Endpoints Used

The frontend expects the following backend endpoints:

- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get user profile
- `GET /packages` - List all packages
- `GET /packages/dashboard/stats` - Dashboard statistics
- `GET /packages/:id` - Get package details
- `POST /packages` - Create new package
- `GET /tracking/track/:trackingNumber` - Track package by number

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Key Features for GitHub Pages

- **HashRouter**: Uses hash-based routing for compatibility with static hosting
- **404.html Redirect**: Handles SPA routing by redirecting unknown routes to index.html
- **Base Path Configuration**: Correctly configured for project repositories
- **Static Asset Optimization**: Optimized build for fast loading

### Setup Steps

1. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Select "GitHub Actions" as the source

2. **Deploy**:
   - Push to the `main` branch or create a pull request
   - GitHub Actions will automatically build and deploy the site

3. **Access your site**:
   - The site will be available at `https://<username>.github.io/swiftship-frontend/`

### Manual Build

If you need to build locally:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
swiftship-frontend/
├── .github/workflows/deploy.yml    # GitHub Actions deployment
├── public/
│   ├── 404.html                   # SPA routing fallback
│   └── .nojekyll                  # Disable Jekyll processing
├── src/
│   ├── components/
│   │   └── Layout.tsx             # Main app layout with navigation
│   ├── pages/                     # Page components
│   │   ├── Dashboard.tsx          # Main dashboard
│   │   ├── Login.tsx              # Authentication page
│   │   ├── HomePage.tsx           # Landing page
│   │   ├── Tracking.tsx           # Package tracking page
│   │   ├── Packages.tsx           # Package list page
│   │   ├── PackageDetails.tsx     # Individual package view
│   │   └── CreatePackage.tsx      # Create new package form
│   ├── context/
│   │   └── AuthContext.tsx        # Authentication context
│   ├── utils/
│   │   └── api.ts                 # API configuration and axios instance
│   ├── App.tsx                    # Main app component with HashRouter
│   ├── main.tsx                   # React app entry point
│   └── index.css                  # Global styles
├── index.html                     # Main HTML file with base tag
├── package.json                   # Dependencies and scripts
├── vite.config.ts                 # Build configuration with base path
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation
```

## Configuration

### GitHub Pages Base Path

The app is configured with base path `/swiftship-frontend/` for GitHub Pages project repositories. If you're deploying to a different path, update:

1. **vite.config.ts**:
```typescript
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
  // ...
})
```

2. **index.html**:
```html
<base href="/your-repo-name/" />
```

3. **public/404.html**:
```javascript
var base = '/your-repo-name/';
```

### Development vs Production

- **Development**: Uses Vite proxy to avoid CORS issues
- **Production**: Direct API calls to your backend URL with correct base path
- **GitHub Pages**: Fully compatible with HashRouter and SPA routing

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- TypeScript for type safety
- ESLint for code linting
- Material-UI's styling system

## Troubleshooting

### MIME Type Errors

If you encounter "disallowed MIME type" errors:

1. Ensure your repository name matches the base path in `vite.config.ts`
2. Check that GitHub Pages is enabled and set to deploy from GitHub Actions
3. Verify the `public/404.html` file exists and is properly configured
4. Make sure the `index.html` has the correct `<base>` tag

### Routing Issues

- The app uses HashRouter (`#` in URLs) for GitHub Pages compatibility
- All routes should work correctly with hash-based routing
- Direct links to routes (without `#`) will be handled by the 404.html redirect

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
