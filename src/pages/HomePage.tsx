import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  TrackChanges as TrackIcon,
  LocalShipping as ShippingIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SpeedIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'Fast Delivery',
      description: 'Express and overnight shipping options available for urgent deliveries.'
    },
    {
      icon: <SecurityIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'Secure & Reliable',
      description: 'Your packages are handled with care and tracked throughout the entire journey.'
    },
    {
      icon: <SupportIcon color="primary" sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Our customer service team is available around the clock to help you.'
    }
  ];

  const services = [
    'Standard Shipping',
    'Express Delivery',
    'Overnight Service',
    'International Shipping',
    'Package Insurance',
    'Real-time Tracking'
  ];

  const handleTrack = (trackingNumber?: string) => {
    if (trackingNumber && trackingNumber.trim()) {
      navigate(`/track?number=${trackingNumber.trim()}`);
    } else {
      navigate('/track');
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          px: 3,
          borderRadius: 2,
          textAlign: 'center',
          mb: 6
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to SwiftShip
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4 }}>
          Fast & Reliable Delivery Services
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ bgcolor: 'white', color: 'primary.main', mr: 2 }}
          onClick={() => navigate('/track')}
        >
          Track Package
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{ color: 'white', borderColor: 'white' }}
          onClick={() => navigate('/packages')}
        >
          View Dashboard
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Why Choose SwiftShip?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ textAlign: 'center', height: '100%' }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Services Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Everything You Need
              </Typography>
              <Typography variant="body1" paragraph>
                We offer a comprehensive range of shipping solutions to meet all your delivery needs.
              </Typography>
              <List>
                {services.map((service, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={service} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Quick Tracking
              </Typography>
              <Typography variant="body1" paragraph>
                Track your packages instantly with our advanced tracking system.
              </Typography>
              <Box component="form" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const trackingNumber = formData.get('trackingNumber') as string;
                handleTrack(trackingNumber);
              }}>
                <TextField
                  fullWidth
                  label="Enter Tracking Number"
                  name="trackingNumber"
                  placeholder="e.g., SS123456789"
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  startIcon={<TrackIcon />}
                >
                  Track Package
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
