export interface VideoConfig {
  id: string;
  name: string;
  embedUrl: string;
  playerId: string;
  showDTCAtSeconds: number;
}

export const AVAILABLE_VIDEOS: Record<string, VideoConfig> = {
  bakingSoda: {
    id: 'bakingSoda',
    name: 'Baking Soda Cures Impotence',
    embedUrl: 'https://scripts.converteai.net/f5ab9e88-cc1b-4dce-a537-c7de7e019d8b/players/690d651a8b6c64d7fbca3fbc/v4/embed.html',
    playerId: '690d651a8b6c64d7fbca3fbc',
    showDTCAtSeconds: 2655
  }
};

export const ACTIVE_VIDEO_ID = 'bakingSoda';

export const getActiveVideo = (): VideoConfig => {
  return AVAILABLE_VIDEOS[ACTIVE_VIDEO_ID];
};
