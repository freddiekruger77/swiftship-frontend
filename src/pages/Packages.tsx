import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from '@mui/material';
import { Add as AddIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Package {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'cancelled';
  origin: string;
  destination: string;
  createdAt: string;
}

const Packages: React.FC = () => {
  const navigate = useNavigate();

  // Mock data - in a real app this would come from an API
  const packages: Package[] = [
    {
      id: '1',
      trackingNumber: 'SS123456789',
      status: 'in-transit',
      origin: 'New York, NY',
      destination: 'Los Angeles, CA',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      trackingNumber: 'SS987654321',
      status: 'delivered',
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      createdAt: '2024-01-10',
    },
  ];

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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Packages
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/packages/create')}
        >
          Create Package
        </Button>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tracking Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Origin</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell>{pkg.trackingNumber}</TableCell>
                  <TableCell>
                    <Chip
                      label={pkg.status.replace('-', ' ')}
                      color={getStatusColor(pkg.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{pkg.origin}</TableCell>
                  <TableCell>{pkg.destination}</TableCell>
                  <TableCell>{pkg.createdAt}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<ViewIcon />}
                      onClick={() => navigate(`/packages/${pkg.id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Packages;
