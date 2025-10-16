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
  TextField,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material';
import {
  TrackChanges as TrackIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  CheckCircle as CheckIcon,
  Star as StarIcon
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { number: '10,000+', label: 'Packages Delivered' },
    { number: '50+', label: 'Cities Covered' },
    { number: '99.9%', label: 'On-Time Delivery' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const features = [
    {
      icon: <SpeedIcon color="primary" sx={{ fontSize: 48 }} />,
      title: 'Lightning Fast',
      description: 'Express and overnight shipping options for urgent deliveries. Get your packages where they need to be, when they need to be there.'
    },
    {
      icon: <SecurityIcon color="primary" sx={{ fontSize: 48 }} />,
      title: 'Secure & Reliable',
      description: 'Your packages are handled with utmost care and tracked throughout the entire journey with real-time updates.'
    },
    {
      icon: <SupportIcon color="primary" sx={{ fontSize: 48 }} />,
      title: '24/7 Support',
      description: 'Our dedicated customer service team is available around the clock to assist you with any questions or concerns.'
    }
  ];

  const services = [
    'Standard Shipping (3-5 days)',
    'Express Delivery (1-2 days)',
    'Overnight Service',
    'International Shipping',
    'Package Insurance',
    'Real-time GPS Tracking',
    'Signature Required Delivery',
    'Pickup & Drop-off Locations'
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'E-commerce Store Owner',
      content: 'SwiftShip has revolutionized our delivery process. Fast, reliable, and affordable!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Individual Customer',
      content: 'Outstanding service! My package arrived earlier than expected and in perfect condition.',
      rating: 5
    }
  ];

  const handleTrack = (trackingNumber?: string) => {
    if (trackingNumber && trackingNumber.trim()) {
      navigate(`/track?number=${trackingNumber.trim()}`);
    } else {
      navigate('/track');
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          px: 3,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 'bold' }}>
            SwiftShip
          </Typography>
          <Typography variant="h4" component="p" sx={{ mb: 4, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
            Fast, Reliable & Secure Delivery Services
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 6, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
            Your trusted partner for all shipping needs. From small packages to large cargo, we deliver with precision and care.
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<TrackIcon />}
              onClick={() => navigate('/track')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              Track Package
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/admin')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Admin Dashboard
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box textAlign="center">
                <Typography variant="h2" component="div" color="primary.main" fontWeight="bold">
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Why Choose SwiftShip?
          </Typography>
          <Typography variant="h6" component="p" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
            Experience the difference with our premium shipping solutions
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'translateY(-8px)' }
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
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
        </Container>
      </Box>

      {/* Services & Tracking Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, height: '100%' }}>
              <Typography variant="h4" component="h3" gutterBottom>
                Comprehensive Shipping Solutions
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary">
                From local deliveries to international shipping, we handle it all with the same level of professionalism and care.
              </Typography>
              <List>
                {services.map((service, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
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
            <Paper sx={{ p: 4, height: '100%', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h4" component="h3" gutterBottom>
                Track Your Package
              </Typography>
              <Typography variant="body1" paragraph>
                Enter your tracking number below to get real-time updates on your shipment status.
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
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'white'
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<TrackIcon />}
                  sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f5f5f5' } }}
                >
                  Track Package
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            What Our Customers Say
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} sx={{ color: '#ffc107' }} />
                      ))}
                    </Box>
                    <Typography variant="body1" paragraph>
                      "{testimonial.content}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to Ship?
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of satisfied customers who trust SwiftShip with their deliveries
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/track')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              Track Your Package
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/admin')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Access Admin Panel
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
