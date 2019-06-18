<div align="center">
  <img src="video-snapshot.gif" alt="Logo" height="400">
  <br><br>
</div>

# video-snapshot
> 在浏览器中获取到视频的截图

[EN](https://github.com/Kuaizi-co/video-snapshot) | 中文文档

# Demo 💅
[https://zzarcon.github.io/video-snapshot](https://zzarcon.github.io/video-snapshot)

# 安装 🚀

```
$ yarn add video-snapshot
```

# 使用 ⛏

```javascript
import VideoSnapshot from 'video-snapshot';

document.querySelector('input[type="file"]').addEventListener('change', onChange);

const onChange = async (e) => {
  const snapshoter = new VideoSnapshot(e.target.files[0]);
  // 增加支持URL
  // const snapshoter = new VideoSnapshot('http://myserver.com/demo.mp4');
  const previewSrc = await snapshoter.takeSnapshot();
  // 增加按宽高尺寸截图
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

- [x] 增加实例化参数支持远程视频URL
- [x] 增加按尺寸截图，减少返回base64体积  

# 功能 💸

* 不依赖第三方组件
* 体积小，[2kb size](https://bundlephobia.com/result?p=video-snapshot@1.0.1)
* 可以在任何时间点截图
* 可以通过 **smart times** 获得更好的预览
  
# 开发

## 安装

```
yarn install --ignore-engines
```

# Author 🦄

[@zzarcon](https://twitter.com/zzarcon)

**Updated by**
[@tommyshao](https://github.com/tomieric)