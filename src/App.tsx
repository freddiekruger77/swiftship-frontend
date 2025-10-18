import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';

// Components
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';
import CreatePackage from './pages/CreatePackage';
import Tracking from './pages/Tracking';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Loading component
const LoadingSpinner: React.FC = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress />
    <Typography variant="h6" sx={{ mt: 2 }}>
      Loading...
    </Typography>
  </Box>
);

// Error component
const AuthError: React.FC<{ error: string }> = ({ error }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    px={3}
  >
    <Alert severity="error" sx={{ mb: 2, maxWidth: 500 }}>
      {error}
    </Alert>
    <Typography variant="body2" color="text.secondary">
      Please try refreshing the page or contact support if the problem persists.
    </Typography>
  </Box>
);

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = (props) => {
  const { isAuthenticated, loading, error } = useAuth();
  const { children } = props;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <AuthError error={error} />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Main App component
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ display: 'flex' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/track" element={<Tracking />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />

              {/* Admin Routes - Protected */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="packages" element={<Packages />} />
                <Route path="packages/create" element={<CreatePackage />} />
                <Route path="packages/:id" element={<PackageDetails />} />
              </Route>

              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
