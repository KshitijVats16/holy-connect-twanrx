
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useAppContext } from '@/contexts/AppContext';
import { ceremonies } from '@/data/ceremonies';
import { RELIGION_COLORS, RELIGION_NAMES } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';

export default function HomeScreen() {
  const { selectedReligion, selectedRole } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const themeColor = selectedReligion ? RELIGION_COLORS[selectedReligion] : '#007AFF';
  
  const filteredCeremonies = ceremonies.filter(ceremony => {
    const matchesReligion = ceremony.religion === selectedReligion;
    const matchesSearch = ceremony.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ceremony.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || ceremony.category === selectedCategory;
    
    return matchesReligion && matchesSearch && matchesCategory;
  });

  const categories = [...new Set(ceremonies
    .filter(c => c.religion === selectedReligion)
    .map(c => c.category))];

  const handleCeremonyPress = (ceremonyId: string) => {
    console.log('Selected ceremony:', ceremonyId);
    router.push(`/ceremony-details?id=${ceremonyId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColor + '05' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: themeColor }]}>
        <Text style={styles.headerTitle}>
          {RELIGION_NAMES[selectedReligion!]} Ceremonies
        </Text>
        <Text style={styles.headerSubtitle}>
          Find the perfect ceremony for your needs
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <IconSymbol name="magnifyingglass" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search ceremonies..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        <Pressable
          style={[
            styles.categoryChip,
            !selectedCategory && { backgroundColor: themeColor }
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[
            styles.categoryText,
            !selectedCategory && { color: '#fff' }
          ]}>
            All
          </Text>
        </Pressable>
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && { backgroundColor: themeColor }
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && { color: '#fff' }
            ]}>
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Ceremonies Grid */}
      <ScrollView style={styles.ceremoniesContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.ceremoniesGrid}>
          {filteredCeremonies.map((ceremony) => (
            <Pressable
              key={ceremony.id}
              style={styles.ceremonyCard}
              onPress={() => handleCeremonyPress(ceremony.id)}
            >
              <Image source={{ uri: ceremony.image }} style={styles.ceremonyImage} />
              <View style={styles.ceremonyContent}>
                <Text style={styles.ceremonyName}>{ceremony.name}</Text>
                <Text style={styles.ceremonyCategory}>{ceremony.category}</Text>
                <Text style={styles.ceremonyDescription} numberOfLines={2}>
                  {ceremony.description}
                </Text>
              </View>
              <View style={[styles.ceremonyBadge, { backgroundColor: themeColor }]}>
                <IconSymbol name="arrow.right" size={16} color="#fff" />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  categoryContainer: {
    paddingBottom: 16,
  },
  categoryContent: {
    paddingHorizontal: 24,
  },
  categoryChip: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  ceremoniesContainer: {
    flex: 1,
  },
  ceremoniesGrid: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  ceremonyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  ceremonyImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#f0f0f0',
  },
  ceremonyContent: {
    padding: 16,
  },
  ceremonyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ceremonyCategory: {
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
    fontWeight: '500',
    marginBottom: 8,
  },
  ceremonyDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  ceremonyBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
