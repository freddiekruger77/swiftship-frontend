import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
} from '@mui/material';
import { ArrowBack as BackIcon, Save as SaveIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const CreatePackage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    trackingNumber: '',
    origin: '',
    destination: '',
    weight: '',
    dimensions: '',
    value: '',
    description: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.trackingNumber) newErrors.trackingNumber = 'Tracking number is required';
    if (!formData.origin) newErrors.origin = 'Origin is required';
    if (!formData.destination) newErrors.destination = 'Destination is required';
    if (!formData.weight) newErrors.weight = 'Weight is required';
    if (!formData.dimensions) newErrors.dimensions = 'Dimensions are required';
    if (!formData.value) newErrors.value = 'Value is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await api.post('/packages', formData);
        setSuccess(true);
        setTimeout(() => {
          navigate('/packages');
        }, 2000);
      } catch (error: any) {
        console.error('Failed to create package:', error);
        setErrors({ submit: error.response?.data?.error || 'Failed to create package' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/packages')}
          sx={{ mr: 2 }}
        >
          Back to Packages
        </Button>
        <Typography variant="h4" component="h1">
          Create New Package
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Package created successfully! Redirecting...
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tracking Number"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleChange}
                error={!!errors.trackingNumber}
                helperText={errors.trackingNumber}
                placeholder="e.g., SS123456789"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                error={!!errors.origin}
                helperText={errors.origin}
                placeholder="e.g., New York, NY"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                error={!!errors.destination}
                helperText={errors.destination}
                placeholder="e.g., Los Angeles, CA"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (lbs)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                error={!!errors.weight}
                helperText={errors.weight}
                inputProps={{ step: '0.1' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dimensions"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                error={!!errors.dimensions}
                helperText={errors.dimensions}
                placeholder="e.g., 10x8x6 inches"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Value ($)"
                name="value"
                type="number"
                value={formData.value}
                onChange={handleChange}
                error={!!errors.value}
                helperText={errors.value}
                inputProps={{ step: '0.01' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description (Optional)"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Additional package details..."
              />
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <Alert severity="error">{errors.submit}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  size="large"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Package'}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/packages')}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePackage;
