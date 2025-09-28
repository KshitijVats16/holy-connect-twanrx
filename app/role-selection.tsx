
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAppContext } from '@/contexts/AppContext';
import { UserRole } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';

export default function RoleSelectionScreen() {
  const { setSelectedRole } = useAppContext();

  const roles: { key: UserRole; title: string; description: string; icon: string }[] = [
    {
      key: 'customer',
      title: 'Customer',
      description: 'Book religious ceremonies and find officiants',
      icon: 'person.fill'
    },
    {
      key: 'officiant',
      title: 'Officiant',
      description: 'Provide religious services and manage bookings',
      icon: 'person.badge.plus'
    },
    {
      key: 'admin',
      title: 'Admin',
      description: 'Manage the platform and oversee operations',
      icon: 'gear'
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    console.log('Selected role:', role);
    setSelectedRole(role);
    router.push('/religion-selection');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>Select how you&apos;d like to use the app</Text>
      </View>

      <View style={styles.rolesContainer}>
        {roles.map((role) => (
          <Pressable
            key={role.key}
            style={styles.roleCard}
            onPress={() => handleRoleSelect(role.key)}
          >
            <View style={styles.roleIcon}>
              <IconSymbol name={role.icon as any} size={32} color="#007AFF" />
            </View>
            <View style={styles.roleContent}>
              <Text style={styles.roleTitle}>{role.title}</Text>
              <Text style={styles.roleDescription}>{role.description}</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#999" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  rolesContainer: {
    paddingHorizontal: 24,
  },
  roleCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  roleIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
