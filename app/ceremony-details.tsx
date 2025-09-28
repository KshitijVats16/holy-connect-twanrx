
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/contexts/AppContext';
import { ceremonies } from '@/data/ceremonies';
import { officiants } from '@/data/officiants';
import { RELIGION_COLORS } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';

export default function CeremonyDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { selectedReligion } = useAppContext();

  const ceremony = ceremonies.find(c => c.id === id);
  const availableOfficiants = officiants.filter(o => 
    o.religion === selectedReligion && 
    o.specialties.includes(ceremony?.name || '')
  );

  const themeColor = selectedReligion ? RELIGION_COLORS[selectedReligion] : '#007AFF';

  if (!ceremony) {
    return (
      <View style={styles.container}>
        <Text>Ceremony not found</Text>
      </View>
    );
  }

  const handleOfficiantSelect = (officiantId: string) => {
    router.push(`/officiant-details?id=${officiantId}&ceremonyId=${ceremony.id}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: themeColor }]}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>{ceremony.name}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Ceremony Image */}
        <Image source={{ uri: ceremony.image }} style={styles.ceremonyImage} />

        {/* Ceremony Info */}
        <View style={styles.ceremonyInfo}>
          <View style={styles.ceremonyHeader}>
            <Text style={styles.ceremonyName}>{ceremony.name}</Text>
            <View style={[styles.categoryBadge, { backgroundColor: themeColor }]}>
              <Text style={styles.categoryText}>{ceremony.category}</Text>
            </View>
          </View>
          
          <Text style={styles.ceremonyDescription}>{ceremony.description}</Text>
        </View>

        {/* Available Officiants */}
        <View style={styles.officiantsSection}>
          <Text style={styles.sectionTitle}>
            Available Officiants ({availableOfficiants.length})
          </Text>
          
          {availableOfficiants.length > 0 ? (
            availableOfficiants.map((officiant) => (
              <Pressable
                key={officiant.id}
                style={styles.officiantCard}
                onPress={() => handleOfficiantSelect(officiant.id)}
              >
                <Image source={{ uri: officiant.profileImage }} style={styles.officiantImage} />
                
                <View style={styles.officiantInfo}>
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
                    <Text style={styles.reviewCount}>({officiant.reviewCount})</Text>
                  </View>

                  <Text style={styles.experience}>{officiant.experience} years experience</Text>
                  
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
            ))
          ) : (
            <View style={styles.noOfficiantsContainer}>
              <IconSymbol name="person.slash" size={48} color="#ccc" />
              <Text style={styles.noOfficiantsTitle}>No Officiants Available</Text>
              <Text style={styles.noOfficiantsText}>
                No officiants are currently available for this ceremony. Please try again later.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  ceremonyImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  ceremonyInfo: {
    padding: 24,
  },
  ceremonyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ceremonyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  ceremonyDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  officiantsSection: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  officiantCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
  officiantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  officiantInfo: {
    flex: 1,
  },
  officiantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  officiantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  verifiedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
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
  noOfficiantsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noOfficiantsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  noOfficiantsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
