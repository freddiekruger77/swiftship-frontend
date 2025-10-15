import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import {
  LocalShipping as ShippingIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

interface DashboardStats {
  totalPackages: number;
  overduePackages: number;
  statusBreakdown: { [key: string]: number };
}

interface RecentPackage {
  id: string;
  trackingNumber: string;
  status: string;
  destination: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalPackages: 0,
    overduePackages: 0,
    statusBreakdown: {}
  });
  const [recentPackages, setRecentPackages] = useState<RecentPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, packagesResponse] = await Promise.all([
        api.get('/packages/dashboard/stats'),
        api.get('/packages?page=1&limit=5')
      ]);

      setStats(statsResponse.data);
      setRecentPackages(packagesResponse.data.packages);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <ShippingIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Total Packages
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalPackages}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <WarningIcon color="error" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Overdue
                  </Typography>
                  <Typography variant="h4">
                    {stats.overduePackages}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <ScheduleIcon color="warning" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    In Transit
                  </Typography>
                  <Typography variant="h4">
                    {stats.statusBreakdown['in-transit'] || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <CheckCircleIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Delivered
                  </Typography>
                  <Typography variant="h4">
                    {stats.statusBreakdown['delivered'] || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Packages Table */}
      <Paper>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Recent Packages
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tracking Number</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentPackages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>{pkg.trackingNumber}</TableCell>
                    <TableCell>
                      <Chip
                        label={pkg.status.replace('-', ' ')}
                        color={getStatusColor(pkg.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{pkg.destination}</TableCell>
                    <TableCell>{pkg.createdAt}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
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
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
