
import React from 'react';
import { Tabs } from 'expo-router';
import { useAppContext } from '@/contexts/AppContext';
import { RELIGION_COLORS } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';

export default function TabLayout() {
  const { selectedReligion, selectedRole } = useAppContext();
  const themeColor = selectedReligion ? RELIGION_COLORS[selectedReligion] : '#007AFF';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColor,
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="house.fill" size={size} color={color} />
          ),
        }}
      />
      
      {selectedRole === 'customer' && (
        <>
          <Tabs.Screen
            name="officiants"
            options={{
              title: 'Officiants',
              tabBarIcon: ({ color, size }) => (
                <IconSymbol name="person.3.fill" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="bookings"
            options={{
              title: 'My Bookings',
              tabBarIcon: ({ color, size }) => (
                <IconSymbol name="calendar.badge.clock" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="transactions"
            options={{
              title: 'Transactions',
              tabBarIcon: ({ color, size }) => (
                <IconSymbol name="creditcard.fill" size={size} color={color} />
              ),
            }}
          />
        </>
      )}

      {selectedRole === 'officiant' && (
        <>
          <Tabs.Screen
            name="dashboard"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ color, size }) => (
                <IconSymbol name="chart.bar.fill" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="bookings"
            options={{
              title: 'Bookings',
              tabBarIcon: ({ color, size }) => (
                <IconSymbol name="calendar.badge.clock" size={size} color={color} />
              ),
            }}
          />
        </>
      )}

      {selectedRole === 'admin' && (
        <>
          <Tabs.Screen
            name="manage"
            options={{
              title: 'Manage',
              tabBarIcon: ({ color, size }) => (
                <IconSymbol name="gear" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="analytics"
            options={{
              title: 'Analytics',
              tabBarIcon: ({ color, size }) => (
                <IconSymbol name="chart.line.uptrend.xyaxis" size={size} color={color} />
              ),
            }}
          />
        </>
      )}
    </Tabs>
  );
}
