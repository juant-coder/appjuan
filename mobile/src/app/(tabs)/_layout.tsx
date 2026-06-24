import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#1a1a1a',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#555',
      }}>
      <Tabs.Screen name="index" options={{ title: 'Hoje' }} />
      <Tabs.Screen name="create" options={{ title: 'Criar' }} />
      <Tabs.Screen name="history" options={{ title: 'Histórico' }} />
      <Tabs.Screen name="streaks" options={{ title: 'Streaks' }} />
    </Tabs>
  );
}
