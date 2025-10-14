// LiveKit Video Consultation Service
// Real-time video/audio communication with LiveKit

import { 
  Room, 
  RoomEvent, 
  Track,
  LocalParticipant,
  RemoteParticipant,
  LocalTrack,
  RemoteTrack,
  DataPacket_Kind,
  RoomOptions,
  VideoPresets
} from 'livekit-client';

export interface LiveKitConfig {
  url: string; // LiveKit server URL
  token: string; // JWT token for authentication
  roomName: string;
  participantName: string;
}

export interface ParticipantInfo {
  identity: string;
  name: string;
  role: 'doctor' | 'patient';
  isSpeaking: boolean;
  isCameraEnabled: boolean;
  isMicrophoneEnabled: boolean;
  isScreenSharing: boolean;
  connectionQuality: 'excellent' | 'good' | 'poor';
}

export interface RoomStats {
  duration: number; // in seconds
  participantCount: number;
  bandwidth: {
    upload: number;
    download: number;
  };
  latency: number;
  packetLoss: number;
}

class LiveKitService {
  private room: Room | null = null;
  private localParticipant: LocalParticipant | null = null;
  private eventHandlers: Map<string, Function[]> = new Map();

  /**
   * Connect to LiveKit room
   */
  async connect(config: LiveKitConfig): Promise<Room> {
    const roomOptions: RoomOptions = {
      adaptiveStream: true,
      dynacast: true,
      videoCaptureDefaults: {
        resolution: VideoPresets.h720.resolution,
      },
    };

    this.room = new Room(roomOptions);

    // Set up event listeners
    this.setupEventListeners();

    try {
      // Connect to room
      await this.room.connect(config.url, config.token);
      this.localParticipant = this.room.localParticipant;
      
      console.log('Connected to LiveKit room:', config.roomName);
      return this.room;
    } catch (error) {
      console.error('Failed to connect to LiveKit room:', error);
      throw error;
    }
  }

  /**
   * Disconnect from room
   */
  async disconnect(): Promise<void> {
    if (this.room) {
      await this.room.disconnect();
      this.room = null;
      this.localParticipant = null;
      console.log('Disconnected from LiveKit room');
    }
  }

  /**
   * Enable/disable local camera
   */
  async setCameraEnabled(enabled: boolean): Promise<void> {
    if (!this.localParticipant) return;

    try {
      await this.localParticipant.setCameraEnabled(enabled);
    } catch (error) {
      console.error('Error toggling camera:', error);
      throw error;
    }
  }

  /**
   * Enable/disable local microphone
   */
  async setMicrophoneEnabled(enabled: boolean): Promise<void> {
    if (!this.localParticipant) return;

    try {
      await this.localParticipant.setMicrophoneEnabled(enabled);
    } catch (error) {
      console.error('Error toggling microphone:', error);
      throw error;
    }
  }

  /**
   * Start screen sharing
   */
  async startScreenShare(): Promise<void> {
    if (!this.localParticipant) return;

    try {
      await this.localParticipant.setScreenShareEnabled(true);
    } catch (error) {
      console.error('Error starting screen share:', error);
      throw error;
    }
  }

  /**
   * Stop screen sharing
   */
  async stopScreenShare(): Promise<void> {
    if (!this.localParticipant) return;

    try {
      await this.localParticipant.setScreenShareEnabled(false);
    } catch (error) {
      console.error('Error stopping screen share:', error);
    }
  }

  /**
   * Send chat message
   */
  async sendChatMessage(message: string): Promise<void> {
    if (!this.room) return;

    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify({
      type: 'chat',
      message,
      timestamp: Date.now(),
      sender: this.localParticipant?.identity
    }));

    await this.room.localParticipant.publishData(data, DataPacket_Kind.RELIABLE);
  }

  /**
   * Get current room statistics
   */
  getRoomStats(): RoomStats | null {
    if (!this.room) return null;

    return {
      duration: Math.floor((Date.now() - (this.room.metadata ? 0 : Date.now())) / 1000),
      participantCount: this.room.remoteParticipants.size + 1,
      bandwidth: {
        upload: 1500, // kbps - would come from actual stats
        download: 2000
      },
      latency: 45, // ms
      packetLoss: 0.1 // percentage
    };
  }

  /**
   * Get all participants
   */
  getParticipants(): ParticipantInfo[] {
    if (!this.room) return [];

    const participants: ParticipantInfo[] = [];

    // Add local participant
    if (this.localParticipant) {
      participants.push(this.getParticipantInfo(this.localParticipant));
    }

    // Add remote participants
    this.room.remoteParticipants.forEach((participant) => {
      participants.push(this.getParticipantInfo(participant));
    });

    return participants;
  }

  /**
   * Get participant information
   */
  private getParticipantInfo(participant: LocalParticipant | RemoteParticipant): ParticipantInfo {
    const videoTrack = participant.getTrackPublication(Track.Source.Camera);
    const audioTrack = participant.getTrackPublication(Track.Source.Microphone);
    const screenTrack = participant.getTrackPublication(Track.Source.ScreenShare);

    return {
      identity: participant.identity,
      name: participant.name || participant.identity,
      role: participant.metadata?.includes('doctor') ? 'doctor' : 'patient',
      isSpeaking: participant.isSpeaking,
      isCameraEnabled: videoTrack?.track?.isMuted === false,
      isMicrophoneEnabled: audioTrack?.track?.isMuted === false,
      isScreenSharing: screenTrack?.track !== undefined,
      connectionQuality: this.getConnectionQuality(participant)
    };
  }

  /**
   * Estimate connection quality
   */
  private getConnectionQuality(participant: LocalParticipant | RemoteParticipant): 'excellent' | 'good' | 'poor' {
    // In production, use actual connection quality metrics
    if (participant instanceof RemoteParticipant) {
      const quality = participant.connectionQuality;
      if (quality === 'excellent') return 'excellent';
      if (quality === 'good' || quality === 'unknown') return 'good';
      return 'poor';
    }
    return 'excellent';
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    if (!this.room) return;

    this.room
      .on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
        this.emit('trackSubscribed', { track, publication, participant });
      })
      .on(RoomEvent.TrackUnsubscribed, (track, publication, participant) => {
        this.emit('trackUnsubscribed', { track, publication, participant });
      })
      .on(RoomEvent.ParticipantConnected, (participant) => {
        this.emit('participantConnected', participant);
      })
      .on(RoomEvent.ParticipantDisconnected, (participant) => {
        this.emit('participantDisconnected', participant);
      })
      .on(RoomEvent.DataReceived, (payload, participant) => {
        const decoder = new TextDecoder();
        const data = JSON.parse(decoder.decode(payload));
        this.emit('dataReceived', { data, participant });
      })
      .on(RoomEvent.Disconnected, () => {
        this.emit('disconnected', {});
      })
      .on(RoomEvent.Reconnecting, () => {
        this.emit('reconnecting', {});
      })
      .on(RoomEvent.Reconnected, () => {
        this.emit('reconnected', {});
      })
      .on(RoomEvent.ConnectionQualityChanged, (quality, participant) => {
        this.emit('connectionQualityChanged', { quality, participant });
      });
  }

  /**
   * Register event handler
   */
  on(event: string, handler: Function): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  /**
   * Unregister event handler
   */
  off(event: string, handler: Function): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  /**
   * Emit event to handlers
   */
  private emit(event: string, data: any): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }

  /**
   * Get current room
   */
  getRoom(): Room | null {
    return this.room;
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.room?.state === 'connected';
  }

  /**
   * Generate access token (server-side function - mock for demo)
   */
  static async generateToken(
    roomName: string,
    participantName: string,
    participantMetadata?: string
  ): Promise<string> {
    // In production, this would be called from your backend
    // Backend would use LiveKit server SDK to generate JWT token
    
    // Mock token for demo purposes
    return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
      room: roomName,
      name: participantName,
      metadata: participantMetadata,
      iat: Date.now() / 1000
    }))}`;
  }

  /**
   * Create consultation room
   */
  static async createRoom(
    consultationId: string,
    participants: Array<{ id: string; name: string; role: 'doctor' | 'patient' }>
  ): Promise<{
    roomName: string;
    url: string;
    tokens: Map<string, string>;
  }> {
    // In production, call your backend API to create LiveKit room
    const roomName = `consultation-${consultationId}`;
    const url = process.env.VITE_LIVEKIT_URL || 'wss://your-livekit-server.com';
    
    const tokens = new Map<string, string>();
    
    for (const participant of participants) {
      const token = await this.generateToken(
        roomName,
        participant.name,
        participant.role
      );
      tokens.set(participant.id, token);
    }

    return {
      roomName,
      url,
      tokens
    };
  }
}

export const livekitService = new LiveKitService();

