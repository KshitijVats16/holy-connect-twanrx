
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useAppContext } from '@/contexts/AppContext';
import { RELIGION_COLORS } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';
import { ceremonies } from '@/data/ceremonies';
import { officiants } from '@/data/officiants';

export default function BookingsScreen() {
  const { selectedReligion, bookings, selectedRole } = useAppContext();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  const themeColor = selectedReligion ? RELIGION_COLORS[selectedReligion] : '#007AFF';

  const upcomingBookings = bookings.filter(booking => 
    booking.status === 'pending' || booking.status === 'confirmed'
  );
  
  const completedBookings = bookings.filter(booking => 
    booking.status === 'completed' || booking.status === 'cancelled'
  );

  const getBookingDetails = (booking: any) => {
    const ceremony = ceremonies.find(c => c.id === booking.ceremonyId);
    const officiant = officiants.find(o => o.id === booking.officiantId);
    return { ceremony, officiant };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#22C55E';
      case 'pending': return '#F59E0B';
      case 'completed': return '#3B82F6';
      case 'cancelled': return '#EF4444';
      default: return '#999';
    }
  };

  const renderBookingCard = (booking: any) => {
    const { ceremony, officiant } = getBookingDetails(booking);
    
    return (
      <View key={booking.id} style={styles.bookingCard}>
        <View style={styles.bookingHeader}>
          <Text style={styles.ceremonyName}>{ceremony?.name || 'Unknown Ceremony'}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
            <Text style={styles.statusText}>{booking.status.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <IconSymbol name="person.fill" size={16} color="#666" />
            <Text style={styles.detailText}>{officiant?.name || 'Unknown Officiant'}</Text>
          </View>

          <View style={styles.detailRow}>
            <IconSymbol name="calendar" size={16} color="#666" />
            <Text style={styles.detailText}>{formatDate(booking.date)}</Text>
          </View>

          <View style={styles.detailRow}>
            <IconSymbol name="clock" size={16} color="#666" />
            <Text style={styles.detailText}>{booking.time}</Text>
          </View>

          <View style={styles.detailRow}>
            <IconSymbol name="indianrupeesign" size={16} color="#666" />
            <Text style={styles.detailText}>₹{booking.amount.toLocaleString()}</Text>
          </View>
        </View>

        {booking.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Notes:</Text>
            <Text style={styles.notesText}>{booking.notes}</Text>
          </View>
        )}

        <View style={styles.bookingActions}>
          {booking.status === 'pending' && selectedRole === 'customer' && (
            <Pressable style={[styles.actionButton, styles.cancelButton]}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          )}
          
          {booking.status === 'confirmed' && (
            <Pressable style={[styles.actionButton, { backgroundColor: themeColor }]}>
              <Text style={styles.actionButtonText}>View Details</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColor + '05' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: themeColor }]}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <Text style={styles.headerSubtitle}>
          Manage your ceremony bookings
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Pressable
          style={[
            styles.tab,
            activeTab === 'upcoming' && { backgroundColor: themeColor }
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'upcoming' && { color: '#fff' }
          ]}>
            Upcoming ({upcomingBookings.length})
          </Text>
        </Pressable>
        
        <Pressable
          style={[
            styles.tab,
            activeTab === 'completed' && { backgroundColor: themeColor }
          ]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'completed' && { color: '#fff' }
          ]}>
            Completed ({completedBookings.length})
          </Text>
        </Pressable>
      </View>

      {/* Bookings List */}
      <ScrollView style={styles.bookingsContainer} showsVerticalScrollIndicator={false}>
        {activeTab === 'upcoming' ? (
          upcomingBookings.length > 0 ? (
            upcomingBookings.map(renderBookingCard)
          ) : (
            <View style={styles.emptyState}>
              <IconSymbol name="calendar.badge.clock" size={64} color="#ccc" />
              <Text style={styles.emptyStateTitle}>No Upcoming Bookings</Text>
              <Text style={styles.emptyStateText}>
                Your upcoming ceremony bookings will appear here
              </Text>
            </View>
          )
        ) : (
          completedBookings.length > 0 ? (
            completedBookings.map(renderBookingCard)
          ) : (
            <View style={styles.emptyState}>
              <IconSymbol name="checkmark.circle" size={64} color="#ccc" />
              <Text style={styles.emptyStateTitle}>No Completed Bookings</Text>
              <Text style={styles.emptyStateText}>
                Your completed ceremony bookings will appear here
              </Text>
            </View>
          )
        )}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  bookingsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ceremonyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
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
  bookingDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  notesContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#EF4444',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
