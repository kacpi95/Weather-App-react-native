import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

export function setupNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}
export async function registerForPushNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Brak zgody na notyfikacje');
    return false;
  }

  return true;
}

export async function scheduleTestNotification() {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Lokalna notyfikacja',
      body: 'Lokalna notyfikacja!',
    },
    trigger: { seconds: 5 },
  });
}
