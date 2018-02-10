import VideoSnapshot from '../src';

const browse = document.getElementById('browse');

const onChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  const snapshoter = new VideoSnapshot(files[0]);

  const image = await snapshoter.takeSnapshot(100);
  const image2 = await snapshoter.takeSnapshot();

  renderImage(image);
  renderImage(image2);
};

const renderImage = (src: string) => {
  const img = document.createElement('img');

  img.src = src;

  document.body.appendChild(img);
};

browse.addEventListener('change', onChange);