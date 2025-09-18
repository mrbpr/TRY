import React, { useState } from 'react';
import { 
  ChartBarIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  HeartIcon,
  TrophyIcon,
  BellIcon,
  PlusIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data - in a real app, this would come from the backend
  const dashboardData = {
    currentStreak: 7,
    totalSessions: 12,
    weeklyGoal: 5,
    completedSessions: 3,
    moodAverage: 7.2,
    upcomingAppointments: [
      {
        id: 1,
        type: 'Individual Therapy',
        counselor: 'Dr. Sarah Johnson',
        date: '2024-01-15',
        time: '2:00 PM',
        status: 'confirmed'
      },
      {
        id: 2,
        type: 'Group Session',
        counselor: 'Michael Chen',
        date: '2024-01-17',
        time: '10:00 AM',
        status: 'pending'
      }
    ],
    recentActivities: [
      {
        id: 1,
        type: 'mood_log',
        description: 'Logged daily mood (8/10)',
        timestamp: '2024-01-12T09:00:00Z'
      },
      {
        id: 2,
        type: 'exercise',
        description: 'Completed breathing exercise',
        timestamp: '2024-01-11T15:30:00Z'
      },
      {
        id: 3,
        type: 'session',
        description: 'Attended therapy session with Dr. Johnson',
        timestamp: '2024-01-10T14:00:00Z'
      }
    ],
    moodData: [
      { day: 'Mon', mood: 6 },
      { day: 'Tue', mood: 7 },
      { day: 'Wed', mood: 8 },
      { day: 'Thu', mood: 6 },
      { day: 'Fri', mood: 9 },
      { day: 'Sat', mood: 7 },
      { day: 'Sun', mood: 8 }
    ],
    goals: [
      { id: 1, title: 'Daily mood logging', progress: 85, target: 7, current: 6 },
      { id: 2, title: 'Weekly therapy sessions', progress: 60, target: 1, current: 0.6 },
      { id: 3, title: 'Mindfulness practice', progress: 40, target: 5, current: 2 }
    ]
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your dashboard.</p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-600">
            Here's an overview of your mental health journey and upcoming activities.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HeartIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.currentStreak} days</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrophyIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sessions Completed</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.totalSessions}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Weekly Goal</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.completedSessions}/{dashboardData.weeklyGoal}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(dashboardData.completedSessions / dashboardData.weeklyGoal) * 100}%` }}></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <HeartIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Mood Average</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.moodAverage}/10</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(dashboardData.moodAverage / 10) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mood Tracking Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Weekly Mood Tracking</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details →
                </button>
              </div>
              <div className="relative">
                {/* Simple mood chart visualization */}
                <div className="flex items-end justify-between h-48 space-x-2">
                  {dashboardData.moodData.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t w-full transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
                        style={{ height: `${(day.mood / 10) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-2">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>Poor (1)</span>
                <span>Excellent (10)</span>
              </div>
            </div>

            {/* Goals Progress */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Goals</h2>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  <PlusIcon className="h-4 w-4" />
                  <span>Add Goal</span>
                </button>
              </div>
              <div className="space-y-4">
                {dashboardData.goals.map((goal) => (
                  <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{goal.title}</h3>
                      <span className="text-sm text-gray-600">{goal.current}/{goal.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{goal.progress}% complete</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {dashboardData.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-full">
                      {activity.type === 'mood_log' && <HeartIcon className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'exercise' && <BookOpenIcon className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'session' && <CalendarDaysIcon className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleDateString()} at {new Date(activity.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <HeartIcon className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-700">Log Today's Mood</span>
                  </div>
                </button>
                <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <CalendarDaysIcon className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-700">Book Appointment</span>
                  </div>
                </button>
                <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <BookOpenIcon className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-700">Start Exercise</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
                <BellIcon className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {dashboardData.upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">{appointment.type}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">with {appointment.counselor}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                  </div>
                ))}
                <button className="w-full p-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-sm font-medium">
                  View All Appointments →
                </button>
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Need Help Now?</h3>
              <p className="text-red-100 text-sm mb-4">
                If you're in crisis, don't wait. Get immediate support.
              </p>
              <div className="space-y-2">
                <button className="w-full py-2 px-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm">
                  Crisis Chat
                </button>
                <a
                  href="tel:988"
                  className="block w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm text-center"
                >
                  Call 988
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;