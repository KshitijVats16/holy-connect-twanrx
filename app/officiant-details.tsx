
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/contexts/AppContext';
import { officiants } from '@/data/officiants';
import { ceremonies } from '@/data/ceremonies';
import { RELIGION_COLORS, Booking, Transaction } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';

export default function OfficiantDetailsScreen() {
  const { id, ceremonyId } = useLocalSearchParams<{ id: string; ceremonyId?: string }>();
  const { selectedReligion, addBooking, addTransaction } = useAppContext();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  const officiant = officiants.find(o => o.id === id);
  const ceremony = ceremonyId ? ceremonies.find(c => c.id === ceremonyId) : null;
  const themeColor = selectedReligion ? RELIGION_COLORS[selectedReligion] : '#007AFF';

  if (!officiant) {
    return (
      <View style={styles.container}>
        <Text>Officiant not found</Text>
      </View>
    );
  }

  const handleBookNow = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }

    const bookingId = `booking-${Date.now()}`;
    const transactionId = `transaction-${Date.now()}`;

    const booking: Booking = {
      id: bookingId,
      customerId: 'customer-1', // In real app, this would be current user ID
      officiantId: officiant.id,
      ceremonyId: ceremony?.id || '',
      date: selectedDate,
      time: selectedTime,
      status: 'pending',
      amount: officiant.fee,
      currency: officiant.currency,
      notes: notes || undefined,
    };

    const transaction: Transaction = {
      id: transactionId,
      bookingId: bookingId,
      amount: officiant.fee,
      currency: officiant.currency,
      status: 'completed',
      date: new Date().toISOString(),
      type: 'payment',
    };

    addBooking(booking);
    addTransaction(transaction);

    console.log('Booking created:', booking);
    console.log('Transaction created:', transaction);

    router.push('/booking-confirmation?bookingId=' + bookingId);
  };

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM'
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: themeColor }]}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Officiant Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Officiant Profile */}
        <View style={styles.profileSection}>
          <Image source={{ uri: officiant.profileImage }} style={styles.profileImage} />
          
          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.officiantName}>{officiant.name}</Text>
              {officiant.isVerified && (
                <View style={[styles.verifiedBadge, { backgroundColor: themeColor }]}>
                  <IconSymbol name="checkmark" size={16} color="#fff" />
                </View>
              )}
            </View>

            <View style={styles.ratingContainer}>
              <IconSymbol name="star.fill" size={20} color="#FFD700" />
              <Text style={styles.rating}>{officiant.rating}</Text>
              <Text style={styles.reviewCount}>({officiant.reviewCount} reviews)</Text>
            </View>

            <Text style={styles.experience}>{officiant.experience} years of experience</Text>
          </View>
        </View>

        {/* Fee and Availability */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <IconSymbol name="indianrupeesign" size={20} color={themeColor} />
              <Text style={styles.infoLabel}>Fee</Text>
              <Text style={styles.infoValue}>₹{officiant.fee.toLocaleString()}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <IconSymbol name="wifi" size={20} color={themeColor} />
              <Text style={styles.infoLabel}>Availability</Text>
              <Text style={styles.infoValue}>
                {officiant.availability === 'both' ? 'Online & Offline' : 
                 officiant.availability === 'online' ? 'Online Only' : 'Offline Only'}
              </Text>
            </View>
          </View>
        </View>

        {/* Specialties */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specialties</Text>
          <View style={styles.tagsContainer}>
            {officiant.specialties.map((specialty, index) => (
              <View key={index} style={[styles.tag, { backgroundColor: themeColor + '20' }]}>
                <Text style={[styles.tagText, { color: themeColor }]}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.tagsContainer}>
            {officiant.languages.map((language, index) => (
              <View key={index} style={styles.languageTag}>
                <Text style={styles.languageText}>{language}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Selected Ceremony */}
        {ceremony && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selected Ceremony</Text>
            <View style={styles.ceremonyCard}>
              <Image source={{ uri: ceremony.image }} style={styles.ceremonyImage} />
              <View style={styles.ceremonyInfo}>
                <Text style={styles.ceremonyName}>{ceremony.name}</Text>
                <Text style={styles.ceremonyDescription}>{ceremony.description}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Booking Form */}
        {showBookingForm ? (
          <View style={styles.bookingForm}>
            <Text style={styles.sectionTitle}>Book This Officiant</Text>
            
            {/* Date Selection */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Select Date</Text>
              <TextInput
                style={styles.dateInput}
                placeholder="YYYY-MM-DD"
                value={selectedDate}
                onChangeText={setSelectedDate}
              />
            </View>

            {/* Time Selection */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Select Time</Text>
              <View style={styles.timeSlots}>
                {timeSlots.map((time) => (
                  <Pressable
                    key={time}
                    style={[
                      styles.timeSlot,
                      selectedTime === time && { backgroundColor: themeColor }
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={[
                      styles.timeSlotText,
                      selectedTime === time && { color: '#fff' }
                    ]}>
                      {time}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Notes */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Additional Notes (Optional)</Text>
              <TextInput
                style={styles.notesInput}
                placeholder="Any special requirements or notes..."
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Booking Summary */}
            <View style={styles.bookingSummary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Officiant Fee:</Text>
                <Text style={styles.summaryValue}>₹{officiant.fee.toLocaleString()}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Platform Fee:</Text>
                <Text style={styles.summaryValue}>₹0</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total Amount:</Text>
                <Text style={[styles.totalValue, { color: themeColor }]}>
                  ₹{officiant.fee.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setShowBookingForm(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              
              <Pressable
                style={[styles.bookButton, { backgroundColor: themeColor }]}
                onPress={handleBookNow}
              >
                <Text style={styles.bookButtonText}>Confirm Booking</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.bookingActions}>
            <Pressable
              style={[styles.bookNowButton, { backgroundColor: themeColor }]}
              onPress={() => setShowBookingForm(true)}
            >
              <Text style={styles.bookNowText}>Book Now</Text>
            </Pressable>
          </View>
        )}
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
  profileSection: {
    flexDirection: 'row',
    padding: 24,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: '#f0f0f0',
  },
  profileInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  officiantName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  verifiedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  experience: {
    fontSize: 14,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  languageTag: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  languageText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  ceremonyCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
  },
  ceremonyImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#e9ecef',
  },
  ceremonyInfo: {
    flex: 1,
  },
  ceremonyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ceremonyDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  bookingForm: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  bookingSummary: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 8,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  bookButton: {
    flex: 2,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  bookingActions: {
    padding: 24,
  },
  bookNowButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookNowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
