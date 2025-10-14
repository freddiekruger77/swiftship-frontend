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
  LocalShipping,
  Schedule,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import axios from '../utils/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    overduePackages: 0,
    statusBreakdown: {}
  });
  const [recentPackages, setRecentPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, packagesResponse] = await Promise.all([
        axios.get('/api/packages/dashboard/stats'),
        axios.get('/api/packages?page=1&limit=5')
      ]);

      setStats(statsResponse.data);
      setRecentPackages(packagesResponse.data.packages);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
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

  const StatCard = ({ title, value, icon, color = 'primary' }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Box>
          <Box color={`${color}.main`}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <Typography>Loading dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Packages"
            value={stats.totalPackages}
            icon={<LocalShipping sx={{ fontSize: 40 }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="In Transit"
            value={stats.statusBreakdown.in_transit || 0}
            icon={<LocalShipping sx={{ fontSize: 40 }} />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Delivered"
            value={stats.statusBreakdown.delivered || 0}
            icon={<CheckCircle sx={{ fontSize: 40 }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Overdue"
            value={stats.overduePackages}
            icon={<Warning sx={{ fontSize: 40 }} />}
            color="error"
          />
        </Grid>
      </Grid>

      {/* Status Breakdown */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Status Breakdown
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {Object.entries(stats.statusBreakdown).map(([status, count]) => (
                <Chip
                  key={status}
                  label={`${status.replace('_', ' ')}: ${count}`}
                  color={getStatusColor(status)}
                  variant="outlined"
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Packages
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Tracking #</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentPackages.map((pkg) => (
                    <TableRow key={pkg._id}>
                      <TableCell>{pkg.trackingNumber}</TableCell>
                      <TableCell>{pkg.customerName}</TableCell>
                      <TableCell>
                        <Chip
                          label={pkg.status.replace('_', ' ')}
                          color={getStatusColor(pkg.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
