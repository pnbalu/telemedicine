// Push Notification Management System

export interface Notification {
  id: string;
  type: 'appointment' | 'prescription' | 'test_result' | 'system' | 'marketing' | 'alert';
  title: string;
  message: string;
  recipient: {
    userId: string;
    role: string;
    channels: ('push' | 'email' | 'sms')[];
  };
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  scheduledFor?: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  data?: Record<string, any>;
  actionUrl?: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: Notification['type'];
  subject: string;
  body: string;
  variables: string[];
  channels: ('push' | 'email' | 'sms')[];
  enabled: boolean;
}

export interface NotificationCampaign {
  id: string;
  name: string;
  type: 'broadcast' | 'targeted' | 'automated';
  targetAudience: {
    roles?: string[];
    ageRange?: { min: number; max: number };
    conditions?: string[];
    lastActiveWithin?: number; // days
  };
  template: NotificationTemplate;
  schedule: {
    type: 'immediate' | 'scheduled' | 'recurring';
    startDate?: Date;
    endDate?: Date;
    frequency?: string;
  };
  status: 'draft' | 'active' | 'paused' | 'completed';
  statistics: {
    sent: number;
    delivered: number;
    read: number;
    clicked: number;
  };
}

class NotificationService {
  private notifications: Notification[] = [];
  private templates: NotificationTemplate[] = [];

  constructor() {
    this.initializeTemplates();
  }

  /**
   * Initialize default notification templates
   */
  private initializeTemplates() {
    this.templates = [
      {
        id: 'TPL-001',
        name: 'Appointment Reminder',
        type: 'appointment',
        subject: 'Upcoming Appointment Reminder',
        body: 'Hi {patientName}, this is a reminder about your appointment with {doctorName} on {appointmentDate} at {appointmentTime}.',
        variables: ['patientName', 'doctorName', 'appointmentDate', 'appointmentTime'],
        channels: ['push', 'email', 'sms'],
        enabled: true
      },
      {
        id: 'TPL-002',
        name: 'Prescription Ready',
        type: 'prescription',
        subject: 'Your Prescription is Ready',
        body: 'Hi {patientName}, your prescription for {medicationName} is ready for pickup at {pharmacyName}.',
        variables: ['patientName', 'medicationName', 'pharmacyName'],
        channels: ['push', 'sms'],
        enabled: true
      },
      {
        id: 'TPL-003',
        name: 'Test Results Available',
        type: 'test_result',
        subject: 'New Test Results Available',
        body: 'Hi {patientName}, your test results from {testDate} are now available. Please log in to view them.',
        variables: ['patientName', 'testDate'],
        channels: ['push', 'email'],
        enabled: true
      },
      {
        id: 'TPL-004',
        name: 'Medication Reminder',
        type: 'prescription',
        subject: 'Time to Take Your Medication',
        body: 'Reminder: Take your {medicationName} {dosage}.',
        variables: ['medicationName', 'dosage'],
        channels: ['push'],
        enabled: true
      },
      {
        id: 'TPL-005',
        name: 'Appointment Confirmation',
        type: 'appointment',
        subject: 'Appointment Confirmed',
        body: 'Your appointment with {doctorName} on {appointmentDate} at {appointmentTime} has been confirmed.',
        variables: ['doctorName', 'appointmentDate', 'appointmentTime'],
        channels: ['push', 'email', 'sms'],
        enabled: true
      }
    ];
  }

  /**
   * Send notification
   */
  async sendNotification(notification: Omit<Notification, 'id' | 'status' | 'sentAt'>): Promise<Notification> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const newNotification: Notification = {
      id: `NOTIF-${Date.now()}`,
      status: 'sent',
      sentAt: new Date(),
      ...notification
    };

    this.notifications.push(newNotification);

    // Simulate delivery
    setTimeout(() => {
      newNotification.status = 'delivered';
      newNotification.deliveredAt = new Date();
    }, 1000);

    return newNotification;
  }

  /**
   * Send bulk notifications
   */
  async sendBulkNotifications(
    recipients: Array<{ userId: string; role: string }>,
    template: NotificationTemplate,
    variables: Record<string, string>
  ): Promise<{
    sent: number;
    failed: number;
    results: Array<{ userId: string; status: 'success' | 'failed'; error?: string }>;
  }> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const results = recipients.map(recipient => ({
      userId: recipient.userId,
      status: Math.random() > 0.05 ? 'success' as const : 'failed' as const,
      error: Math.random() > 0.05 ? undefined : 'Delivery failed'
    }));

    return {
      sent: results.filter(r => r.status === 'success').length,
      failed: results.filter(r => r.status === 'failed').length,
      results
    };
  }

  /**
   * Schedule notification
   */
  async scheduleNotification(
    notification: Omit<Notification, 'id' | 'status'>,
    scheduledFor: Date
  ): Promise<Notification> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const scheduled: Notification = {
      id: `NOTIF-${Date.now()}`,
      status: 'pending',
      scheduledFor,
      ...notification
    };

    this.notifications.push(scheduled);
    return scheduled;
  }

  /**
   * Get notification templates
   */
  async getTemplates(): Promise<NotificationTemplate[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.templates;
  }

  /**
   * Create notification template
   */
  async createTemplate(template: Omit<NotificationTemplate, 'id'>): Promise<NotificationTemplate> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const newTemplate: NotificationTemplate = {
      id: `TPL-${Date.now()}`,
      ...template
    };

    this.templates.push(newTemplate);
    return newTemplate;
  }

  /**
   * Update notification template
   */
  async updateTemplate(id: string, updates: Partial<NotificationTemplate>): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const template = this.templates.find(t => t.id === id);
    if (template) {
      Object.assign(template, updates);
    }
  }

  /**
   * Get user notifications
   */
  async getUserNotifications(userId: string): Promise<Notification[]> {
    await new Promise(resolve => setTimeout(resolve, 400));

    // Mock notifications
    return [
      {
        id: 'NOTIF-001',
        type: 'appointment',
        title: 'Upcoming Appointment',
        message: 'You have an appointment with Dr. Johnson tomorrow at 10:00 AM',
        recipient: {
          userId,
          role: 'patient',
          channels: ['push', 'email']
        },
        priority: 'high',
        status: 'delivered',
        sentAt: new Date(Date.now() - 3600000),
        deliveredAt: new Date(Date.now() - 3500000),
        actionUrl: '/patient/book-appointment'
      },
      {
        id: 'NOTIF-002',
        type: 'prescription',
        title: 'Prescription Ready',
        message: 'Your prescription is ready for pickup at CVS Pharmacy',
        recipient: {
          userId,
          role: 'patient',
          channels: ['push', 'sms']
        },
        priority: 'normal',
        status: 'read',
        sentAt: new Date(Date.now() - 7200000),
        deliveredAt: new Date(Date.now() - 7100000),
        readAt: new Date(Date.now() - 3600000),
        actionUrl: '/patient/pharmacy'
      },
      {
        id: 'NOTIF-003',
        type: 'system',
        title: 'New Features Available',
        message: 'Check out our new AI symptom checker!',
        recipient: {
          userId,
          role: 'patient',
          channels: ['push']
        },
        priority: 'low',
        status: 'delivered',
        sentAt: new Date(Date.now() - 86400000),
        deliveredAt: new Date(Date.now() - 86300000),
        actionUrl: '/patient/ai-symptom-checker'
      }
    ];
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.status = 'read';
      notification.readAt = new Date();
    }
  }

  /**
   * Get notification statistics
   */
  async getStatistics(timeframe: 'day' | 'week' | 'month'): Promise<{
    total: number;
    sent: number;
    delivered: number;
    read: number;
    failed: number;
    deliveryRate: number;
    readRate: number;
    byType: Record<string, number>;
    byChannel: Record<string, number>;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      total: 1250,
      sent: 1200,
      delivered: 1150,
      read: 890,
      failed: 50,
      deliveryRate: 95.8,
      readRate: 77.4,
      byType: {
        appointment: 450,
        prescription: 320,
        test_result: 180,
        system: 200,
        marketing: 100
      },
      byChannel: {
        push: 800,
        email: 650,
        sms: 500
      }
    };
  }

  /**
   * Create notification campaign
   */
  async createCampaign(campaign: Omit<NotificationCampaign, 'id' | 'statistics'>): Promise<NotificationCampaign> {
    await new Promise(resolve => setTimeout(resolve, 600));

    return {
      id: `CAMP-${Date.now()}`,
      ...campaign,
      statistics: {
        sent: 0,
        delivered: 0,
        read: 0,
        clicked: 0
      }
    };
  }

  /**
   * Get active campaigns
   */
  async getActiveCampaigns(): Promise<NotificationCampaign[]> {
    await new Promise(resolve => setTimeout(resolve, 400));

    return [
      {
        id: 'CAMP-001',
        name: 'Annual Checkup Reminder',
        type: 'targeted',
        targetAudience: {
          roles: ['patient'],
          lastActiveWithin: 365
        },
        template: this.templates[0],
        schedule: {
          type: 'recurring',
          frequency: 'monthly',
          startDate: new Date('2025-01-01')
        },
        status: 'active',
        statistics: {
          sent: 1500,
          delivered: 1425,
          read: 1050,
          clicked: 780
        }
      }
    ];
  }

  /**
   * Test notification
   */
  async testNotification(template: NotificationTemplate, testUserId: string): Promise<{
    success: boolean;
    message: string;
    preview: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      success: true,
      message: 'Test notification sent successfully',
      preview: template.body.replace(/{(\w+)}/g, '[TEST_VALUE]')
    };
  }
}

export const notificationService = new NotificationService();

