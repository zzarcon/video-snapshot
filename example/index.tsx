import VideoSnapshot from '../src';

const browse = document.getElementById('browse');

const onChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  const snapshoter = new VideoSnapshot(files[0]);

  const image = await snapshoter.takeSnapshot(100);
  const image2 = await snapshoter.takeSnapshot();

  renderImage(image);
  renderImage(image2);

  snapshoter.end();

  const image3 = await snapshoter.takeSnapshot(10);

  renderImage(image3);
  renderVideo(snapshoter.videoUrl);
};

const renderImage = (src: string) => {
  const img = document.createElement('img');

  img.src = src;

  document.body.appendChild(img);
};

const renderVideo = (src: string) => {
  const video = document.createElement('video');

  video.src = src;
  video.controls = true;

  document.body.appendChild(video);
}

browse.addEventListener('change', onChange);