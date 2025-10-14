import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FamilyContext = createContext();

export const useFamilyContext = () => {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamilyContext must be used within FamilyProvider');
  }
  return context;
};

export const FamilyProvider = ({ children }) => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [activeProfileId, setActiveProfileId] = useState('self');
  const [loading, setLoading] = useState(true);

  // Load family data on mount
  useEffect(() => {
    loadFamilyData();
  }, []);

  // Save family data whenever it changes
  useEffect(() => {
    if (!loading) {
      saveFamilyData();
    }
  }, [familyMembers, activeProfileId]);

  const loadFamilyData = async () => {
    try {
      const [membersData, activeId] = await Promise.all([
        AsyncStorage.getItem('familyMembers'),
        AsyncStorage.getItem('activeProfileId'),
      ]);

      if (membersData) {
        setFamilyMembers(JSON.parse(membersData));
      }
      if (activeId) {
        setActiveProfileId(activeId);
      }
    } catch (error) {
      console.error('Error loading family data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFamilyData = async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem('familyMembers', JSON.stringify(familyMembers)),
        AsyncStorage.setItem('activeProfileId', activeProfileId),
      ]);
    } catch (error) {
      console.error('Error saving family data:', error);
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const addFamilyMember = (memberData) => {
    const newMember = {
      id: `family-${Date.now()}`,
      ...memberData,
      addedDate: new Date().toISOString(),
      age: calculateAge(memberData.dateOfBirth),
      isMinor: calculateAge(memberData.dateOfBirth) < 18,
    };

    setFamilyMembers([...familyMembers, newMember]);
    return newMember.id;
  };

  const updateFamilyMember = (memberId, updatedData) => {
    setFamilyMembers(familyMembers.map(member => 
      member.id === memberId 
        ? { 
            ...member, 
            ...updatedData,
            age: calculateAge(updatedData.dateOfBirth || member.dateOfBirth),
            isMinor: calculateAge(updatedData.dateOfBirth || member.dateOfBirth) < 18,
          }
        : member
    ));
  };

  const removeFamilyMember = (memberId) => {
    // If removing the active profile, switch to self
    if (activeProfileId === memberId) {
      setActiveProfileId('self');
    }
    setFamilyMembers(familyMembers.filter(member => member.id !== memberId));
  };

  const switchProfile = (profileId) => {
    setActiveProfileId(profileId);
  };

  const getActiveProfile = () => {
    if (activeProfileId === 'self') {
      return {
        id: 'self',
        name: 'Me',
        type: 'self',
        relationship: null,
      };
    }

    const member = familyMembers.find(m => m.id === activeProfileId);
    if (member) {
      return {
        ...member,
        type: 'family',
      };
    }

    // Fallback to self if member not found
    return {
      id: 'self',
      name: 'Me',
      type: 'self',
      relationship: null,
    };
  };

  const getAllProfiles = () => {
    return [
      {
        id: 'self',
        name: 'Me',
        type: 'self',
        relationship: null,
      },
      ...familyMembers.map(member => ({
        ...member,
        type: 'family',
      })),
    ];
  };

  const value = {
    familyMembers,
    activeProfileId,
    activeProfile: getActiveProfile(),
    loading,
    addFamilyMember,
    updateFamilyMember,
    removeFamilyMember,
    switchProfile,
    getAllProfiles,
  };

  return (
    <FamilyContext.Provider value={value}>
      {children}
    </FamilyContext.Provider>
  );
};

