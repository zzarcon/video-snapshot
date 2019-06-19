<div align="center">
  <img src="video-snapshot.gif" alt="Logo" height="400">
  <br><br>
</div>

# video-snapshot [![Build Status](https://travis-ci.org/zzarcon/video-snapshot.svg?branch=master)](https://travis-ci.org/zzarcon/video-snapshot)
> Get snapshots from a video file in the browser

EN | [中文文档](./README_ZH.md)

# Demo 💅
[https://zzarcon.github.io/video-snapshot](https://zzarcon.github.io/video-snapshot)

# Install 🚀

```
$ yarn add video-snapshot
```

# Usage ⛏

```javascript
import VideoSnapshot from 'video-snapshot';

document.querySelector('input[type="file"]').addEventListener('change', onChange);

const onChange = async (e) => {
  const snapshoter = new VideoSnapshot(e.target.files[0]);
  // Support URL
  // const snapshoter = new VideoSnapshot('http://myserver.com/demo.mp4');
  const previewSrc = await snapshoter.takeSnapshot();
  // Support custom your snapshot size
  // const previewSrc = await snapshoter.takeSnapshot(0, 200, 300);
  const img = document.createElement('img');

  img.src = previewSrc;

  document.body.appendChild(img);
};
```

# Api 👀

```typescript
type CustomVideoTime = 'start' | 'middle' | 'end';
type VideoTime = number | CustomVideoTime;

class VideoSnapshot {
  constructor(blob: Blob | String) {};
  takeSnapshot(time?: VideoTime, width?: Number, height?: Number): Promise<string>;
  end(): void;
}
```

# Features 💸

* Dependency free
* [2kb size](https://bundlephobia.com/result?p=video-snapshot@1.0.1)
* Take snapshot at any time
* You can pass **smart times** to easily get better previews

# Author 🦄

[@zzarcon](https://twitter.com/zzarcon)
