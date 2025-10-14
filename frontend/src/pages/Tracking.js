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
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  Alert,
  Grid
} from '@mui/material';
import {
  TrackChanges,
  LocationOn,
  Schedule,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import axios from '../utils/axios';

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [packageData, setPackageData] = useState(null);
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
      const response = await axios.get(`/api/tracking/track/${trackingNumber.toUpperCase()}`);
      setPackageData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Package not found');
      setPackageData(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'in_transit':
        return 'info';
      case 'out_for_delivery':
        return 'warning';
      case 'pending':
        return 'default';
      case 'failed_delivery':
      case 'returned':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle />;
      case 'in_transit':
      case 'out_for_delivery':
        return <TrackChanges />;
      case 'pending':
        return <Schedule />;
      default:
        return <Warning />;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          SwiftShip Package Tracking
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Enter Tracking Number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
              placeholder="e.g., SS123456789"
              onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
            />
            <Button
              variant="contained"
              onClick={handleTrack}
              disabled={loading}
              startIcon={<TrackChanges />}
            >
              {loading ? 'Tracking...' : 'Track'}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Paper>

        {packageData && (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Package Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Tracking Number
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {packageData.package.trackingNumber}
                  </Typography>

                  <Typography variant="subtitle1" color="text.secondary">
                    Customer
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {packageData.package.customerName}
                  </Typography>

                  <Typography variant="subtitle1" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    label={packageData.package.status.replace('_', ' ')}
                    color={getStatusColor(packageData.package.status)}
                    icon={getStatusIcon(packageData.package.status)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Current Location
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {packageData.package.currentLocation || 'Not available'}
                  </Typography>

                  <Typography variant="subtitle1" color="text.secondary">
                    Estimated Delivery
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {packageData.package.estimatedDelivery
                      ? new Date(packageData.package.estimatedDelivery).toLocaleDateString()
                      : 'Not available'
                    }
                  </Typography>

                  {packageData.package.actualDelivery && (
                    <>
                      <Typography variant="subtitle1" color="text.secondary">
                        Delivered On
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {new Date(packageData.package.actualDelivery).toLocaleDateString()}
                      </Typography>
                    </>
                  )}

                  {packageData.package.isOverdue && (
                    <Alert severity="warning" sx={{ mt: 1 }}>
                      This package is overdue for delivery.
                    </Alert>
                  )}
                </Grid>
              </Grid>

              {packageData.trackingHistory && packageData.trackingHistory.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Tracking History
                  </Typography>
                  <Timeline>
                    {packageData.trackingHistory.map((event, index) => (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <TimelineDot color={getStatusColor(event.status)}>
                            {getStatusIcon(event.status)}
                          </TimelineDot>
                          {index < packageData.trackingHistory.length - 1 && (
                            <TimelineConnector />
                          )}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="subtitle1">
                            {event.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {event.location} • {new Date(event.timestamp).toLocaleString()}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default Tracking;
