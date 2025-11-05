import { useState, useEffect, useCallback } from 'react';

interface VturbPlayerState {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isReady: boolean;
}

interface UseVturbPlayerOptions {
  playerId: string;
  onTimeUpdate?: (currentTime: number) => void;
  enableDebug?: boolean;
}

export const useVturbPlayer = ({ playerId, onTimeUpdate, enableDebug = false }: UseVturbPlayerOptions) => {
  const [playerState, setPlayerState] = useState<VturbPlayerState>({
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    isReady: false
  });

  const log = useCallback((...args: unknown[]) => {
    if (enableDebug) {
      console.log('[useVturbPlayer]', ...args);
    }
  }, [enableDebug]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://scripts.converteai.net') {
        return;
      }

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        if (data.playerId !== playerId) {
          return;
        }

        log('Received message:', data);

        switch (data.type) {
          case 'smartplayer:ready':
            setPlayerState(prev => ({ ...prev, isReady: true }));
            log('Player ready');
            break;

          case 'smartplayer:timeupdate':
            const currentTime = data.currentTime || 0;
            setPlayerState(prev => ({
              ...prev,
              currentTime,
              duration: data.duration || prev.duration
            }));

            if (onTimeUpdate) {
              onTimeUpdate(currentTime);
            }

            log(`Time update: ${currentTime.toFixed(2)}s`);
            break;

          case 'smartplayer:play':
            setPlayerState(prev => ({ ...prev, isPlaying: true }));
            log('Player playing');
            break;

          case 'smartplayer:pause':
            setPlayerState(prev => ({ ...prev, isPlaying: false }));
            log('Player paused');
            break;

          case 'smartplayer:ended':
            setPlayerState(prev => ({ ...prev, isPlaying: false }));
            log('Player ended');
            break;
        }
      } catch (error) {
        log('Error parsing message:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    log('Listening for messages from player:', playerId);

    return () => {
      window.removeEventListener('message', handleMessage);
      log('Stopped listening for messages');
    };
  }, [playerId, onTimeUpdate, log]);

  return playerState;
};
