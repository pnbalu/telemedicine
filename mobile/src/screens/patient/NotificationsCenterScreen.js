import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function NotificationsCenterScreen({ navigation }) {
  const { gradient } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'Appointment Reminder',
      message: 'Your appointment with Dr. Sarah Johnson is in 2 hours',
      time: '10 min ago',
      read: false,
      icon: 'calendar',
      color: argonTheme.colors.primary,
      action: () => navigation.navigate('Appointments'),
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      message: 'Dr. Michael Chen: "Your cholesterol levels look better..."',
      time: '1 hour ago',
      read: false,
      icon: 'chatbubbles',
      color: argonTheme.colors.info,
      action: () => navigation.navigate('Messages'),
    },
    {
      id: 3,
      type: 'lab',
      title: 'Lab Results Available',
      message: 'Your Complete Blood Count (CBC) results are ready',
      time: '2 hours ago',
      read: false,
      icon: 'flask',
      color: argonTheme.colors.success,
      action: () => navigation.navigate('LabResults'),
    },
    {
      id: 4,
      type: 'prescription',
      title: 'Prescription Refill',
      message: 'Your Lisinopril prescription is ready for refill',
      time: '3 hours ago',
      read: true,
      icon: 'medical',
      color: argonTheme.colors.warning,
      action: () => navigation.navigate('Prescriptions'),
    },
    {
      id: 5,
      type: 'message',
      title: 'New Message',
      message: 'Dr. Emily Davis replied to your question',
      time: 'Yesterday',
      read: true,
      icon: 'chatbubbles',
      color: argonTheme.colors.info,
      action: () => navigation.navigate('Messages'),
    },
    {
      id: 6,
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: 'Video consultation with Dr. Sarah Johnson confirmed for Oct 15',
      time: 'Yesterday',
      read: true,
      icon: 'calendar',
      color: argonTheme.colors.primary,
      action: () => navigation.navigate('Appointments'),
    },
    {
      id: 7,
      type: 'system',
      title: 'Health Tip',
      message: 'Remember to take your daily medication at 9:00 AM',
      time: '2 days ago',
      read: true,
      icon: 'information-circle',
      color: argonTheme.colors.success,
      action: null,
    },
    {
      id: 8,
      type: 'lab',
      title: 'Lab Appointment Scheduled',
      message: 'Blood test scheduled for Oct 20 at Central Medical Lab',
      time: '3 days ago',
      read: true,
      icon: 'flask',
      color: argonTheme.colors.success,
      action: () => navigation.navigate('LabResults'),
    },
  ]);

  const filters = [
    { id: 'all', label: 'All', icon: 'notifications', count: notifications.length },
    { id: 'unread', label: 'Unread', icon: 'alert-circle', count: notifications.filter(n => !n.read).length },
    { id: 'appointment', label: 'Appts', icon: 'calendar', count: notifications.filter(n => n.type === 'appointment').length },
    { id: 'message', label: 'Msgs', icon: 'chatbubbles', count: notifications.filter(n => n.type === 'message').length },
    { id: 'lab', label: 'Labs', icon: 'flask', count: notifications.filter(n => n.type === 'lab').length },
  ];

  const filteredNotifications = notifications.filter(notif => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unread') return !notif.read;
    return notif.type === selectedFilter;
  });

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications(notifications.filter(n => !n.read));
  };

  const handleNotificationTap = (notification) => {
    handleMarkAsRead(notification.id);
    if (notification.action) {
      notification.action();
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSubtitle}>
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity onPress={handleMarkAllAsRead}>
          <Ionicons name="checkmark-done-outline" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                selectedFilter === filter.id && { 
                  backgroundColor: gradient[0],
                  borderColor: gradient[0],
                }
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Ionicons
                name={filter.icon}
                size={14}
                color={selectedFilter === filter.id ? argonTheme.colors.white : gradient[0]}
              />
              <Text style={[
                styles.filterText,
                selectedFilter === filter.id && styles.filterTextSelected
              ]}>
                {filter.label}
              </Text>
              {filter.count > 0 && (
                <View style={[
                  styles.filterBadge,
                  selectedFilter === filter.id && styles.filterBadgeSelected
                ]}>
                  <Text style={[
                    styles.filterBadgeText,
                    selectedFilter === filter.id && styles.filterBadgeTextSelected
                  ]}>
                    {filter.count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredNotifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationCard,
              !notification.read && styles.notificationCardUnread
            ]}
            onPress={() => handleNotificationTap(notification)}
          >
            <View style={[styles.iconContainer, { backgroundColor: notification.color + '20' }]}>
              <Ionicons name={notification.icon} size={24} color={notification.color} />
            </View>

            <View style={styles.notificationContent}>
              <View style={styles.notificationHeader}>
                <Text style={[
                  styles.notificationTitle,
                  !notification.read && styles.notificationTitleUnread
                ]}>
                  {notification.title}
                </Text>
                {!notification.read && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.notificationMessage} numberOfLines={2}>
                {notification.message}
              </Text>
              <View style={styles.notificationFooter}>
                <Ionicons name="time-outline" size={12} color={argonTheme.colors.muted} />
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
            </View>

            {notification.action && (
              <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
            )}
          </TouchableOpacity>
        ))}

        {filteredNotifications.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={64} color={argonTheme.colors.muted} />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyText}>
              {selectedFilter === 'unread' 
                ? 'You\'re all caught up!' 
                : `No ${selectedFilter} notifications`}
            </Text>
          </View>
        )}

        {/* Quick Actions */}
        {filteredNotifications.length > 0 && (
          <View style={styles.quickActions}>
            {unreadCount > 0 && (
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={handleMarkAllAsRead}
              >
                <Ionicons name="checkmark-done" size={18} color={argonTheme.colors.success} />
                <Text style={styles.quickActionText}>Mark all as read</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={handleClearAll}
            >
              <Ionicons name="trash-outline" size={18} color={argonTheme.colors.danger} />
              <Text style={[styles.quickActionText, { color: argonTheme.colors.danger }]}>
                Clear read notifications
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: argonTheme.colors.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  filtersContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border,
    height: 50,
  },
  filtersContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    gap: 5,
    minWidth: 80,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  filterTextSelected: {
    color: argonTheme.colors.white,
  },
  filterBadge: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: argonTheme.colors.text,
  },
  filterBadgeTextSelected: {
    color: argonTheme.colors.white,
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    ...argonTheme.shadows.sm,
  },
  notificationCardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: argonTheme.colors.primary,
    backgroundColor: argonTheme.colors.primary + '08',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginRight: 8,
  },
  notificationTitleUnread: {
    fontWeight: 'bold',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: argonTheme.colors.danger,
  },
  notificationMessage: {
    fontSize: 14,
    color: argonTheme.colors.text,
    lineHeight: 20,
    marginBottom: 6,
  },
  notificationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: argonTheme.colors.muted,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: argonTheme.colors.muted,
    textAlign: 'center',
  },
  quickActions: {
    padding: 16,
    gap: 12,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.white,
    padding: 14,
    borderRadius: 12,
    gap: 8,
    ...argonTheme.shadows.sm,
  },
  quickActionText: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.success,
  },
});

