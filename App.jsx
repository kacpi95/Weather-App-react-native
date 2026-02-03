import Navigation from './src/navigation/Navigation';
import { ThemeProvider } from './src/components/GlobalSettings/ThemeContext';
import { useEffect } from 'react';
import {
  registerForPushNotifications,
  setupNotifications,
} from './src/services/notifications';

export default function App() {
  useEffect(() => {
    setupNotifications();
    registerForPushNotifications();
  }, []);

  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}
