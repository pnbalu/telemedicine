// Connection Details Hook (from agent-starter-react)
// Fetches token from backend API

import { useCallback, useEffect, useState } from 'react';

export interface ConnectionDetails {
  serverUrl: string;
  participantToken: string;
  roomName: string;
  participantName: string;
}

export default function useConnectionDetails() {
  const [connectionDetails, setConnectionDetails] = useState<ConnectionDetails | null>(null);

  const fetchConnectionDetails = useCallback(async () => {
    setConnectionDetails(null);
    
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    
    try {
      // Use exact same endpoint as official example
      const response = await fetch(`${apiUrl}/api/connection-details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_config: {
            agents: [{ agent_name: 'medical-assistant' }]
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setConnectionDetails(data);
      return data;
    } catch (error) {
      console.error('Error fetching connection details:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchConnectionDetails();
  }, [fetchConnectionDetails]);

  const isConnectionDetailsExpired = useCallback(() => {
    const token = connectionDetails?.participantToken;
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload.exp) return true;
      
      const expiresAt = new Date(payload.exp * 1000 - 60000); // 1 min buffer
      return expiresAt <= new Date();
    } catch {
      return true;
    }
  }, [connectionDetails?.participantToken]);

  const existingOrRefreshConnectionDetails = useCallback(async () => {
    if (isConnectionDetailsExpired() || !connectionDetails) {
      return fetchConnectionDetails();
    }
    return connectionDetails;
  }, [connectionDetails, fetchConnectionDetails, isConnectionDetailsExpired]);

  return {
    connectionDetails,
    refreshConnectionDetails: fetchConnectionDetails,
    existingOrRefreshConnectionDetails,
  };
}

