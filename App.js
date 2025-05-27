import Navigation from './navigation/Navigation';
import { ThemeProvider } from './components/GlobalSettings/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}
