# SwiftShip Frontend

A modern React-based shipping management application built with Material-UI and TypeScript, designed for deployment on GitHub Pages.

## Features

- **Package Management**: Create, view, and track packages
- **User Authentication**: Admin login system
- **Real-time Tracking**: Track packages with detailed history
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Material-UI components

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Material-UI (MUI)** - React component library
- **React Router** - Client-side routing
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

### Setup Steps

1. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Select "GitHub Actions" as the source

2. **Deploy**:
   - Push to the `main` branch or create a pull request
   - GitHub Actions will automatically build and deploy the site

3. **Access your site**:
   - The site will be available at `https://<username>.github.io/<repository-name>/`

### Manual Build

If you need to build locally:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.tsx      # Main app layout with navigation
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Login.tsx       # Authentication page
│   ├── HomePage.tsx    # Landing page
│   ├── Tracking.tsx    # Package tracking page
│   ├── Packages.tsx    # Package list page
│   ├── PackageDetails.tsx # Individual package view
│   └── CreatePackage.tsx  # Create new package form
├── context/            # React context providers
│   └── AuthContext.tsx # Authentication context
├── utils/              # Utility functions
│   └── api.ts          # API configuration and axios instance
├── App.tsx             # Main app component
├── main.tsx            # React app entry point
└── index.css           # Global styles
```

## Configuration

The app is configured to work with GitHub Pages' subdirectory structure. The `vite.config.ts` handles the base path automatically.

For custom deployment paths, update the `base` property in `vite.config.ts`:

```typescript
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
  // ...
})
```

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

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
