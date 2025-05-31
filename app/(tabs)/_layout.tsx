import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#000',
          headerShown: false,
          tabBarStyle: {
            paddingBottom: 25,
            paddingTop: 5,
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -3,
            },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 10,
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '500',
          },
        }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Book',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? "calendar" : "calendar-outline"} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          title: 'Activities',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? "play" : "play-outline"} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? "people" : "people-outline"} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? "notifications" : "notifications-outline"} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? "grid" : "grid-outline"} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
    </View>
  );
}
