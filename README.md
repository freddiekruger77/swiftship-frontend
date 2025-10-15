# SwiftShip Frontend

A modern React-based shipping management application built with Material-UI and TypeScript, designed for deployment on Render.

## Features

- **Package Management**: Create, view, and track packages
- **User Authentication**: Admin login system
- **Real-time Tracking**: Track packages with detailed history
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Material-UI components
- **Render Compatible**: Optimized for Render static hosting

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Material-UI (MUI)** - React component library
- **React Router** - Client-side routing with BrowserRouter
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

## Deployment to Render

This project is configured for deployment to Render using static site hosting.

### Key Features for Render

- **BrowserRouter**: Uses standard browser routing (Render supports proper routing)
- **Static Asset Optimization**: Optimized build for fast loading
- **Environment Variables**: Proper API URL configuration for production
- **Render Configuration**: Includes `render.yaml` for easy deployment

### Setup Steps

1. **Connect to Render**:
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure Deployment**:
   - **Name**: `swiftship-frontend` (or your preferred name)
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**: Add `VITE_API_URL=https://swiftship-backend-c5iz.onrender.com`

3. **Deploy**:
   - Click "Create Static Site"
   - Render will automatically build and deploy your site

4. **Access your site**:
   - The site will be available at `https://your-site-name.onrender.com`

### Manual Build

If you need to build locally:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
swiftship-frontend/
├── .env                           # Environment variables
├── render.yaml                    # Render deployment configuration
├── public/                        # Static assets
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
│   ├── App.tsx                    # Main app component with BrowserRouter
│   ├── main.tsx                   # React app entry point
│   └── index.css                  # Global styles
├── index.html                     # Main HTML file
├── package.json                   # Dependencies and scripts
├── vite.config.ts                 # Build configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation
```

## Configuration

### Environment Variables

The app uses environment variables for configuration:

- **VITE_API_URL**: Your backend API URL (set in Render dashboard)
- **Development**: Uses Vite proxy to avoid CORS issues
- **Production**: Direct API calls to your backend URL

### Development vs Production

- **Development**: Uses Vite proxy to avoid CORS issues
- **Production**: Direct API calls to your backend URL
- **Render**: Fully compatible with BrowserRouter and proper routing

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

### Build Issues

If you encounter build issues on Render:

1. Ensure all dependencies are in `package.json`
2. Check that the build command `npm run build` works locally
3. Verify the `render.yaml` configuration is correct
4. Check Render logs for specific error messages

### Routing Issues

- The app uses BrowserRouter for proper routing
- All routes should work correctly with standard browser routing
- Direct links to routes work properly on Render

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
