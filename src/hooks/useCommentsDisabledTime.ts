import { useMemo } from 'react';
import { getActiveVideo } from '../config/videoConfig';

export const useCommentsDisabledTime = () => {
  return useMemo(() => {
    const activeVideo = getActiveVideo();
    const dtcTime = activeVideo.showDTCAtSeconds;
    const disableCommentsAt = Math.max(0, dtcTime - 5);

    return {
      dtcTime,
      disableCommentsAt,
      shouldDisableComments: (currentTime: number) => currentTime >= disableCommentsAt
    };
  }, []);
};
