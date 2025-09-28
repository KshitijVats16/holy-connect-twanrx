
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useAppContext } from '@/contexts/AppContext';
import { officiants } from '@/data/officiants';
import { RELIGION_COLORS } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';

export default function OfficiantsScreen() {
  const { selectedReligion } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee'>('rating');

  const themeColor = selectedReligion ? RELIGION_COLORS[selectedReligion] : '#007AFF';
  
  let filteredOfficiants = officiants.filter(officiant => {
    const matchesReligion = officiant.religion === selectedReligion;
    const matchesSearch = officiant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         officiant.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         officiant.languages.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesReligion && matchesSearch;
  });

  // Sort officiants
  filteredOfficiants = filteredOfficiants.sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return b.experience - a.experience;
      case 'fee':
        return a.fee - b.fee;
      default:
        return 0;
    }
  });

  const handleOfficiantPress = (officiantId: string) => {
    console.log('Selected officiant:', officiantId);
    router.push(`/officiant-details?id=${officiantId}`);
  };

  const getReligionTitle = () => {
    switch (selectedReligion) {
      case 'hindu': return 'Pandits';
      case 'muslim': return 'Maulvis';
      case 'sikh': return 'Granthis';
      case 'christian': return 'Priests';
      default: return 'Officiants';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColor + '05' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: themeColor }]}>
        <Text style={styles.headerTitle}>{getReligionTitle()}</Text>
        <Text style={styles.headerSubtitle}>
          Find experienced religious officiants
        </Text>
      </View>

      {/* Search and Sort */}
      <View style={styles.controlsContainer}>
        <View style={styles.searchBar}>
          <IconSymbol name="magnifyingglass" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, specialty, or language..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.sortContainer}
          contentContainerStyle={styles.sortContent}
        >
          {[
            { key: 'rating', label: 'Rating' },
            { key: 'experience', label: 'Experience' },
            { key: 'fee', label: 'Price' }
          ].map((sort) => (
            <Pressable
              key={sort.key}
              style={[
                styles.sortChip,
                sortBy === sort.key && { backgroundColor: themeColor }
              ]}
              onPress={() => setSortBy(sort.key as any)}
            >
              <Text style={[
                styles.sortText,
                sortBy === sort.key && { color: '#fff' }
              ]}>
                {sort.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Officiants List */}
      <ScrollView style={styles.officiantsContainer} showsVerticalScrollIndicator={false}>
        {filteredOfficiants.map((officiant) => (
          <Pressable
            key={officiant.id}
            style={styles.officiantCard}
            onPress={() => handleOfficiantPress(officiant.id)}
          >
            <Image source={{ uri: officiant.profileImage }} style={styles.officiantImage} />
            
            <View style={styles.officiantContent}>
              <View style={styles.officiantHeader}>
                <Text style={styles.officiantName}>{officiant.name}</Text>
                {officiant.isVerified && (
                  <View style={[styles.verifiedBadge, { backgroundColor: themeColor }]}>
                    <IconSymbol name="checkmark" size={12} color="#fff" />
                  </View>
                )}
              </View>

              <View style={styles.ratingContainer}>
                <IconSymbol name="star.fill" size={16} color="#FFD700" />
                <Text style={styles.rating}>{officiant.rating}</Text>
                <Text style={styles.reviewCount}>({officiant.reviewCount} reviews)</Text>
              </View>

              <Text style={styles.experience}>{officiant.experience} years experience</Text>

              <View style={styles.specialtiesContainer}>
                <Text style={styles.specialtiesLabel}>Specialties:</Text>
                <Text style={styles.specialties} numberOfLines={1}>
                  {officiant.specialties.join(', ')}
                </Text>
              </View>

              <View style={styles.languagesContainer}>
                <Text style={styles.languagesLabel}>Languages:</Text>
                <Text style={styles.languages} numberOfLines={1}>
                  {officiant.languages.join(', ')}
                </Text>
              </View>

              <View style={styles.feeContainer}>
                <Text style={styles.fee}>₹{officiant.fee.toLocaleString()}</Text>
                <View style={[styles.availabilityBadge, 
                  officiant.availability === 'online' ? { backgroundColor: '#22C55E' } :
                  officiant.availability === 'offline' ? { backgroundColor: '#EF4444' } :
                  { backgroundColor: '#3B82F6' }
                ]}>
                  <Text style={styles.availabilityText}>
                    {officiant.availability === 'both' ? 'Online & Offline' : 
                     officiant.availability === 'online' ? 'Online Only' : 'Offline Only'}
                  </Text>
                </View>
              </View>
            </View>

            <IconSymbol name="chevron.right" size={20} color="#999" />
          </Pressable>
        ))}
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
  controlsContainer: {
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
    marginBottom: 16,
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
  sortContainer: {
    marginBottom: 8,
  },
  sortContent: {
    paddingRight: 24,
  },
  sortChip: {
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
  sortText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  officiantsContainer: {
    flex: 1,
  },
  officiantCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  officiantImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    backgroundColor: '#f0f0f0',
  },
  officiantContent: {
    flex: 1,
  },
  officiantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  officiantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  verifiedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  experience: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  specialtiesLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    marginRight: 4,
  },
  specialties: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  languagesContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  languagesLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    marginRight: 4,
  },
  languages: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  feeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fee: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '500',
  },
});
