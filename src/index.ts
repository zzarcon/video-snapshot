export type CustomVideoTime = 'start' | 'middle' | 'end';
export type VideoTime = number | CustomVideoTime;

class VideoSnapshot {
  videoUrl: string;

  // TODO: Add support for base64?
  constructor(blob: Blob) {
    const url = URL.createObjectURL(blob);
    
    this.videoUrl = url;
  }

  // TODO: implement video cache
  loadVideo(time: VideoTime = 0): Promise<HTMLVideoElement> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');

      video.preload = 'metadata';
      video.src = this.videoUrl;
      video.muted = true;

      if (time === 0) {
        video.play();
      } else {
        // TODO: Handle custom times
        if (typeof time === 'number') {
          video.currentTime = time;
        }
      }
      
      // TODO: Remove event listener
      // loadedmetadata, loadeddata, play, playing
      video.addEventListener('timeupdate', () => {
        console.log('timeupdate')
        video.pause();
        resolve(video);
      });
    });
  }

  // TODO: Support time="1:20", time="01:05"
  takeSnapshot(time?: VideoTime): Promise<string> {
    return this.loadVideo(time).then((video) => {
      const canvas = document.createElement('canvas');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL();

      return dataURL;
    });
  }

  onLoadedMetadaData(e: Event) {

  }

  revoke() {
    URL.revokeObjectURL(this.videoUrl);
  }
}

export default VideoSnapshot;