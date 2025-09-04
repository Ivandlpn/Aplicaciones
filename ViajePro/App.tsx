
import React, { useState, useCallback } from 'react';
import type { CabinTrip } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import NewTripWizard from './components/NewTripWizard';

type View = 'dashboard' | 'new_trip';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [trips, setTrips] = useState<CabinTrip[]>([]);

  const handleSaveTrip = useCallback((newTrip: Omit<CabinTrip, 'id' | 'code'>) => {
    const tripDate = new Date(newTrip.date);
    const dateCode = `${tripDate.getFullYear()}_${(tripDate.getMonth() + 1).toString().padStart(2, '0')}_${tripDate.getDate().toString().padStart(2, '0')}`;
    const newCabinTrip: CabinTrip = {
      ...newTrip,
      id: new Date().toISOString(),
      code: `VC_${dateCode}_${Math.random().toString(36).substring(2, 7)}`
    };
    setTrips(prevTrips => [newCabinTrip, ...prevTrips]);
    setView('dashboard');
  }, []);

  const handleStartNewTrip = useCallback(() => {
    setView('new_trip');
  }, []);

  const handleCancelNewTrip = useCallback(() => {
    setView('dashboard');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {view === 'dashboard' && <Dashboard trips={trips} onStartNewTrip={handleStartNewTrip} />}
        {view === 'new_trip' && <NewTripWizard onSave={handleSaveTrip} onCancel={handleCancelNewTrip} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
