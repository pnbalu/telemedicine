import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Demo accounts for testing
const DEMO_ACCOUNTS = {
  // Patient account
  'patient@test.com': {
    password: 'test123',
    user: {
      id: 'PAT-123456',
      name: 'John Doe',
      role: 'patient',
      email: 'patient@test.com',
      accountId: 'TMX-123456',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '01/15/1990',
      gender: 'Male',
      bloodType: 'O+',
    }
  },
  // Doctor account
  'doctor@test.com': {
    password: 'test123',
    user: {
      id: 'DOC-789012',
      name: 'Dr. Alice Smith',
      role: 'doctor',
      email: 'doctor@test.com',
      specialty: 'Cardiologist',
      department: 'Cardiology',
      licenseNumber: 'MD-123456',
      phone: '+1 (555) 789-0123',
      yearsOfExperience: 12,
      education: 'MD - Harvard Medical School',
      certifications: ['Board Certified Cardiologist', 'ACLS'],
      rating: 4.8,
      totalPatients: 450,
    }
  },
  // Nurse account
  'nurse@test.com': {
    password: 'test123',
    user: {
      id: 'NUR-456789',
      name: 'Emily Davis',
      role: 'nurse',
      email: 'nurse@test.com',
      department: 'Emergency',
      licenseNumber: 'RN-456789',
      phone: '+1 (555) 456-7890',
      shift: 'Day Shift',
      yearsOfExperience: 8,
    }
  },
  // Admin account
  'admin@test.com': {
    password: 'test123',
    user: {
      id: 'ADM-111222',
      name: 'Robert Wilson',
      role: 'admin',
      email: 'admin@test.com',
      department: 'Administration',
      phone: '+1 (555) 111-2222',
      title: 'Hospital Administrator',
    }
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveUserData = async (userData) => {
    try {
      await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const login = async (email, password) => {
    // Check demo accounts
    const account = DEMO_ACCOUNTS[email.toLowerCase()];
    
    if (account && account.password === password) {
      // Automatically use the role from the account
      setUser(account.user);
      setIsAuthenticated(true);
      await saveUserData(account.user);
      return account.user;
    }
    
    // If not found in demo accounts, throw error
    throw new Error('Invalid email or password');
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateProfile = async (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    await saveUserData(updatedUser);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    userRole: user?.role || null,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

