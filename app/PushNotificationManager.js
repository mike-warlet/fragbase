// Push Notification Manager for FragBase
import { useEffect, useRef } from 'react';
import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useAuth } from './AuthContext';
import { apiCall } from './config';

// Configure notification handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function usePushNotifications(navigation) {
  const { user, token } = useAuth();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (!user || !token) return;

    registerForPushNotifications();

    // Listen for incoming notifications (foreground)
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // Notification received while app is in foreground
      // The handler above will show it as an alert
    });

    // Listen for notification taps
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      handleNotificationNavigation(data, navigation);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [user, token]);

  async function registerForPushNotifications() {
    if (!Device.isDevice) {
      return; // Push notifications only work on physical devices
    }

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        return;
      }

      const pushToken = await Notifications.getExpoPushTokenAsync({
        projectId: undefined, // Uses project ID from app.json
      });

      // Register token with backend
      await apiCall('/api/push/register', {
        method: 'POST',
        body: JSON.stringify({
          token: pushToken.data,
          platform: Platform.OS,
        }),
      });

      // Android-specific notification channel
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#8b4513',
        });
      }
    } catch (error) {
      console.log('Push notification registration error:', error);
    }
  }

  function handleNotificationNavigation(data, nav) {
    if (!data || !nav) return;

    try {
      switch (data.type) {
        case 'follow':
          nav.navigate('UserProfile', { userId: data.actor_id });
          break;
        case 'like':
        case 'comment':
          nav.navigate('Home');
          break;
        case 'message':
          nav.navigate('Chat', { userId: data.actor_id });
          break;
        case 'badge_earned':
          nav.navigate('Profile');
          break;
        case 'challenge_update':
          nav.navigate('Challenges');
          break;
      }
    } catch (error) {
      console.log('Navigation error:', error);
    }
  }

  return { registerForPushNotifications };
}

// Unregister push token (call on logout)
export async function unregisterPushToken() {
  try {
    if (!Device.isDevice) return;

    const pushToken = await Notifications.getExpoPushTokenAsync();
    await apiCall('/api/push/register', {
      method: 'DELETE',
      body: JSON.stringify({ token: pushToken.data }),
    });
  } catch (error) {
    console.log('Push token unregister error:', error);
  }
}
