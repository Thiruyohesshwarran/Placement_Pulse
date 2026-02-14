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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to Placement Pulse</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Applications Over Time
          </h3>
          <div className="h-48 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-xl">
            Chart will be implemented here
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Placement Status Distribution
          </h3>
          <div className="h-48 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-xl">
            Chart will be implemented here
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-10 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Placement Status Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatusCard
            label="Placed"
            value={dashboardData.statusOverview.placed}
            color="green"
          />
          <StatusCard
            label="Pending"
            value={dashboardData.statusOverview.pending}
            color="yellow"
          />
          <StatusCard
            label="Rejected"
            value={dashboardData.statusOverview.rejected}
            color="red"
          />
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Recent Applications
        </h2>

        {dashboardData.recentApplications.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No applications found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Application Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {application.companyName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {application.role}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {formatDate(application.applicationDate)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={application.status} />
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

const SummaryCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
      <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
      <p className="text-3xl font-bold text-indigo-600 mt-2">{value}</p>
    </div>
  );
};

const StatusCard = ({ label, value, color }) => {
  const colorMap = {
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600"
  };

  return (
    <div className="rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
      <div className={`text-3xl font-bold mb-2 ${colorMap[color]}`}>
        {value}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    placed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700"
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles[status]}`}
    >
      {status}
    </span>
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

export default Dashboard;
