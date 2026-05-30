import React from 'react';
import { Route, Switch, useLocation, type RouteComponentProps } from 'wouter';
import { LoginScreen } from './screens/Login';
import { DashboardScreen } from './screens/Dashboard';
import { PetDetailScreen } from './screens/PetDetail';
import { MedicinesScreen } from './screens/Medicines';
import { AppointmentsScreen } from './screens/Appointments';
import { DiaryScreen } from './screens/Diary';
import { MediaScreen } from './screens/Media';
import { UIKitScreen } from './screens/UIKit';

type PetDetailParams = { petId: string };

function PetDetailRoute({ params }: RouteComponentProps<PetDetailParams>) {
  return <PetDetailScreen petId={params.petId} />;
}

function RootRedirect() {
  const [, setLocation] = useLocation();
  React.useEffect(() => {
    setLocation('/login');
  }, [setLocation]);
  return null;
}

export function App() {
  return (
    <Switch>
      <Route path="/" component={RootRedirect} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/dashboard" component={DashboardScreen} />
      <Route path="/pets/:petId" component={PetDetailRoute} />
      <Route path="/medicines" component={MedicinesScreen} />
      <Route path="/appointments" component={AppointmentsScreen} />
      <Route path="/diary" component={DiaryScreen} />
      <Route path="/media" component={MediaScreen} />
      <Route path="/uikit" component={UIKitScreen} />
      {/* Fallback to login */}
      <Route component={LoginScreen} />
    </Switch>
  );
}

window.App = App;
window.LoginScreen = LoginScreen;
window.DashboardScreen = DashboardScreen;
window.PetDetailScreen = PetDetailScreen;
window.MedicinesScreen = MedicinesScreen;
window.AppointmentsScreen = AppointmentsScreen;
window.DiaryScreen = DiaryScreen;
window.MediaScreen = MediaScreen;
window.UIKitScreen = UIKitScreen;

export default App;
