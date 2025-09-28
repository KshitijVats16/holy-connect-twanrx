
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/contexts/AppContext';
import { RELIGION_COLORS } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';
import { ceremonies } from '@/data/ceremonies';
import { officiants } from '@/data/officiants';

export default function BookingConfirmationScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { selectedReligion, bookings } = useAppContext();

  const booking = bookings.find(b => b.id === bookingId);
  const ceremony = booking ? ceremonies.find(c => c.id === booking.ceremonyId) : null;
  const officiant = booking ? officiants.find(o => o.id === booking.officiantId) : null;

  const themeColor = selectedReligion ? RELIGION_COLORS[selectedReligion] : '#007AFF';

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text>Booking not found</Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColor + '05' }]}>
      {/* Success Icon */}
      <View style={styles.successContainer}>
        <View style={[styles.successIcon, { backgroundColor: themeColor }]}>
          <IconSymbol name="checkmark" size={48} color="#fff" />
        </View>
        <Text style={styles.successTitle}>Booking Confirmed!</Text>
        <Text style={styles.successSubtitle}>
          Your ceremony booking has been successfully confirmed
        </Text>
      </View>

      {/* Booking Details */}
      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Booking Details</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Booking ID:</Text>
          <Text style={styles.detailValue}>{booking.id}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Ceremony:</Text>
          <Text style={styles.detailValue}>{ceremony?.name || 'Unknown'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Officiant:</Text>
          <Text style={styles.detailValue}>{officiant?.name || 'Unknown'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{formatDate(booking.date)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Time:</Text>
          <Text style={styles.detailValue}>{booking.time}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount Paid:</Text>
          <Text style={[styles.detailValue, { color: themeColor, fontWeight: 'bold' }]}>
            ₹{booking.amount.toLocaleString()}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <View style={[styles.statusBadge, { backgroundColor: '#F59E0B' }]}>
            <Text style={styles.statusText}>PENDING</Text>
          </View>
        </View>
      </View>

      {/* Next Steps */}
      <View style={styles.nextStepsCard}>
        <Text style={styles.cardTitle}>What&apos;s Next?</Text>
        
        <View style={styles.stepItem}>
          <View style={[styles.stepIcon, { backgroundColor: themeColor + '20' }]}>
            <IconSymbol name="clock" size={20} color={themeColor} />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Awaiting Confirmation</Text>
            <Text style={styles.stepDescription}>
              The officiant will confirm your booking within 24 hours
            </Text>
          </View>
        </View>

        <View style={styles.stepItem}>
          <View style={[styles.stepIcon, { backgroundColor: themeColor + '20' }]}>
            <IconSymbol name="bell" size={20} color={themeColor} />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Get Notified</Text>
            <Text style={styles.stepDescription}>
              You&apos;ll receive notifications about booking updates
            </Text>
          </View>
        </View>

        <View style={styles.stepItem}>
          <View style={[styles.stepIcon, { backgroundColor: themeColor + '20' }]}>
            <IconSymbol name="phone" size={20} color={themeColor} />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Direct Contact</Text>
            <Text style={styles.stepDescription}>
              The officiant may contact you to discuss ceremony details
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Pressable
          style={[styles.primaryButton, { backgroundColor: themeColor }]}
          onPress={() => router.push('/(tabs)/bookings')}
        >
          <Text style={styles.primaryButtonText}>View My Bookings</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  nextStepsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  actionButtons: {
    gap: 12,
  },
  primaryButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
});
