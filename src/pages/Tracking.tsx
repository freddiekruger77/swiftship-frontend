import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Alert,
  Grid
} from '@mui/material';
import {
  TrackChanges as TrackIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

interface TrackingResult {
  trackingNumber: string;
  status: string;
  origin: string;
  destination: string;
  currentLocation: string;
  estimatedDelivery: string;
  trackingHistory: Array<{
    date: string;
    status: string;
    location: string;
    description: string;
  }>;
}

const Tracking: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [packageData, setPackageData] = useState<TrackingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Mock data for demo - in a real app this would call an API
      if (trackingNumber.toUpperCase() === 'SS123456789') {
        setPackageData({
          trackingNumber: 'SS123456789',
          status: 'in-transit',
          origin: 'New York, NY',
          destination: 'Los Angeles, CA',
          currentLocation: 'Chicago, IL',
          estimatedDelivery: '2024-01-20',
          trackingHistory: [
            {
              date: '2024-01-15 10:00 AM',
              status: 'Package Created',
              location: 'New York, NY',
              description: 'Package has been created and is ready for pickup'
            },
            {
              date: '2024-01-15 2:00 PM',
              status: 'Picked Up',
              location: 'New York, NY',
              description: 'Package has been picked up by courier'
            },
            {
              date: '2024-01-16 8:00 AM',
              status: 'In Transit',
              location: 'Chicago, IL',
              description: 'Package is in transit to destination'
            }
          ]
        });
      } else {
        setError('Package not found');
        setPackageData(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Package not found');
      setPackageData(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in-transit':
        return 'info';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Track Your Package
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleTrack(); }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Enter Tracking Number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g., SS123456789"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<TrackIcon />}
                onClick={handleTrack}
                disabled={loading}
              >
                {loading ? 'Tracking...' : 'Track'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {packageData && (
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5">
                Tracking Number: {packageData.trackingNumber}
              </Typography>
              <Chip
                label={packageData.status.replace('-', ' ')}
                color={getStatusColor(packageData.status)}
                size="large"
              />
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Origin
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {packageData.origin}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Destination
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {packageData.destination}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Current Location
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {packageData.currentLocation}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Estimated Delivery
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {packageData.estimatedDelivery}
                </Typography>
              </Grid>
            </Grid>

            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Tracking History
              </Typography>
              {packageData.trackingHistory.map((event, index) => (
                <Box key={index} mb={2}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body2" color="text.secondary">
                        {event.date}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Chip
                        label={event.status}
                        color={getStatusColor(event.status)}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box display="flex" alignItems="center">
                        <LocationIcon sx={{ mr: 1, fontSize: 16 }} />
                        <Typography variant="body2">
                          {event.location}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2">
                        {event.description}
                      </Typography>
                    </Grid>
                  </Grid>
                  {index < packageData.trackingHistory.length - 1 && (
                    <Box sx={{ ml: 4, mt: 1, mb: 1, height: '1px', bgcolor: 'divider' }} />
                  )}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Tracking;
