import { eventYoutube } from "../ga4";

export function onPlayerStateChange(event) {
    switch(event.data) {
      case YT.PlayerState.PLAYING:
        eventYoutube('video_play', {
            event_category: 'YouTube Video',
            event_label: event.target.getVideoData().title,
            value: Math.floor(event.target.getCurrentTime())
        })
        break;
      case YT.PlayerState.PAUSED:
        eventYoutube('video_pause', {
            event_category: 'YouTube Video',
            event_label: event.target.getVideoData().title,
            value: Math.floor(event.target.getCurrentTime())
        })
        break;
      case YT.PlayerState.ENDED:
        eventYoutube('video_end', {
            event_category: 'YouTube Video',
            event_label: event.target.getVideoData().title,
            value: Math.floor(event.target.getCurrentTime())
        })
        break;
      default:
        break;
    }
}