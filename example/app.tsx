import * as React from 'react';
import {Component} from 'react';
import VidPlayIcon from '@atlaskit/icon/glyph/vid-play';
import AttachmentIcon from '@atlaskit/icon/glyph/attachment';
import CameraFilledIcon from '@atlaskit/icon/glyph/camera-filled';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import Button from '@atlaskit/button';
import VideoSnapshot from '../src';
import {PlayIconWrapper, VideoWrapper, AppWrapper, VideoPreview, PreviewWrapper, ActionsWrapper, Preview, FileInput} from './styled';

export interface AppProps {

}

export interface AppState {
  currentTime: number;
  videoPreview?: string;
  videoUrl?: string;
}

const ghLink = (
  <a href="https://github.com/zzarcon/video-snapshot" target="_blank" className="github-corner" aria-label="View source on Github">
    <svg width="180" height="180" viewBox="0 0 250 250" aria-hidden="true">
      <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
      <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{transformOrigin: '130px 106px'}} className="octo-arm"></path>
      <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path>
    </svg>
  </a>
);

export default class App extends Component<AppProps, AppState> {
  inputRef?: HTMLInputElement;
  snapshoter?: VideoSnapshot;

  state: AppState = {
    currentTime: 0,
  }
  
  onChange = async (e: any) => {
    const files = e.target.files;
    const videoFile = files[0];
    const videoUrl = URL.createObjectURL(videoFile);
    this.snapshoter = new VideoSnapshot(videoFile);
    const videoPreview = await this.snapshoter.takeSnapshot();
    
    this.setState({
      videoUrl,
      videoPreview
    });
  }
  
  pickFile = () => {
    this.inputRef && this.inputRef.click();
  }

  onSnapshot = async () => {
    if (!this.snapshoter) return;
    const {currentTime} = this.state;
    const videoPreview = await this.snapshoter.takeSnapshot(currentTime);
    
    this.setState({
      videoPreview
    });
  }

  saveInputRef = (e: any) => {
    if (!e) return

    this.inputRef = e;
  }

  onTimeChange = (e: any) => {
    this.setState({
      currentTime: e.target.value
    });
  }

  renderVideo() {
    const {videoUrl} = this.state;

    return (
      <VideoWrapper>
        {videoUrl ? 
          <VideoPreview src={videoUrl} controls autoPlay /> :
          <PlayIconWrapper onClick={this.pickFile}>
            <VidPlayIcon label="video" size="xlarge" />
          </PlayIconWrapper>
        }
      </VideoWrapper>
    );
  }
  
  downloadSnapshot = () => {

  }

  render() {
    const {videoPreview} = this.state;
    const hasPreview = !!videoPreview;
    const img = videoPreview ? <Preview src={videoPreview} /> : null;
    
    return (
      <AppWrapper>
        {ghLink}
        {this.renderVideo()}
        <ActionsWrapper>
          <Button appearance="primary" onClick={this.pickFile} iconAfter={<AttachmentIcon label="file" />}>
            Pick file
          </Button>
          <FileInput innerRef={this.saveInputRef} type="file" onChange={this.onChange} />
          <Button 
            appearance="primary"
            onClick={this.onSnapshot}
            iconAfter={<CameraFilledIcon label="photo" />}
            isDisabled={!hasPreview}
          >
            Take snapshot
          </Button>
          <Button 
            appearance="primary"
            onClick={this.downloadSnapshot}
            iconAfter={<DownloadIcon label="download" />}
            isDisabled={!hasPreview}
          >
            Download
          </Button>
        </ActionsWrapper>
        <PreviewWrapper>
          {img}
        </PreviewWrapper>        
      </AppWrapper>
    );
  }
}