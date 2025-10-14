// AI Fraud Detection Service
// Detects fake doctors, repeated misuse, and suspicious activities

export interface FraudAlert {
  id: string;
  type: 'fake_credentials' | 'repeated_misuse' | 'suspicious_activity' | 'data_breach' | 'identity_theft';
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId: string;
  userName: string;
  userRole: string;
  description: string;
  detectedAt: Date;
  evidence: FraudEvidence[];
  riskScore: number; // 0-100
  status: 'open' | 'investigating' | 'resolved' | 'false_positive';
  assignedTo?: string;
  resolvedAt?: Date;
  resolutionNotes?: string;
}

export interface FraudEvidence {
  type: string;
  description: string;
  confidence: number;
  timestamp: Date;
  data: Record<string, any>;
}

export interface AnomalyDetection {
  userId: string;
  anomalies: Array<{
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: Date;
    baseline: string;
    observed: string;
  }>;
  overallRiskScore: number;
}

export interface BehaviorPattern {
  userId: string;
  patterns: {
    loginTimes: string[];
    loginLocations: string[];
    averageSessionDuration: number;
    commonActions: string[];
    deviceFingerprints: string[];
  };
  deviations: Array<{
    pattern: string;
    expectedValue: string;
    actualValue: string;
    deviationScore: number;
  }>;
}

class FraudDetectionService {
  private fraudAlerts: FraudAlert[] = [];

  /**
   * Run comprehensive fraud detection scan
   */
  async runFraudScan(): Promise<FraudAlert[]> {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate AI processing

    const alerts: FraudAlert[] = [];

    // Check for fake credentials
    const credentialChecks = await this.detectFakeCredentials();
    alerts.push(...credentialChecks);

    // Check for repeated misuse
    const misuseChecks = await this.detectRepeatedMisuse();
    alerts.push(...misuseChecks);

    // Check for suspicious activities
    const suspiciousActivities = await this.detectSuspiciousActivities();
    alerts.push(...suspiciousActivities);

    this.fraudAlerts = alerts;
    return alerts;
  }

  /**
   * Detect fake doctor credentials
   */
  async detectFakeCredentials(): Promise<FraudAlert[]> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const alerts: FraudAlert[] = [];

    // Simulate detection of suspicious credential
    // In production, verify against medical board databases
    alerts.push({
      id: `FRAUD-${Date.now()}-1`,
      type: 'fake_credentials',
      severity: 'critical',
      userId: 'U999',
      userName: 'Dr. Suspicious Name',
      userRole: 'doctor',
      description: 'Medical license verification failed - license number not found in state registry',
      detectedAt: new Date(),
      evidence: [
        {
          type: 'license_verification',
          description: 'License number MD-999999 not found in state medical board database',
          confidence: 0.95,
          timestamp: new Date(),
          data: {
            licenseNumber: 'MD-999999',
            stateChecked: 'CA',
            verificationAttempts: 3
          }
        },
        {
          type: 'document_analysis',
          description: 'Uploaded license document shows signs of digital manipulation',
          confidence: 0.87,
          timestamp: new Date(),
          data: {
            manipulationIndicators: ['metadata_mismatch', 'compression_artifacts'],
            documentAge: 'recently_created'
          }
        }
      ],
      riskScore: 92,
      status: 'open'
    });

    return alerts;
  }

  /**
   * Detect repeated misuse patterns
   */
  async detectRepeatedMisuse(): Promise<FraudAlert[]> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const alerts: FraudAlert[] = [];

    // Detect prescription abuse
    alerts.push({
      id: `FRAUD-${Date.now()}-2`,
      type: 'repeated_misuse',
      severity: 'high',
      userId: 'D456',
      userName: 'Dr. John Smith',
      userRole: 'doctor',
      description: 'Abnormal prescription pattern detected - excessive controlled substance prescriptions',
      detectedAt: new Date(),
      evidence: [
        {
          type: 'prescription_pattern',
          description: '127 opioid prescriptions in last 30 days (average for specialty: 12)',
          confidence: 0.93,
          timestamp: new Date(),
          data: {
            prescriptionsLast30Days: 127,
            averageForSpecialty: 12,
            controlledSubstanceRatio: 0.89
          }
        },
        {
          type: 'patient_overlap',
          description: '15 patients received similar prescriptions from this doctor within 48 hours',
          confidence: 0.85,
          timestamp: new Date(),
          data: {
            suspiciousPatientCount: 15,
            prescriptionSimilarity: 0.94
          }
        }
      ],
      riskScore: 85,
      status: 'open'
    });

    return alerts;
  }

  /**
   * Detect suspicious activities
   */
  async detectSuspiciousActivities(): Promise<FraudAlert[]> {
    await new Promise(resolve => setTimeout(resolve, 700));

    const alerts: FraudAlert[] = [];

    // Detect unusual access patterns
    alerts.push({
      id: `FRAUD-${Date.now()}-3`,
      type: 'suspicious_activity',
      severity: 'medium',
      userId: 'U123',
      userName: 'Jane Doe',
      userRole: 'patient',
      description: 'Multiple account access from different geographic locations within short timeframe',
      detectedAt: new Date(),
      evidence: [
        {
          type: 'geolocation_anomaly',
          description: 'Account accessed from New York and London within 2 hours',
          confidence: 0.91,
          timestamp: new Date(),
          data: {
            locations: ['New York, US', 'London, UK'],
            timeframe: '2 hours',
            physicallyImpossible: true
          }
        },
        {
          type: 'device_fingerprint',
          description: 'Multiple new devices registered in 24 hours',
          confidence: 0.78,
          timestamp: new Date(),
          data: {
            newDevicesCount: 5,
            timeframe: '24 hours'
          }
        }
      ],
      riskScore: 72,
      status: 'open'
    });

    return alerts;
  }

  /**
   * Analyze user behavior for anomalies
   */
  async analyzeUserBehavior(userId: string): Promise<AnomalyDetection> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const anomalies = [];

    // Login time anomaly
    const rand = Math.random();
    if (rand > 0.7) {
      anomalies.push({
        type: 'unusual_login_time',
        description: 'Login at 3:47 AM, outside typical hours (9 AM - 6 PM)',
        severity: 'low' as const,
        timestamp: new Date(),
        baseline: '9 AM - 6 PM weekdays',
        observed: '3:47 AM'
      });
    }

    // Data access anomaly
    if (rand > 0.6) {
      anomalies.push({
        type: 'excessive_data_access',
        description: 'Accessed 150 patient records in 1 hour (baseline: 20/hour)',
        severity: 'high' as const,
        timestamp: new Date(),
        baseline: '20 records/hour',
        observed: '150 records/hour'
      });
    }

    // Location anomaly
    if (rand > 0.8) {
      anomalies.push({
        type: 'unusual_location',
        description: 'Access from IP in different country than registered location',
        severity: 'medium' as const,
        timestamp: new Date(),
        baseline: 'United States',
        observed: 'Nigeria'
      });
    }

    const overallRiskScore = anomalies.reduce((sum, a) => {
      return sum + (a.severity === 'high' ? 30 : a.severity === 'medium' ? 15 : 5);
    }, 0);

    return {
      userId,
      anomalies,
      overallRiskScore: Math.min(overallRiskScore, 100)
    };
  }

  /**
   * Build behavior profile
   */
  async buildBehaviorProfile(userId: string): Promise<BehaviorPattern> {
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      userId,
      patterns: {
        loginTimes: ['9:00 AM', '2:30 PM', '5:45 PM'],
        loginLocations: ['New York, NY', 'Brooklyn, NY'],
        averageSessionDuration: 45, // minutes
        commonActions: ['view_prescriptions', 'book_appointment', 'view_records'],
        deviceFingerprints: ['chrome_windows_192.168.1.100', 'safari_ios_mobile']
      },
      deviations: []
    };
  }

  /**
   * Verify doctor credentials
   */
  async verifyDoctorCredentials(doctorId: string, credentials: {
    licenseNumber: string;
    state: string;
    npiNumber?: string;
    deaNumber?: string;
  }): Promise<{
    verified: boolean;
    details: {
      licenseValid: boolean;
      npiValid?: boolean;
      deaValid?: boolean;
      backgroundCheckPassed?: boolean;
    };
    issues: string[];
    confidence: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate verification against external databases
    const verified = Math.random() > 0.1; // 90% verification success rate

    return {
      verified,
      details: {
        licenseValid: verified,
        npiValid: credentials.npiNumber ? true : undefined,
        deaValid: credentials.deaNumber ? true : undefined,
        backgroundCheckPassed: verified
      },
      issues: verified ? [] : ['License number not found in state database'],
      confidence: verified ? 0.95 : 0.2
    };
  }

  /**
   * Check for identity theft
   */
  async checkIdentityTheft(userId: string): Promise<{
    suspected: boolean;
    indicators: string[];
    riskScore: number;
    recommendations: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 700));

    const indicators: string[] = [];
    const suspected = Math.random() > 0.95; // 5% suspicion rate

    if (suspected) {
      indicators.push('Social security number mismatch with provided documents');
      indicators.push('Photo ID verification failed facial recognition');
    }

    return {
      suspected,
      indicators,
      riskScore: suspected ? 85 : 10,
      recommendations: suspected
        ? ['Request additional identity verification', 'Freeze account temporarily', 'Contact user via verified phone number']
        : ['Continue normal monitoring']
    };
  }

  /**
   * Detect coordinated fraud rings
   */
  async detectFraudRings(): Promise<Array<{
    ringId: string;
    members: string[];
    suspiciousActivities: string[];
    riskScore: number;
    detectedAt: Date;
  }>> {
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Simulate detection of fraud ring
    return [
      {
        ringId: 'RING-001',
        members: ['U456', 'U457', 'U458'],
        suspiciousActivities: [
          'Same IP address used by multiple accounts',
          'Coordinated appointment booking patterns',
          'Similar prescription requests'
        ],
        riskScore: 78,
        detectedAt: new Date()
      }
    ];
  }

  /**
   * Monitor prescription abuse
   */
  async monitorPrescriptionAbuse(): Promise<Array<{
    doctorId: string;
    doctorName: string;
    issue: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    details: {
      prescriptionCount: number;
      controlledSubstanceRatio: number;
      averageForPeers: number;
    };
  }>> {
    await new Promise(resolve => setTimeout(resolve, 900));

    return [
      {
        doctorId: 'D123',
        doctorName: 'Dr. Smith',
        issue: 'Excessive controlled substance prescriptions',
        severity: 'high',
        details: {
          prescriptionCount: 127,
          controlledSubstanceRatio: 0.89,
          averageForPeers: 12
        }
      }
    ];
  }

  /**
   * Get all active fraud alerts
   */
  async getActiveFraudAlerts(): Promise<FraudAlert[]> {
    if (this.fraudAlerts.length === 0) {
      return await this.runFraudScan();
    }
    return this.fraudAlerts.filter(alert => alert.status !== 'resolved' && alert.status !== 'false_positive');
  }

  /**
   * Update fraud alert status
   */
  async updateAlertStatus(
    alertId: string,
    status: FraudAlert['status'],
    resolutionNotes?: string
  ): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const alert = this.fraudAlerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = status;
      if (resolutionNotes) {
        alert.resolutionNotes = resolutionNotes;
      }
      if (status === 'resolved' || status === 'false_positive') {
        alert.resolvedAt = new Date();
      }
    }
  }

  /**
   * Get fraud statistics
   */
  async getFraudStatistics(): Promise<{
    totalAlerts: number;
    criticalAlerts: number;
    resolvedAlerts: number;
    falsePositives: number;
    averageResolutionTime: number;
    alertsByType: Record<string, number>;
    trendData: Array<{ date: string; count: number }>;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const alerts = this.fraudAlerts.length > 0 ? this.fraudAlerts : await this.runFraudScan();

    return {
      totalAlerts: alerts.length,
      criticalAlerts: alerts.filter(a => a.severity === 'critical').length,
      resolvedAlerts: alerts.filter(a => a.status === 'resolved').length,
      falsePositives: alerts.filter(a => a.status === 'false_positive').length,
      averageResolutionTime: 4.5, // hours
      alertsByType: {
        fake_credentials: 1,
        repeated_misuse: 1,
        suspicious_activity: 1,
        data_breach: 0,
        identity_theft: 0
      },
      trendData: [
        { date: '2025-10-04', count: 2 },
        { date: '2025-10-05', count: 3 },
        { date: '2025-10-06', count: 1 },
        { date: '2025-10-07', count: 4 },
        { date: '2025-10-08', count: 2 },
        { date: '2025-10-09', count: 5 },
        { date: '2025-10-10', count: 3 },
        { date: '2025-10-11', count: alerts.length }
      ]
    };
  }
}

export const fraudDetectionService = new FraudDetectionService();

