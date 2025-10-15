import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Chip,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ArrowBack as BackIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

interface PackageDetails {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'cancelled';
  origin: string;
  destination: string;
  weight: number;
  dimensions: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  trackingHistory: Array<{
    date: string;
    status: string;
    location: string;
    description: string;
  }>;
}

const PackageDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Mock data - in a real app this would come from an API
  const packageDetails: PackageDetails = {
    id: id || '1',
    trackingNumber: 'SS123456789',
    status: 'in-transit',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    weight: 2.5,
    dimensions: '10x8x6 inches',
    value: 150.00,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16',
    trackingHistory: [
      {
        date: '2024-01-15 10:00 AM',
        status: 'Package Created',
        location: 'New York, NY',
        description: 'Package has been created and is ready for pickup',
      },
      {
        date: '2024-01-15 2:00 PM',
        status: 'Picked Up',
        location: 'New York, NY',
        description: 'Package has been picked up by courier',
      },
      {
        date: '2024-01-16 8:00 AM',
        status: 'In Transit',
        location: 'Chicago, IL',
        description: 'Package is in transit to destination',
      },
    ],
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/packages')}
          sx={{ mr: 2 }}
        >
          Back to Packages
        </Button>
        <Typography variant="h4" component="h1">
          Package Details
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5">
                Tracking Number: {packageDetails.trackingNumber}
              </Typography>
              <Chip
                label={packageDetails.status.replace('-', ' ')}
                color={getStatusColor(packageDetails.status)}
                size="large"
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Origin
                </Typography>
                <Typography variant="body1">{packageDetails.origin}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Destination
                </Typography>
                <Typography variant="body1">{packageDetails.destination}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Weight
                </Typography>
                <Typography variant="body1">{packageDetails.weight} lbs</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Dimensions
                </Typography>
                <Typography variant="body1">{packageDetails.dimensions}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Value
                </Typography>
                <Typography variant="body1">${packageDetails.value}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Created
                </Typography>
                <Typography variant="body1">{packageDetails.createdAt}</Typography>
              </Grid>
            </Grid>

            <Box mt={3}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/packages/${id}/edit`)}
              >
                Edit Package
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tracking History
              </Typography>
              <List dense>
                {packageDetails.trackingHistory.map((event, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={event.status}
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              {event.date}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {event.location}
                            </Typography>
                            <Typography variant="body2">
                              {event.description}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < packageDetails.trackingHistory.length - 1 && (
                      <Divider />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PackageDetails;
