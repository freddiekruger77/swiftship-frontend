// SwiftShip Frontend JavaScript

// API Base URL - Update this to your Render backend URL
const API_BASE_URL = 'https://your-backend.onrender.com'; // Replace with your actual Render URL

// Utility functions
function showAlert(message, type = 'danger') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    document.body.insertBefore(alertDiv, document.body.firstChild);
    setTimeout(() => alertDiv.remove(), 5000);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleString();
}

// Quick track from homepage
function quickTrack() {
    const trackingNumber = document.getElementById('quickTrackInput').value.trim();
    if (trackingNumber) {
        window.location.href = `track.html?track=${trackingNumber}`;
    } else {
        showAlert('Please enter a tracking number');
    }
}

// Package tracking page
async function trackPackage() {
    const trackingNumber = document.getElementById('trackingNumber').value.trim().toUpperCase();
    if (!trackingNumber) {
        showAlert('Please enter a tracking number');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/tracking/track/${trackingNumber}`);
        const data = await response.json();

        if (response.ok) {
            displayTrackingResults(data);
        } else {
            showAlert(data.error || 'Package not found');
        }
    } catch (error) {
        console.error('Tracking error:', error);
        showAlert('Error connecting to server. Please try again later.');
    }
}

function displayTrackingResults(data) {
    const results = document.getElementById('trackingResults');
    const pkg = data.package;

    // Fill in package details
    document.getElementById('trackNum').textContent = pkg.trackingNumber;
    document.getElementById('customerName').textContent = pkg.customerName;
    document.getElementById('status').textContent = pkg.status.replace('_', ' ');
    document.getElementById('status').className = `badge bg-${getStatusColor(pkg.status)}`;
    document.getElementById('currentLocation').textContent = pkg.currentLocation || 'Not available';
    document.getElementById('estimatedDelivery').textContent = pkg.estimatedDelivery ? formatDate(pkg.estimatedDelivery) : 'Not available';
    document.getElementById('actualDelivery').textContent = pkg.actualDelivery ? formatDate(pkg.actualDelivery) : 'Not delivered yet';

    // Display tracking history
    const historyDiv = document.getElementById('trackingHistory');
    historyDiv.innerHTML = '';

    if (data.trackingHistory && data.trackingHistory.length > 0) {
        data.trackingHistory.forEach(event => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <strong>${event.description}</strong><br>
                <small class="text-muted">${event.location} • ${formatDate(event.timestamp)}</small>
            `;
            historyDiv.appendChild(item);
        });
    } else {
        historyDiv.innerHTML = '<p>No tracking history available.</p>';
    }

    results.style.display = 'block';

    // Scroll to results
    results.scrollIntoView({ behavior: 'smooth' });
}

function getStatusColor(status) {
    switch (status) {
        case 'delivered': return 'success';
        case 'in_transit': return 'info';
        case 'out_for_delivery': return 'warning';
        case 'pending': return 'secondary';
        case 'failed_delivery':
        case 'returned': return 'danger';
        default: return 'secondary';
    }
}

// Admin login
async function login() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showAlert('Please enter both email and password');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('adminToken', data.token);
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('dashboardSection').style.display = 'block';
            loadDashboard();
        } else {
            document.getElementById('loginError').textContent = data.error || 'Login failed';
            document.getElementById('loginError').classList.remove('d-none');
        }
    } catch (error) {
        console.error('Login error:', error);
        showAlert('Error connecting to server');
    }
}

// Logout
function logout() {
    localStorage.removeItem('adminToken');
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('dashboardSection').style.display = 'none';
}

// Load dashboard data
async function loadDashboard() {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
        // Load stats
        const statsResponse = await fetch(`${API_BASE_URL}/api/packages/dashboard/stats`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (statsResponse.ok) {
            const stats = await statsResponse.json();
            document.getElementById('totalPackages').textContent = stats.totalPackages;
            document.getElementById('inTransit').textContent = stats.statusBreakdown.in_transit || 0;
            document.getElementById('delivered').textContent = stats.statusBreakdown.delivered || 0;
            document.getElementById('overdue').textContent = stats.overduePackages;
        }

        // Load recent packages
        const packagesResponse = await fetch(`${API_BASE_URL}/api/packages?page=1&limit=5`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (packagesResponse.ok) {
            const data = await packagesResponse.json();
            const tbody = document.getElementById('recentPackages');
            tbody.innerHTML = '';

            data.packages.forEach(pkg => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pkg.trackingNumber}</td>
                    <td>${pkg.customerName}</td>
                    <td><span class="badge bg-${getStatusColor(pkg.status)}">${pkg.status.replace('_', ' ')}</span></td>
                    <td>${formatDate(pkg.createdAt)}</td>
                    <td><button class="btn btn-sm btn-primary" onclick="viewPackage('${pkg._id}')">View</button></td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Dashboard load error:', error);
        showAlert('Error loading dashboard data');
    }
}

// View package details (placeholder - could link to a detailed page)
function viewPackage(id) {
    alert(`View package details for ID: ${id}`);
    // In a full implementation, this would navigate to a package details page
}

// Check for tracking query parameter on page load
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const trackParam = urlParams.get('track');

    if (trackParam) {
        document.getElementById('trackingNumber').value = trackParam;
        trackPackage();
    }

    // Check if admin is already logged in
    const token = localStorage.getItem('adminToken');
    if (token && window.location.pathname.includes('admin.html')) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('dashboardSection').style.display = 'block';
        loadDashboard();
    }
});
