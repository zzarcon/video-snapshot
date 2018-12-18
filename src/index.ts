export type CustomVideoTime = 'start' | 'middle' | 'end';
export type VideoTime = number | CustomVideoTime;
export interface Dimensions {
  width: number;
  height: number;
}
const isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
class VideoSnapshot {
  videoUrl: string;

  // TODO: Add support for base64?
  constructor(blob: Blob) {
    const url = URL.createObjectURL(blob);

    this.videoUrl = url;
  }

  // TODO: Support time="1:20", time="01:05"
  async takeSnapshot(time?: VideoTime): Promise<string> {
    const video = await this.loadVideo(time);
    const canvas = document.createElement('canvas');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('error creating canvas context');
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // TODO: better quality => toDataURL('image/jpeg', 1)
    const dataURL = canvas.toDataURL();

    return dataURL;
  }

  end() {
    this.revoke();
  }

  // TODO: implement video cache
  // TODO: Handle video error and reject?
  private loadVideo = (time: VideoTime = 0): Promise<HTMLVideoElement> =>
    new Promise(resolve => {
      const video = document.createElement('video');

      video.preload = 'metadata';
      video.src = this.videoUrl;
      video.muted = true;

      if (time === 0) {
        video.play();
      } else {
        if (typeof time === 'number') {
          video.currentTime = time;
        } else if (typeof time === 'string') {
          const duration = video.duration;
          video.currentTime = this.getSmartTime(time, duration);
        }

        if (isSafari) {
          // Safari needs to always play the video
          video.play();
        }
      }

      // loadedmetadata, loadeddata, play, playing
      video.addEventListener('timeupdate', function timeupdateHandler() {
        video.removeEventListener('timeupdate', timeupdateHandler);
        video.pause();
        resolve(video);
      });
    });
  
  getDimensions = async (): Promise<Dimensions> => {
    const video = await this.loadVideo();

    return {
      width: video.videoWidth,
      height: video.videoHeight
    };
  }

  private revoke() {
    URL.revokeObjectURL(this.videoUrl);
  }

  private getSmartTime(time: CustomVideoTime, duration: number = 0): number {
    const smartTimes = {
      start: 0,
      middle: duration / 2,
      end: duration,
    };
    return smartTimes[time]
  }
}

export default VideoSnapshot;
