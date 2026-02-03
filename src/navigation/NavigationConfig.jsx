import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreens';
import SettingsScreen from '../screens/SettingsScreen';

export const screens = [
  { id: 1, name: 'Login', component: LoginScreen },
  {
    id: 2,
    name: 'Home',
    component: HomeScreen,
    options: { headerShown: false },
  },
  { id: 3, name: 'Settings', component: SettingsScreen },
  { id: 4, name: 'About', component: AboutScreen },
];
