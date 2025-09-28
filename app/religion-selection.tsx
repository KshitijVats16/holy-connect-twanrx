
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAppContext } from '@/contexts/AppContext';
import { Religion, RELIGION_COLORS, RELIGION_NAMES } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';

export default function ReligionSelectionScreen() {
  const { setSelectedReligion, selectedRole } = useAppContext();

  const religions: { key: Religion; icon: string; emoji: string }[] = [
    { key: 'hindu', icon: 'sun.max.fill', emoji: '🕉️' },
    { key: 'muslim', icon: 'moon.stars.fill', emoji: '☪️' },
    { key: 'christian', icon: 'cross.fill', emoji: '✝️' },
    { key: 'sikh', icon: 'star.fill', emoji: '☬' }
  ];

  const handleReligionSelect = (religion: Religion) => {
    console.log('Selected religion:', religion);
    setSelectedReligion(religion);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Religion</Text>
        <Text style={styles.subtitle}>Select your religious preference</Text>
      </View>

      <View style={styles.religionsContainer}>
        {religions.map((religion) => (
          <Pressable
            key={religion.key}
            style={[
              styles.religionCard,
              { borderColor: RELIGION_COLORS[religion.key] }
            ]}
            onPress={() => handleReligionSelect(religion.key)}
          >
            <View style={[
              styles.religionIcon,
              { backgroundColor: RELIGION_COLORS[religion.key] + '20' }
            ]}>
              <Text style={styles.religionEmoji}>{religion.emoji}</Text>
            </View>
            <View style={styles.religionContent}>
              <Text style={styles.religionTitle}>{RELIGION_NAMES[religion.key]}</Text>
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
  religionsContainer: {
    paddingHorizontal: 24,
  },
  religionCard: {
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
    borderWidth: 2,
  },
  religionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  religionEmoji: {
    fontSize: 28,
  },
  religionContent: {
    flex: 1,
  },
  religionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
});
