<div align="center">
  <img src="logo.png" alt="Logo" width="400">
  <br><br>
</div>

# video-snapshot [![Build Status](https://travis-ci.org/zzarcon/video-snapshot.svg?branch=master)](https://travis-ci.org/zzarcon/video-snapshot)
> Get a image preview from a video file

# Demo
[https://zzarcon.github.io/video-snapshot](https://zzarcon.github.io/video-snapshot)
# Install

```
$ yarn add video-snapshot
```

# Usage

```javascript
import VideoSnapshot from 'video-snapshot';

document.querySelector('input[type="file"]').addEventListener('change', onChange);

const onChange = async (e) => {
  const snapshoter = new VideoSnapshot(e.target.files[0]);
  const previewSrc = await snapshoter.takeSnapshot();
  const img = document.createElement('img');

  img.src = previewSrc;

  document.body.appendChild(img);
};
```