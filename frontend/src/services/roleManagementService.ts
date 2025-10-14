// Multi-Role Management System with RBAC (Role-Based Access Control)

export type Role = 'patient' | 'doctor' | 'pharmacist' | 'lab_tech' | 'admin' | 'super_admin';

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete' | 'manage')[];
}

export interface RoleDefinition {
  role: Role;
  name: string;
  description: string;
  permissions: Permission[];
  canAccessRoutes: string[];
  canManageRoles: Role[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  status: 'active' | 'inactive' | 'suspended' | 'pending_verification';
  createdAt: Date;
  lastLogin?: Date;
  verificationStatus?: {
    emailVerified: boolean;
    phoneVerified: boolean;
    licenseVerified?: boolean;
    backgroundCheckCompleted?: boolean;
  };
  metadata?: Record<string, any>;
}

export interface AccessLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'denied' | 'error';
  details?: string;
}

class RoleManagementService {
  private roleDefinitions: Map<Role, RoleDefinition> = new Map();

  constructor() {
    this.initializeRoles();
  }

  /**
   * Initialize role definitions
   */
  private initializeRoles() {
    // Patient Role
    this.roleDefinitions.set('patient', {
      role: 'patient',
      name: 'Patient',
      description: 'Can book appointments, view prescriptions, and manage personal health records',
      permissions: [
        { resource: 'appointments', actions: ['create', 'read', 'update'] },
        { resource: 'prescriptions', actions: ['read'] },
        { resource: 'medical_records', actions: ['read'] },
        { resource: 'profile', actions: ['read', 'update'] },
        { resource: 'pharmacy_orders', actions: ['create', 'read'] },
        { resource: 'lab_results', actions: ['read'] },
      ],
      canAccessRoutes: [
        '/patient/*',
        '/video-call'
      ],
      canManageRoles: []
    });

    // Doctor Role
    this.roleDefinitions.set('doctor', {
      role: 'doctor',
      name: 'Doctor',
      description: 'Can manage patients, create prescriptions, and conduct consultations',
      permissions: [
        { resource: 'patients', actions: ['create', 'read', 'update'] },
        { resource: 'appointments', actions: ['read', 'update', 'delete'] },
        { resource: 'prescriptions', actions: ['create', 'read', 'update'] },
        { resource: 'medical_records', actions: ['create', 'read', 'update'] },
        { resource: 'consultations', actions: ['create', 'read', 'update'] },
        { resource: 'lab_orders', actions: ['create', 'read'] },
        { resource: 'triage_reviews', actions: ['read', 'update'] },
      ],
      canAccessRoutes: [
        '/doctor/*',
        '/video-call'
      ],
      canManageRoles: []
    });

    // Pharmacist Role
    this.roleDefinitions.set('pharmacist', {
      role: 'pharmacist',
      name: 'Pharmacist',
      description: 'Can manage pharmacy orders and prescriptions',
      permissions: [
        { resource: 'prescriptions', actions: ['read', 'update'] },
        { resource: 'pharmacy_orders', actions: ['read', 'update'] },
        { resource: 'medications', actions: ['create', 'read', 'update'] },
        { resource: 'inventory', actions: ['read', 'update'] },
      ],
      canAccessRoutes: [
        '/pharmacist/*'
      ],
      canManageRoles: []
    });

    // Lab Technician Role
    this.roleDefinitions.set('lab_tech', {
      role: 'lab_tech',
      name: 'Lab Technician',
      description: 'Can manage lab tests and upload results',
      permissions: [
        { resource: 'lab_orders', actions: ['read', 'update'] },
        { resource: 'lab_results', actions: ['create', 'read', 'update'] },
        { resource: 'tests', actions: ['read'] },
      ],
      canAccessRoutes: [
        '/lab/*'
      ],
      canManageRoles: []
    });

    // Admin Role
    this.roleDefinitions.set('admin', {
      role: 'admin',
      name: 'Administrator',
      description: 'Can manage users, view analytics, and configure system settings',
      permissions: [
        { resource: 'users', actions: ['create', 'read', 'update'] },
        { resource: 'analytics', actions: ['read'] },
        { resource: 'settings', actions: ['read', 'update'] },
        { resource: 'logs', actions: ['read'] },
        { resource: 'notifications', actions: ['create', 'read', 'update'] },
        { resource: 'reports', actions: ['read'] },
      ],
      canAccessRoutes: [
        '/admin/*'
      ],
      canManageRoles: ['patient', 'doctor', 'pharmacist', 'lab_tech']
    });

    // Super Admin Role
    this.roleDefinitions.set('super_admin', {
      role: 'super_admin',
      name: 'Super Administrator',
      description: 'Full system access with all permissions',
      permissions: [
        { resource: '*', actions: ['create', 'read', 'update', 'delete', 'manage'] }
      ],
      canAccessRoutes: ['/*'],
      canManageRoles: ['patient', 'doctor', 'pharmacist', 'lab_tech', 'admin', 'super_admin']
    });
  }

  /**
   * Get role definition
   */
  getRoleDefinition(role: Role): RoleDefinition | undefined {
    return this.roleDefinitions.get(role);
  }

  /**
   * Get all role definitions
   */
  getAllRoles(): RoleDefinition[] {
    return Array.from(this.roleDefinitions.values());
  }

  /**
   * Check if user has permission
   */
  hasPermission(
    userRole: Role,
    resource: string,
    action: 'create' | 'read' | 'update' | 'delete' | 'manage'
  ): boolean {
    const roleDefinition = this.roleDefinitions.get(userRole);
    if (!roleDefinition) return false;

    // Super admin has all permissions
    if (userRole === 'super_admin') return true;

    // Check specific permissions
    return roleDefinition.permissions.some(permission => {
      const resourceMatch = permission.resource === '*' || permission.resource === resource;
      const actionMatch = permission.actions.includes(action) || permission.actions.includes('manage');
      return resourceMatch && actionMatch;
    });
  }

  /**
   * Check if user can access route
   */
  canAccessRoute(userRole: Role, route: string): boolean {
    const roleDefinition = this.roleDefinitions.get(userRole);
    if (!roleDefinition) return false;

    // Super admin can access everything
    if (userRole === 'super_admin') return true;

    return roleDefinition.canAccessRoutes.some(allowedRoute => {
      if (allowedRoute === '/*') return true;
      if (allowedRoute.endsWith('/*')) {
        const baseRoute = allowedRoute.slice(0, -2);
        return route.startsWith(baseRoute);
      }
      return route === allowedRoute;
    });
  }

  /**
   * Check if user can manage another role
   */
  canManageRole(userRole: Role, targetRole: Role): boolean {
    const roleDefinition = this.roleDefinitions.get(userRole);
    if (!roleDefinition) return false;

    // Super admin can manage all roles
    if (userRole === 'super_admin') return true;

    return roleDefinition.canManageRoles.includes(targetRole);
  }

  /**
   * Get all users
   */
  async getAllUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data
    return [
      {
        id: 'U001',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'patient',
        status: 'active',
        createdAt: new Date('2025-01-15'),
        lastLogin: new Date('2025-10-11'),
        verificationStatus: {
          emailVerified: true,
          phoneVerified: true
        }
      },
      {
        id: 'U002',
        email: 'dr.johnson@example.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'doctor',
        status: 'active',
        createdAt: new Date('2024-06-20'),
        lastLogin: new Date('2025-10-11'),
        verificationStatus: {
          emailVerified: true,
          phoneVerified: true,
          licenseVerified: true,
          backgroundCheckCompleted: true
        },
        metadata: {
          licenseNumber: 'MD-123456',
          specialty: 'Cardiology',
          yearsExperience: 15
        }
      },
      {
        id: 'U003',
        email: 'admin@telemedx.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        status: 'active',
        createdAt: new Date('2024-01-01'),
        lastLogin: new Date('2025-10-11'),
        verificationStatus: {
          emailVerified: true,
          phoneVerified: true
        }
      },
      {
        id: 'U004',
        email: 'dr.pending@example.com',
        firstName: 'Michael',
        lastName: 'Chen',
        role: 'doctor',
        status: 'pending_verification',
        createdAt: new Date('2025-10-10'),
        verificationStatus: {
          emailVerified: true,
          phoneVerified: true,
          licenseVerified: false,
          backgroundCheckCompleted: false
        },
        metadata: {
          licenseNumber: 'MD-789012',
          specialty: 'General Practice'
        }
      }
    ];
  }

  /**
   * Get users by role
   */
  async getUsersByRole(role: Role): Promise<User[]> {
    const allUsers = await this.getAllUsers();
    return allUsers.filter(user => user.role === role);
  }

  /**
   * Update user role
   */
  async updateUserRole(userId: string, newRole: Role): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`Updated user ${userId} to role: ${newRole}`);
  }

  /**
   * Update user status
   */
  async updateUserStatus(userId: string, status: User['status']): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`Updated user ${userId} status to: ${status}`);
  }

  /**
   * Log access attempt
   */
  async logAccess(log: Omit<AccessLog, 'id' | 'timestamp'>): Promise<void> {
    const accessLog: AccessLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date(),
      ...log
    };
    
    console.log('Access logged:', accessLog);
    // In production, save to database
  }

  /**
   * Get access logs
   */
  async getAccessLogs(filters?: {
    userId?: string;
    startDate?: Date;
    endDate?: Date;
    status?: 'success' | 'denied' | 'error';
  }): Promise<AccessLog[]> {
    await new Promise(resolve => setTimeout(resolve, 400));

    // Mock access logs
    return [
      {
        id: 'LOG-001',
        userId: 'U001',
        userName: 'John Doe',
        action: 'view',
        resource: 'prescriptions',
        timestamp: new Date('2025-10-11T10:30:00'),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0',
        status: 'success'
      },
      {
        id: 'LOG-002',
        userId: 'U002',
        userName: 'Dr. Sarah Johnson',
        action: 'create',
        resource: 'prescription',
        timestamp: new Date('2025-10-11T11:15:00'),
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0',
        status: 'success'
      },
      {
        id: 'LOG-003',
        userId: 'U001',
        userName: 'John Doe',
        action: 'access',
        resource: 'admin_dashboard',
        timestamp: new Date('2025-10-11T11:45:00'),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0',
        status: 'denied',
        details: 'Insufficient permissions'
      }
    ];
  }

  /**
   * Get user activity summary
   */
  async getUserActivitySummary(userId: string): Promise<{
    totalActions: number;
    lastActive: Date;
    commonActions: Array<{ action: string; count: number }>;
    recentLogs: AccessLog[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const logs = await this.getAccessLogs({ userId });

    return {
      totalActions: logs.length,
      lastActive: logs.length > 0 ? logs[0].timestamp : new Date(),
      commonActions: [
        { action: 'view prescriptions', count: 15 },
        { action: 'book appointment', count: 8 },
        { action: 'view medical records', count: 12 }
      ],
      recentLogs: logs.slice(0, 10)
    };
  }
}

export const roleManagementService = new RoleManagementService();

