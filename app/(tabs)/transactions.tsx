
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useAppContext } from '@/contexts/AppContext';
import { RELIGION_COLORS } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';

export default function TransactionsScreen() {
  const { selectedReligion, transactions, bookings } = useAppContext();
  const [filterType, setFilterType] = useState<'all' | 'payment' | 'refund'>('all');

  const themeColor = selectedReligion ? RELIGION_COLORS[selectedReligion] : '#007AFF';

  const filteredTransactions = transactions.filter(transaction => {
    if (filterType === 'all') return true;
    return transaction.type === filterType;
  });

  const getBookingDetails = (bookingId: string) => {
    return bookings.find(booking => booking.id === bookingId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22C55E';
      case 'pending': return '#F59E0B';
      case 'failed': return '#EF4444';
      case 'refunded': return '#3B82F6';
      default: return '#999';
    }
  };

  const getTransactionIcon = (type: string, status: string) => {
    if (type === 'refund') return 'arrow.down.circle.fill';
    if (status === 'completed') return 'checkmark.circle.fill';
    if (status === 'failed') return 'xmark.circle.fill';
    return 'clock.circle.fill';
  };

  const getTotalAmount = () => {
    return filteredTransactions
      .filter(t => t.status === 'completed')
      .reduce((total, t) => {
        return t.type === 'payment' ? total + t.amount : total - t.amount;
      }, 0);
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColor + '05' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: themeColor }]}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <Text style={styles.headerSubtitle}>
          Track your payments and refunds
        </Text>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Spent</Text>
          <Text style={[styles.summaryAmount, { color: themeColor }]}>
            ₹{getTotalAmount().toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Transactions</Text>
          <Text style={styles.summaryCount}>{filteredTransactions.length}</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {[
          { key: 'all', label: 'All' },
          { key: 'payment', label: 'Payments' },
          { key: 'refund', label: 'Refunds' }
        ].map((filter) => (
          <Pressable
            key={filter.key}
            style={[
              styles.filterTab,
              filterType === filter.key && { backgroundColor: themeColor }
            ]}
            onPress={() => setFilterType(filter.key as any)}
          >
            <Text style={[
              styles.filterText,
              filterType === filter.key && { color: '#fff' }
            ]}>
              {filter.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Transactions List */}
      <ScrollView style={styles.transactionsContainer} showsVerticalScrollIndicator={false}>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => {
            const booking = getBookingDetails(transaction.bookingId);
            
            return (
              <View key={transaction.id} style={styles.transactionCard}>
                <View style={styles.transactionHeader}>
                  <View style={[
                    styles.transactionIcon,
                    { backgroundColor: getStatusColor(transaction.status) + '20' }
                  ]}>
                    <IconSymbol 
                      name={getTransactionIcon(transaction.type, transaction.status) as any} 
                      size={24} 
                      color={getStatusColor(transaction.status)} 
                    />
                  </View>
                  
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionType}>
                      {transaction.type === 'payment' ? 'Payment' : 'Refund'}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {formatDate(transaction.date)}
                    </Text>
                  </View>

                  <View style={styles.transactionAmount}>
                    <Text style={[
                      styles.amountText,
                      { color: transaction.type === 'payment' ? '#EF4444' : '#22C55E' }
                    ]}>
                      {transaction.type === 'payment' ? '-' : '+'}₹{transaction.amount.toLocaleString()}
                    </Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(transaction.status) }
                    ]}>
                      <Text style={styles.statusText}>
                        {transaction.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>

                {booking && (
                  <View style={styles.bookingInfo}>
                    <Text style={styles.bookingLabel}>Booking ID:</Text>
                    <Text style={styles.bookingId}>{booking.id}</Text>
                  </View>
                )}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <IconSymbol name="creditcard" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>No Transactions</Text>
            <Text style={styles.emptyStateText}>
              Your payment history will appear here
            </Text>
          </View>
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
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    marginVertical: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 12,
  },
  filterTab: {
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
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  transactionsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  bookingInfo: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  bookingLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  bookingId: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
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
