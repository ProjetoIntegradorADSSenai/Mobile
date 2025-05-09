import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'index') {
            iconName = 'home';
          } else if (route.name === 'control') {
            iconName = 'settings';
          } else if (route.name === 'dashboard') {
            iconName = 'analytics';
          } else if (route.name === 'login') {
            iconName = 'log-in';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="control" options={{ title: 'Control' }} />
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboards' }} />
      <Tabs.Screen name="login" options={{ title: 'Login' }} />
    </Tabs>
  );
}