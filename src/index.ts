export type CustomVideoTime = 'start' | 'middle' | 'end';
export type VideoTime = number | CustomVideoTime;

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
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
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL();

    return dataURL;
  }

  end() {
    this.revoke();
  }

  // TODO: implement video cache
  private loadVideo = (time: VideoTime = 0): Promise<HTMLVideoElement> => (
    new Promise((resolve, reject) => {
      const video = document.createElement('video');

      video.preload = 'metadata';
      video.src = this.videoUrl;
      video.muted = true;

      if (time === 0) {
        video.play();
      } else {
        // TODO: Handle smart times
        if (typeof time === 'number') {
          video.currentTime = time;
          
          if (isSafari) { // Safari needs to always play the video 
            video.play();
          }
        }
      }

      // loadedmetadata, loadeddata, play, playing
      video.addEventListener('timeupdate', function timeupdateHandler() {
        video.removeEventListener('timeupdate', timeupdateHandler);
        video.pause();
        resolve(video);
      });
    })
  )

  private revoke() {
    URL.revokeObjectURL(this.videoUrl);
  }
}

export default VideoSnapshot;