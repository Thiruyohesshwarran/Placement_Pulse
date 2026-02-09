import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    summary: {
      totalCompanies: 0,
      totalOffers: 0,
      studentsPlaced: 0,
      placementPercentage: 0
    },
    statusOverview: {
      placed: 0,
      pending: 0,
      rejected: 0
    },
    recentApplications: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      setTimeout(() => {
        setDashboardData({
          summary: {
            totalCompanies: 45,
            totalOffers: 12,
            studentsPlaced: 28,
            placementPercentage: 62.5
          },
          statusOverview: {
            placed: 28,
            pending: 15,
            rejected: 12
          },
          recentApplications: [
            {
              id: 1,
              companyName: 'Google',
              role: 'Software Engineer',
              applicationDate: '2026-02-05',
              status: 'pending'
            },
            {
              id: 2,
              companyName: 'Microsoft',
              role: 'Full Stack Developer',
              applicationDate: '2026-02-03',
              status: 'placed'
            },
            {
              id: 3,
              companyName: 'Amazon',
              role: 'Backend Developer',
              applicationDate: '2026-02-01',
              status: 'rejected'
            },
            {
              id: 4,
              companyName: 'Meta',
              role: 'Frontend Developer',
              applicationDate: '2026-01-28',
              status: 'pending'
            },
            {
              id: 5,
              companyName: 'Apple',
              role: 'iOS Developer',
              applicationDate: '2026-01-25',
              status: 'placed'
            }
          ]
        });
        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-loading">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Welcome to Placement Pulse</p>
      </div>

      <div className="summary-cards">
        <SummaryCard
          title="Total Companies Applied"
          value={dashboardData.summary.totalCompanies}
        />
        <SummaryCard
          title="Total Offers Received"
          value={dashboardData.summary.totalOffers}
        />
        <SummaryCard
          title="Students Placed"
          value={dashboardData.summary.studentsPlaced}
        />
        <SummaryCard
          title="Placement Percentage"
          value={`${dashboardData.summary.placementPercentage}%`}
        />
      </div>

      <div className="charts-section">
        <div className="chart-placeholder">
          <h3>Applications Over Time</h3>
          <div className="chart-content">
            <p>Chart will be implemented here</p>
          </div>
        </div>
        <div className="chart-placeholder">
          <h3>Placement Status Distribution</h3>
          <div className="chart-content">
            <p>Chart will be implemented here</p>
          </div>
        </div>
      </div>

      <div className="status-overview">
        <h2>Placement Status Overview</h2>
        <div className="status-cards">
          <div className="status-card status-placed">
            <div className="status-value">{dashboardData.statusOverview.placed}</div>
            <div className="status-label">Placed</div>
          </div>
          <div className="status-card status-pending">
            <div className="status-value">{dashboardData.statusOverview.pending}</div>
            <div className="status-label">Pending</div>
          </div>
          <div className="status-card status-rejected">
            <div className="status-value">{dashboardData.statusOverview.rejected}</div>
            <div className="status-label">Rejected</div>
          </div>
        </div>
      </div>

      <div className="recent-applications">
        <h2>Recent Applications</h2>
        {dashboardData.recentApplications.length === 0 ? (
          <div className="empty-state">
            <p>No applications found</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Role</th>
                  <th>Application Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentApplications.map((application) => (
                  <tr key={application.id}>
                    <td>{application.companyName}</td>
                    <td>{application.role}</td>
                    <td>{formatDate(application.applicationDate)}</td>
                    <td>
                      <span className={`status-badge status-${application.status}`}>
                        {capitalizeFirstLetter(application.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, icon }) => {
  return (
    <div className="summary-card">
      {icon && <div className="summary-card-icon">{icon}</div>}
      <div className="summary-card-content">
        <h3 className="summary-card-title">{title}</h3>
        <p className="summary-card-value">{value}</p>
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default Dashboard;
