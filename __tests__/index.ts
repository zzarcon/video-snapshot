declare var global: any;
import VideoSnapshot from '../src';

describe('VideoSnapshot', () => {
  const setup = () => {
    const videoFile = new File([''], 'video.mp4');
    const createObjectURL = jest.fn().mockReturnValue('video-url');
    const revokeObjectURL = jest.fn();
    const addEventListener = jest.fn().mockImplementation((name, callback) => {
      callback();
    });
    const removeEventListener = jest.fn();
    const drawImage = jest.fn();
    const getContext = jest.fn().mockImplementation(() => {
      return {
        drawImage
      };
    });
    const pause = jest.fn();
    const play = jest.fn();
    const video = {
      addEventListener,
      removeEventListener,
      play,
      pause,
      videoWidth: 100,
      width: 100,
      videoHeight: 50,
      height: 50,
    } as Partial<HTMLVideoElement>;
    const createElement = jest.fn().mockImplementation(type => {
      if (type === 'video') {
        return video;
      } else if (type === 'canvas') {
        return {
          getContext,
          toDataURL: jest.fn().mockReturnValue('data-img')
        }
      }
    });

    global.URL.createObjectURL = createObjectURL;
    global.URL.revokeObjectURL = revokeObjectURL;
    global.document.createElement = createElement;

    return {
      video,
      videoFile,
      play,
      pause,
      drawImage,
      revokeObjectURL,
      removeEventListener
    };
  };

  it('should return a snapshot image from the video file', async () => {
    const {videoFile, video, drawImage} = setup();
    const snapshoter = new VideoSnapshot(videoFile);
    const snapshot = await snapshoter.takeSnapshot();

    expect(drawImage).toBeCalledWith(video, 0, 0, 100, 50);
    expect(video.src).toEqual('video-url');
    expect(snapshot).toEqual('data-img');
  });

  it('should set video time when snapshot time is passed', async () => {
    const {videoFile, video, play} = setup();
    const snapshoter = new VideoSnapshot(videoFile);
    const snapshot = await snapshoter.takeSnapshot(100);

    expect(play).not.toBeCalled();
    expect(video.currentTime).toEqual(100);
  });

  it('should clear everything once the snapshot is done', async () => {
    const {videoFile, removeEventListener, pause} = setup();
    const snapshoter = new VideoSnapshot(videoFile);
    const snapshot = await snapshoter.takeSnapshot();

    expect(removeEventListener).toHaveBeenCalledTimes(1);
    expect(pause).toHaveBeenCalledTimes(1);
  });

  it('end()', async () => {
    const {videoFile, revokeObjectURL} = setup();
    const snapshoter = new VideoSnapshot(videoFile);
  
    snapshoter.end();

    expect(revokeObjectURL).toBeCalledWith('video-url');
  });
});