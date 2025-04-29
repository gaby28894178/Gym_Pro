import React, { useState } from 'react';
import LayoutHeader from './components/LayoutHeader';
import SidebarNav from './components/SidebarNav';
import DashboardStats from './components/DashboardStats';
import MembersTable from './components/MembersTable';
import UpcomingClasses from './components/UpcomingClasses';
import TrainersGrid from './components/TrainersGrid';
import MetricsCharts from './components/MetricsCharts';
import AddMemberForm from './components/AddMemberForm';
import AddTrainerForm from './components/AddTrainerForm';
import WorkoutPlans from './components/WorkoutPlans';
import PaymentHistory from './components/PaymentHistory';
import AddPaymentForm from './components/AddPaymentForm';
import PaymentSummary from './components/PaymentSummary';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'members':
        return (
          <>
            <AddMemberForm />
            <MembersTable className="mt-6" />
          </>
        );
      case 'trainers':
        return (
          <>
            <AddTrainerForm />
            <TrainersGrid className="mt-6" />
          </>
        );
      case 'classes':
        return <UpcomingClasses />;
      case 'workouts':
        return <WorkoutPlans />;
      case 'payments':
        return (
          <>
            <PaymentSummary />
            <AddPaymentForm />
            <PaymentHistory />
          </>
        );
      case 'metrics':
        return <MetricsCharts />;
      default:
        return (
          <>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <MembersTable />
              <UpcomingClasses />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LayoutHeader />
      <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="ml-64 pt-16 px-6 py-6">
        <div className="container mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;

// DONE