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
  TrackChanges,
  LocalShipping,
  Speed,
  Security,
  Support,
  CheckCircle
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Speed color="primary" />,
      title: 'Fast Delivery',
      description: 'Express and overnight shipping options available for urgent deliveries.'
    },
    {
      icon: <Security color="primary" />,
      title: 'Secure & Reliable',
      description: 'Your packages are handled with care and tracked throughout the entire journey.'
    },
    {
      icon: <Support color="primary" />,
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

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            SwiftShip - Fast & Reliable Delivery
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Your trusted partner for all shipping needs
          </Typography>

          {/* Quick Tracking */}
          <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', bgcolor: 'rgba(255,255,255,0.9)' }}>
            <Typography variant="h6" gutterBottom>
              Track Your Package
            </Typography>
            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                placeholder="Enter tracking number (e.g., SS123456789)"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/track')}
                startIcon={<TrackChanges />}
              >
                Track
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Why Choose SwiftShip?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Box sx={{ fontSize: 48, mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom>
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

      {/* Services Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>
                Our Services
              </Typography>
              <Typography variant="body1" paragraph>
                We offer a comprehensive range of shipping solutions to meet all your delivery needs,
                from small packages to large freight shipments.
              </Typography>
              <List>
                {services.map((service, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={service} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
                startIcon={<LocalShipping />}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="400"
                image="/api/placeholder/400/400"
                alt="Shipping services"
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6, textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Ready to Ship?
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Contact us today for a quote or create your shipment online.
          </Typography>
          <Box display="flex" gap={2} justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/track')}
              startIcon={<TrackChanges />}
            >
              Track Package
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 4 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                SwiftShip
              </Typography>
              <Typography variant="body2">
                Your trusted shipping partner for fast, reliable, and secure delivery services.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Services
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Standard Shipping" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Express Delivery" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Package Tracking" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2">
                Email: info@swiftship.com<br />
                Phone: 1-800-SWIFTSHIP<br />
                Address: 123 Shipping Lane, Deliver City, DC 12345
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
